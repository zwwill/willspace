<?php


require_once dirname(__FILE__) . '/common/Common.php';


class PutMagic extends AbstractInterface {
  
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
  //使用的道具名称
  private $_operand;
  

  public function setOperand($operand){
    $this->_operand = $operand;
  }
  public function verifyInput(&$args) {      
    global $constants;
    //判断道具名称是否合法
      if(!in_array($this->_oprand, $constants['MAGIC_LIST'])) {
        $this->_retValue = EC_INVALID_INPUT;
      $this->_retMsg = "not right magic" . $this->_operand;
      interface_log(ERROR, $this->_retValue, $this->_retMsg);
          return false;
      }
      $this->_args = array(
        "userId" => $this->_fromUserName,
        "magic" => $this->_operand,
      );
    
    return true;
  }

  //初始化数据库连接
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
      $data = $this->_oTable->getObject ( array('userId' => $this->_args['userId']));
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
      $data = $this->_oTable->getObject ( array ("_where" => " (user1='" . $this->_args ['userId'] . "' OR user2='" . $this->_args ['userId'] . "')" ) );
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
          $this->_retMsg = " userId:" . $this->_args ['userId'];
          interface_log ( ERROR, $this->_retValue, $this->_retMsg );
          return false;
        }
        if($data[0]['operation'] != PUT_MAGIC) {
          //当前游戏操作不是使用道具的情况
          $this->_retValue = EC_STEP_OPERATION_NOT_MATCH;
          $this->_retMsg = " userId:" . $this->_args ['userId'];
          interface_log ( ERROR, $this->_retValue, $this->_retMsg );
          return false;
        }
      }
      //设置游戏数据和游戏id
      $this->_fightInfo = $data [0];
      $this->_fightId = $data[0]["fightId"];
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
      //获取msgForOther并设置用户提示文本
      $msgForOther = $this->_fightInfo['msgForOther'];
      $otherId = $this->_fightInfo['otherId'];
      if($otherId == $this->_fromUserName) {
        $this->_responseText .= $msgForOther;
        $this->_fightInfo['msgForOther'] = "";
      }
      
      //设置用户提示文本
      $this->_fightInfo['otherId'] = ($this->_fromUserName == $this->_fightInfo['user1']) ? $this->_fightInfo['user2'] : $this->_fightInfo['user1'] ;
      if($this->_fightInfo['msgForOther'] == "") {
        $this->_fightInfo['msgForOther'] = "对方已经使用道具";
      } else {
        $this->_fightInfo['msgForOther'] .= ", 对方已经使用道具";
      }
      
      //获取道具变量，使用这种方式是为了兼容后续可能出现的一次使用多个道具的情况
      $magic = $this->_args ['magic'];
      if ($magic != '') {
        $xsft = 0;
        $hdcx = 0;
        $chxs = 0;
        $sszm = 0;
        if ($magic == XSFT) {
          $xsft = 1;
        } else if ($magic == HDCX) {
          $hdcx = 1;
        } else if ($magic == CHXS) {
          $chxs = 1;
        } else if ($magic == SSZM) {
          $sszm = 1;
        } else {
          $this->_retValue = EC_ERROR_MAGIC;
          $this->_retMsg = "fightId:" . $this->_fightId . " userId:" . $this->_args ['userId'] . " magic:" . $magic;
          interface_log ( ERROR, $this->_retValue, $this->_retMsg );
          return false;
        }
        
        if ($this->_fightInfo ['current'] == $this->_args ['userId']) {
          if ($hdcx) {
            //如果当前轮次开枪的操作者是当前玩家，则当前玩家不能使用壶底抽薪的技能
            $this->_retValue = EC_ERROR_MAGIC;
            $this->_retMsg = "fightId:" . $this->_fightId . " userId:" . $this->_args ['userId'] . " magic:" . HDCX;
            interface_log ( ERROR, $this->_retValue, $this->_retMsg );
            return false;
          }
        } else {
          if ($xsft || $chxs || $sszm) {
            //如果当前轮次开枪的操作者不是当前玩家，则当前玩家只能使用壶底抽薪的技能，其他的技能不可用
            $this->_retValue = EC_ERROR_MAGIC;
            $this->_retMsg = "fightId:" . $this->_fightId . " userId:" . $this->_args ['userId'] . 
            " magic:" . ($xsft ? XSFT : "") . ($chxs ? CHXS : "") . ($sszm ? SSZM : "");
            interface_log ( ERROR, $this->_retValue, $this->_retMsg );
            return false;
          }
        }
        if ($this->_args ['magic'] ){
          //更新用户道具数
          if(($this->_userInfo ['xsft'] - $xsft) < 0 || 
            ($this->_userInfo ['hdcx'] - $hdcx) < 0 || 
            ($this->_userInfo ['chxs'] - $chxs) < 0 ||
            ($this->_userInfo ['sszm'] - $sszm) < 0) {
              $this->_retValue = EC_NOT_ENOUGH_MAGIC;
              $this->_retMsg = "fightId:" . $this->_fightId . " userId:" . $this->_args ['userId'] . 
                " magic:" 
                    . ($xsft ? XSFT : " ") 
                    . ($chxs ? CHXS : " ") 
                    . ($sszm ? SSZM : " ") 
                    . ($hdcx ? HDCX : " ");
              interface_log ( ERROR, $this->_retValue, $this->_retMsg );
              return false;
            }
          $this->_oTable->setTableName ( 'cUser' );
          $this->_oTable->updateObject ( array ('xsft' => $this->_userInfo ['xsft'] - $xsft, 
                            'hdcx' => $this->_userInfo ['hdcx'] - $hdcx, 
                            'chxs' => $this->_userInfo ['chxs'] - $chxs, 
                            'sszm' => $this->_userInfo ['sszm'] - $sszm, 
                            ), array ('userId' => $this->_args ['userId'] ) );
        }
          
      
      }
      
      //设置下一步动作和操作码和操作人
      $ret = $this->setNextOpAndUser ();
      if ($ret ['code']) {
        $this->_retValue = EC_STEP_ERROR;
        $this->_retMsg = "fightId:" . $this->_fightId . " step:" . $this->_fightInfo ['historyOp'];
        interface_log ( ERROR, $this->_retValue, $this->_retMsg );
        return false;
      }
      
      //更新游戏数据中的magic1，magic2和magicUsed1和magicUsed2
      if ($this->_args ['magic']) {
        $this->setMagic ();
      }
        
      //更新历史操作记录  
      if ($this->_fightInfo ['historyOp'] == '') {
        $newHistoyOp = PUT_MAGIC . ',' . $this->_args ['userId'];
      } else {
        $newHistoyOp = $this->_fightInfo ['historyOp'] . "|" . PUT_MAGIC . ',' . $this->_args ['userId'];
      }
      $this->_fightInfo['historyOp'] = $newHistoyOp;
      
      //更新游戏记录
      unset ( $this->_fightInfo ['fightId'] );
      $this->_oTable->setTableName ( 'cFight' );
      $this->_oTable->updateObject ( $this->_fightInfo, array ('fightId' => $this->_fightId ) );
      
      DbFactory::getInstance ('MYZL')->tryCommit ();
      
      //设置用户提示文本
      if($this->_responseText) {
        if($this->_args['magic']) {
          $this->_responseText .= ', ' . sprintf(MYZL_HINT_PUTMAGIC_SUC, $GLOBALS['constants']['magicName'][$this->_operand], $GLOBALS['constants']['stepName'][$this->_fightInfo['operation']]);  
        } else {
          $this->_responseText .= ', ' . sprintf(MYZL_HINT_PUTMAGIC_SUC_NO, $GLOBALS['constants']['stepName'][$this->_fightInfo['operation']]);
        }
      }else {
        if($this->_args['magic']) {
          $this->_responseText = sprintf(MYZL_HINT_PUTMAGIC_SUC, $GLOBALS['constants']['magicName'][$this->_operand], $GLOBALS['constants']['stepName'][$this->_fightInfo['operation']]);  
        } else {
          $this->_responseText = sprintf(MYZL_HINT_PUTMAGIC_SUC_NO, $GLOBALS['constants']['stepName'][$this->_fightInfo['operation']]);
        }
      }
    } catch ( DB_Exception $e ) {
      DbFactory::getInstance ('MYZL')->rollback ();
      $errorNum = $this->_oTable->getErrorNum ();
      $this->_retMsg = $this->_oTable->getErrorInfo () . $e->getMessage ();
      $this->_retValue = genRetCode ( $errorNum );
      interface_log ( ERROR, $this->_retValue, $this->_retMsg );
      return false;
    }
    return true;
  }
  
  //设置下一步动作的操作码和操作人
  private function setNextOpAndUser() {
    if($this->_fightInfo['historyOp'] == '') {
      return array('code' => 1, 'msg'  => 'bad step <empty>');
    } else {
      $steps = explode('|', $this->_fightInfo['historyOp']);
      $cnt = count($steps);
      $tmp1 = explode(',', $steps[$cnt-1]);
      $op1 = $tmp1[0];
      $user1 = $tmp1[1];
      
      if($op1 == CHIP_IN) {
        $retOp = PUT_MAGIC;
      }else if($op1 == SHOOT) {
        $retOp = PUT_MAGIC;
      } else if($op1 == PUT_MAGIC) {
        $retOp = SHOOT;
      }
    }
    $operator = ($this->_args['userId'] == $this->_fightInfo['user1']) ? $this->_fightInfo['user2'] : $this->_fightInfo['user1'];
    $this->_fightInfo['operation'] = $retOp;
    $this->_fightInfo['operator'] = $operator;
  }
  
  private function setMagic() {
    /**
     * 设置magicUsed的目的是为了后续可能出现一次游戏中多个技能不能都使用的情况
     */
    if($this->_args['userId'] == $this->_fightInfo['user1']) {
      if($this->_fightInfo['magicUsed1'] == ""){
        $this->_fightInfo['magicUsed1'] = $this->_args['magic'];
      } else {
        $this->_fightInfo['magicUsed1'] .= (',' . $this->_args['magic']);
      }
      $this->_fightInfo['magic1'] = $this->_args['magic'];
    } else {
      if($this->_fightInfo['magicUsed2'] == ""){
        $this->_fightInfo['magicUsed2'] = $this->_args['magic'];
      } else {
        $this->_fightInfo['magicUsed2'] .= (',' . $this->_args['magic']);
      }
      $this->_fightInfo['magic2'] = $this->_args['magic'];
    }
  }
}

?>