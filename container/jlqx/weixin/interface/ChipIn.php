<?php
/**
 *加注动作
 */

require_once dirname(__FILE__) . '/common/Common.php';


class ChipIn extends AbstractInterface {
  
  //组装的输入
  private $_args;
  //游戏数据
  private $_fightInfo;
  //用户数据
  private $_userInfo;
  //数据库链接
  private $_oTable;
  //游戏数据id
  private $_fightId;
  //加注的金币数
  private $_operand;
  
  public function getOperand(){
    return $this->_operand;
  }
  public function setOperand($operand){
    $this->_operand = $operand;
  }
  
  public function verifyInput(&$args) {      
      $this->_args = array(
        "userId" => $this->_fromUserName,
        "money" => $this->_operand
      );
    
    return true;
  }

  public function initialize() {
    try {
      $this->_oTable = new SingleTableOperation ('cUser', 'MYZL');  
    } catch (Exception $e) {
      $errorNum = $this->_oTable->getErrorNum();
      $this->_retMsg = $this->_oTable->getErrorInfo().$e->getMessage();
      $this->_retValue = genRetCode($errorNum);
      interface_log(ERROR, $this->_retValue, $this->_retMsg);
      return false;
    }
    
    return true;
  }
  
  public function prepareData() {
    //获取到用户数据和游戏数据
    try {
      $this->_oTable->setTableName('cUser');
      $data = $this->_oTable->getObject ( array('userId' => $this->_args['userId']) );
      if (count ( $data ) == 0) {
        $this->_retValue = EC_RECORD_NOT_EXIST;
        $this->_retMsg = "userId:" . $this->_args ['userId'];
        interface_log ( ERROR, $this->_retValue, $this->_retMsg );
        return false;
      }
      //设置用户数据
      $this->_userInfo = $data [0];
      
      //获取游戏数据
      $this->_oTable->setTableName('cFight');
      $this->_args ['userId'] = DbFactory::getInstance ('MYZL')->escape ( $this->_args ['userId'] );
      $data = $this->_oTable->getObject ( array ("_where" => " (user1='" . $this->_args ['userId'] . "' OR user2='" . $this->_args ['userId'] ."')" ) );
      if (empty ( $data )) {
        //查不到游戏数据的情况
        $this->_retValue = EC_RECORD_NOT_EXIST;
        $this->_retMsg = "no fight userId:" . $this->_args ['userId'];
        interface_log ( ERROR, $this->_retValue, $this->_retMsg );
        return false;
      } else if (count ( $data ) > 1) {
        //有多个进行中的游戏的情况
        $this->_retValue = EC_MULTIPLE_FIGHT;
        $this->_retMsg = "userId:" . $this->_args ['userId'];
        interface_log ( ERROR, $this->_retValue, $this->_retMsg );
        return false;
      } else {
        if ($data [0] ['operator'] != $this->_args ['userId']) {
          //当前操作者不是当前用户的情况
          $this->_retValue = EC_NOT_THIS_USR_ORDER;
          $this->_retMsg =  "userId:" . $this->_args ['userId'];
          interface_log ( ERROR, $this->_retValue, $this->_retMsg );
          return false;
        }
        if($data[0]['operation'] != CHIP_IN) {
          //当前游戏操作不是加注的情况
          $this->_retValue = EC_STEP_OPERATION_NOT_MATCH;
          $this->_retMsg = " userId:" . $this->_args ['userId'];
          interface_log ( ERROR, $this->_retValue, $this->_retMsg );
          return false;
        }
        if($this->_args['money'] > $data[0]['maxMoney'] || $this->_args['money'] < $data[0]['minMoney']) {
          //用户下注的金币数不在规定范围内的情况
          $this->_retValue = EC_CHIP_MONEY_NOT_IN_RANGE;
          $this->_retMsg = "fightId:" . $this->_args ['fightId'] . 
                    " userId:" . $this->_args ['userId'] . 
                    " money:" . $this->_args['money'] . 
                    " maxMoney:" . $data[0]['maxMoney'] . 
                    " minMoney:" . $data[0]['minMoney'];
          interface_log ( ERROR, $this->_retValue, $this->_retMsg );
          return false;
        }
      }
      //设置游戏数据和游戏id
      $this->_fightInfo = $data [0];
      $this->_fightId = $data[0]['fightId'];
    } catch (Exception $e) {
      $errorNum = $this->_oTable->getErrorNum();
      $this->_retMsg = $this->_oTable->getErrorInfo().$e->getMessage();
      $this->_retValue = genRetCode($errorNum);
      interface_log(ERROR, $this->_retValue, $this->_retMsg);
      return false;
    }
    return true;
  }
  
  
  public function process() {
    
    try {
      DbFactory::getInstance ('MYZL')->autoCommit ();
      
      //先获取游戏数据中的msgForOther，如果otherId是当前用户，把msgForOther添加到用户提示文本_responseText中
      $msgForOther = $this->_fightInfo['msgForOther'];
      $otherId = $this->_fightInfo['otherId'];
      if($otherId == $this->_fromUserName) {
        $this->_responseText .= $msgForOther;
        $this->_fightInfo['msgForOther'] = "";
      }
      
      //设置msgForOhter和otherId
      $this->_fightInfo['otherId'] = ($this->_fromUserName == $this->_fightInfo['user1']) ? $this->_fightInfo['user2'] : $this->_fightInfo['user1'] ;
      if($this->_fightInfo['msgForOther'] == "") {
        $this->_fightInfo['msgForOther'] = "对方已加注" . $this->_operand . "金币";
      } else {
        $this->_fightInfo['msgForOther'] .= ", 对方已加注" . $this->_operand . "金币";
      }
      
       //用户金币不足的情况
      if ($this->_userInfo ['money'] < $this->_args ['money']) {
        $this->_retValue = EC_NOT_ENOUGH_MONEY;
        interface_log ( ERROR, $this->_retValue );
        return false;
      }
      
      //用户减金币，游戏加金币
      $this->_oTable->setTableName('cUser');
      $newMoney = $this->_userInfo['money'] - $this->_args['money'];
      $this->_oTable->updateObject ( array ('money' => $newMoney ), array ('userId' => $this->_args ['userId'] ) );
      $this->_fightInfo ['money'] += $this->_args ['money'];
      
      //设置下一个动作的操作码和操作人
      $ret = $this->setNextOpAndUser ();
      if ($ret ['code']) {
        $this->_retValue = EC_STEP_ERROR;
        $this->_retMsg = "fightId:" . $this->_fightId . " step:" . $this->_fightInfo['historyOp'];
        interface_log ( ERROR, $this->_retValue, $this->_retMsg );
        return false;
      }
      
      //设置历史操作记录
      if ($this->_fightInfo ['historyOp'] == '') {
        $newHistoyOp = "CHIP_IN," . $this->_args ['userId'];
      } else {
        $newHistoyOp = $this->_fightInfo ['historyOp'] . "|CHIP_IN," . $this->_args ['userId'];
      }
      $this->_fightInfo ['historyOp'] = $newHistoyOp;
      
      //更新下注金额的下限
      if($this->_args['money'] > $this->_fightInfo['minMoney']) {
        $this->_fightInfo['minMoney'] = $this->_args['money'];
      }
      
      //更新游戏数据
      $this->_oTable->setTableName('cFight');
      $this->_oTable->updateObject ($this->_fightInfo, array('fightId' => $this->_fightId));
      
      DbFactory::getInstance ('MYZL')->tryCommit ();
      
      //设置用户提示文本
      if($this->_responseText) {
        $this->_responseText .= ', ' . sprintf(MYZL_HINT_CHIPIN_SUC, $this->_operand, $GLOBALS['constants']['stepName'][$this->_fightInfo['operation']]);
      } else{
        $this->_responseText = sprintf(MYZL_HINT_CHIPIN_SUC, $this->_operand, $GLOBALS['constants']['stepName'][$this->_fightInfo['operation']]);
      }
    }catch (DB_Exception $e){
      DbFactory::getInstance('MYZL')->rollback();
      $errorNum = $this->_oTable->getErrorNum();
      $this->_retMsg = $this->_oTable->getErrorInfo().$e->getMessage();
      $this->_retValue = genRetCode($errorNum);
      interface_log(ERROR, $this->_retValue, $this->_retMsg);
      return false;
    }
    return true;
  }
  
  /**
   * 根据historyOp，设置下一步动作和操作人 
   */
  private function setNextOpAndUser() {
    if($this->_fightInfo['historyOp'] == '') {
      $retOp = CHIP_IN;
    } else {
      $steps = explode('|', $this->_fightInfo['historyOp']);
      $cnt = count($steps);
      $tmp1 = explode(',', $steps[$cnt-1]);
      $op1 = $tmp1[0];
      $user1 = $tmp1[1];
      
      if($op1 == CHIP_IN) {
        $retOp = PUT_MAGIC;
      }else if($op1 == SHOOT) {
        $retOp = CHIP_IN;
      } else if($op1 == PUT_MAGIC) {
        return array('code' => 1, 'msg'  => 'bad step ' . PUT_MAGIC);
      }
    }
    //操作人一直是交换着来的
    $operator = ($this->_args['userId'] == $this->_fightInfo['user1']) ? $this->_fightInfo['user2'] : $this->_fightInfo['user1'];
    $this->_fightInfo['operation'] = $retOp;
    $this->_fightInfo['operator'] = $operator;
  }
}

?>