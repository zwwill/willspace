<?php
/**
 * 获取当前用户的操作，其实就是获取进行中的游戏数据
 */

require_once dirname(__FILE__) . '/common/Common.php';


class GetOp extends AbstractInterface {
  
  private $_args;
  private $_oTable;
  private $_fightId;
  private $_fightInfo;
  
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

  public function verifyInput(&$args) {      
    
      $this->_args = array(
        "userId" => $this->_fromUserName
      );
    return true;
  }

  public function prepareData() {
    // TODO Auto-generated method stub
    return true;
  }
  
  public function process() {
    
    try {
      $this->_oTable->setTableName('cUser');
      $data = $this->_oTable->getObject(array('userId' => $this->_args['userId']));
      if(count($data) == 0) {
        $this->_retValue = EC_USER_NOT_EXIST;
        $this->_retMsg = "userId:" . $this->_args['userId'];
        interface_log(ERROR, $this->_retValue, $this->_retMsg);
        return false;
      }
      $this->_args['userId'] = DbFactory::getInstance('MYZL')->escape($this->_args['userId']);
      
      //分别获取cFight和cFightUncheck中的记录
      $this->_oTable->setTableName ( 'cFight' );
      $data = $this->_oTable->getObject ( array ("_where" => " (user1='" . $this->_args ['userId'] . "' OR user2='" . $this->_args ['userId'] . "')" ) );
      $this->_oTable->setTableName ( 'cFightUncheck' );
      $data1 = $this->_oTable->getObject ( array ("_where" => "operation='SECOND_END' AND (user1='" . $this->_args ['userId'] . "' OR user2='" . $this->_args ['userId'] . "')") );
      if (empty ( $data ) && ! empty ( $data1 )) {
        //有一方尚未查看游戏结果的情况
        $data = $data1;
        //delete fight info in uncheck table
        $fightId = $data[0]['fightId'];
        if($data[0]['current'] != $this->_args['userId']) {
          //当前用户非最后一下开枪的用户，清理游戏数据
          $this->_oTable->setTableName('cFightEnd');
          $this->_oTable->addObject($data[0]);
          
          $this->_oTable->setTableName('cFightUncheck');
          $this->_oTable->delObject(array('fightId' => $fightId));  
        }
        
      }
      if (empty ( $data ) && empty ( $data1 )) {
        $this->_retValue = EC_FIGHT_NOT_EXIST;
        $this->_retMsg = "fightId:" . $this->_args ['fightId'] . " userId:" . $this->_args ['userId'];
        interface_log ( ERROR, $this->_retValue, $this->_retMsg );
        return false;
      } else if (count ( $data ) > 1) {
        $this->_retValue = EC_MULTIPLE_FIGHT;
        $this->_retMsg = "userId:" . $this->_args ['userId'];
        interface_log ( ERROR, $this->_retValue, $this->_retMsg );
        return false;
      } else {
        
        
        $this->_fightInfo = $data [0];
        
        $msgForOther = $this->_fightInfo['msgForOther'];
        $otherId = $this->_fightInfo['otherId'];
        if($otherId == $this->_args['userId']) {
          //设置用户提示文本，并把msgForOther更新为空，以免给用户重复的提示
          $this->_responseText .= $msgForOther;
          $this->_oTable->setTableName ( 'cFight' );
          $this->_oTable->updateObject(array('msgForOther' => ""), array("fightId" => $this->_fightInfo['fightId']));
        }
        interface_log(DEBUG, 0, "reponseText:" . $this->_responseText);
        
        $this->_data = $this->_fightInfo;
        return true;
      }
      
      $this->_data = array();
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