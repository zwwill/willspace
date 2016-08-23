<?php
/**
 * 开始
 */

require_once dirname(__FILE__) . '/common/Common.php';


class Start extends AbstractInterface {
  
  //组装的输入
  private $_args;
  //数据库连接
  private $_oTable;
  //用户数据
  private $_userInfo;
  //游戏数据
  private $_fightInfo;
  //游戏数据id
  private $_fightId;

  public function verifyInput(&$args) {      
    
      $this->_args = array(
        "userId" => $this->_fromUserName
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
  
  //获取用户数据和游戏数据
  public function prepareData() {
    try {
      $this->_oTable->setTableName ( 'cUser' );
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
      $this->_oTable->setTableName ( 'cFight' );
      $this->_args ['userId'] = DbFactory::getInstance ('MYZL')->escape ( $this->_args ['userId'] );
      $data = $this->_oTable->getObject ( array ("_where" => " (user1='" . $this->_args ['userId'] . "' OR user2='" . $this->_args ['userId'] . "')" ) );
      if (empty ( $data )) {
        //查不到游戏数据的情况
        $this->_retValue = EC_RECORD_NOT_EXIST;
        $this->_retMsg = " userId:" . $this->_args ['userId'];
        interface_log ( ERROR, $this->_retValue, $this->_retMsg );
        return false;
      } else if (count ( $data ) > 1) {
          //有多个进行中的游戏的情况
        $this->_retValue = EC_MULTIPLE_FIGHT;
        $this->_retMsg = "userId:" . $this->_args ['userId'];
        interface_log ( ERROR, $this->_retValue, $this->_retMsg );
        return false;
      } else {
        //开始游戏的操作者不是当前用户的情况
        if ($data [0] ['first'] != $this->_args ['userId']) {
          $this->_retValue = EC_ERROR_START_USR;
          $this->_retMsg = " userId:" . $this->_args ['userId'];
          interface_log ( ERROR, $this->_retValue, $this->_retMsg );
          return false;
        }
        //操作步骤不匹配的情况
        if($data[0]['operation'] != START && $data[0]['operation'] != FIRST_END) {
          $this->_retValue = EC_STEP_ERROR;
          $this->_retMsg =  " userId:" . $this->_args ['userId'] . "  step:" . $data[0]['operation'];
          interface_log ( ERROR, $this->_retValue, $this->_retMsg );
          return false;
        }
      }
      //设置游戏数据和游戏id
      $this->_fightInfo = $data [0];
      $this->_fightId = $data[0]['fightId'];
    } catch ( Exception $e ) {
      $errorNum = $this->_oTable->getErrorNum ();
      $this->_retMsg = $this->_oTable->getErrorInfo () . $e->getMessage ();
      $this->_retValue = genRetCode ( $errorNum );
      interface_log ( ERROR, $this->_retValue, $this->_retMsg );
      return false;
    }
    return true;
  }
  
  public function process() {
    
    try {
      
      //获取msgForOther并设置用户提示文本
      $msgForOther = $this->_fightInfo['msgForOther'];
      $otherId = $this->_fightInfo['otherId'];
      if($otherId == $this->_fromUserName) {
        $this->_responseText .= $msgForOther;
      }
      
      //设置用户提示文本
      $this->_fightInfo['otherId'] = ($this->_fromUserName == $this->_fightInfo['user1']) ? $this->_fightInfo['user2'] : $this->_fightInfo['user1'] ;
      //$this->_fightInfo['lastOp'] = $this->_fromUserName . ',' . START . ',';
      if($this->_fightInfo['operation'] == START) {
        $this->_fightInfo['gameNumber'] = 1;
        $this->_fightInfo['msgForOther'] = "对方开始上半局游戏";
      } else {
        $this->_fightInfo['gameNumber'] = 2;
        $this->_fightInfo['msgForOther'] = "对方开始下半局游戏";
        
      }
      
      //设置游戏数据
      $this->_fightInfo['current'] = $this->_fightInfo['first'];
      $this->_fightInfo['operator'] = $this->_fightInfo['first'];
      $this->_fightInfo['operation'] = CHIP_IN;
      //随机设置子弹在左轮中的位置
      $this->_fightInfo['count'] = rand(1, 6);
      $magicList1 = explode(',', $this->_fightInfo['magicUsed1']);
      $magicList2 = explode(',', $this->_fightInfo['magicUsed2']);
      if($magicList1[count($magicList1) -1 ] == CHXS || $magicList2[count($magicList2) -1 ] == CHXS) {
      } else {
        //除非是用户使用CHXS导致的重新开始，否则重置游戏的money值为0
        $this->_fightInfo['money'] = 0;
      }
      //更新游戏数据
      unset ( $this->_fightInfo ['fightId'] );
      $this->_oTable->setTableName ( 'cFight' );
      $this->_oTable->updateObject ( $this->_fightInfo, array ('fightId' => $this->_fightId ) );
      $this->_data = $this->_fightInfo;
      
      //设置用户提示文本
      $this->_responseText = sprintf(MYZL_HINT_START_SUC . "，", $this->_fightInfo['gameNumber'] == 1 ? "上": "下");
      if($this->_fromUserName == $this->_fightInfo['operator']) {
        $this->_responseText .= "请你下注";
      } else {
        $this->_responseText .= "等待对方下注";
      }
    }catch (DB_Exception $e){
      $errorNum = $this->_oTable->getErrorNum();
      $this->_retMsg = $this->_oTable->getErrorInfo().$e->getMessage();
      $this->_retValue = genRetCode($errorNum);
      interface_log(ERROR, $this->_retValue, $this->_retMsg);
      return false;
    }
    return true;
  }
}

?>