<?php
/**
 * 注册用户
 */

require_once dirname(__FILE__) . '/common/Common.php';


class AddUser extends AbstractInterface {
  
  private $_args;
  
  public function initialize() {

    return true;
  }

  public function verifyInput(&$xmlObj) {      
    
      $this->_args = array(
        "userId" => $this->_fromUserName,
        "password" => "wxmp",
        "email" => "wxmp"
      );
    interface_log(DEBUG, 0, "verifyInput: _args:" . var_export($this->_args, true));
    return true;
  }

  public function prepareData() {
    return true;
  }
  
  public function process() {
    
    try {
      $oTableOperate = new SingleTableOperation('cUser', "MYZL");
      $data = $oTableOperate->getObject(array('userId' => $this->_args['userId']));
      if(count($data)) {
        $this->_retValue = EC_RECORD_EXIST;
        $this->_retMsg = "user already exist!";
        interface_log(ERROR, $this->_retValue, $this->_retMsg);
        return false;
      }
      //添加用户记录，设置相关的字段，这里可以根据自己的策略设置
      $oTableOperate->addObject(array('userId' => $this->_args['userId'],
           'password' => $this->_args['password'], 
           'email' => $this->_args['email'], 
           'money' => 100, 
           'bulletNum' => 5,
           'xsft' => 5,
           'hdcx' => 5,
           'chxs' => 5,
           'sszm' => 5,
           'addTimeStamp' => getCurrentTime()));
      $this->_responseText = MYZL_HINT_ADDUSER_SUC;
    }catch (DB_Exception $e){
      $errorNum = $oTableOperate->getErrorNum();
      $this->_retMsg = $oTableOperate->getErrorInfo().$e->getMessage();
      $this->_retValue = genRetCode($errorNum);
      interface_log(ERROR, $this->_retValue, $this->_retMsg);
      return false;
    }
    return true;
  }
}

?>