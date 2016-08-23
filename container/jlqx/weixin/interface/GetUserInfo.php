<?php
/**
 * 获取用户信息
 */

require_once dirname(__FILE__) . '/common/Common.php';


class GetUserInfo extends AbstractInterface {
  
	private $_args;
	private $_oTable;
	
	

	public function verifyInput(&$args) {			
		
    	$this->_args = array(
    		"userId" => $this->_fromUserName
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
		return true;
	}
	
	public function process() {
		
		try {
			
			$this->_oTable->setTableName('cUser');
			$data = $this->_oTable->getObject($this->_args);
			$this->_data = $data;
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