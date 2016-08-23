<?php
/**
 * 修改用户信息
 */

require_once dirname(__FILE__) . '/common/Common.php';


class UpdateUserInfo extends AbstractInterface {
  
	private $_args;
	private $_oTable;
	

	public function verifyInput(&$args) {			
		
		$req = $args['interface']['para'];
		$rules = array(
			"userId"=>array("type"=>"int"),
			"userName" => array('type' => 'string', 'nullable' => true),
			"money" => array('type' => 'int', 'nullable' => true),
			"bulletNum" => array('type' => 'int', 'nullable' => true),
			"xsft" =>array('type' => 'int', 'nullable' => true),
			"hdcx" => array('type' => 'int', 'nullable' => true),
			"chxs" => array('type' => 'int', 'nullable' => true),
			"sszm" => array('type' => 'int', 'nullable' => true),
			"win" => array('type' => 'int', 'nullable' => true),
			"loss" => array('type' => 'int', 'nullable' => true),
			"password" => array('type' => 'string', 'nullable' => true),
			"email" => array('type' => 'string', 'nullable' => true),
		);
		$result = ParamChecker::getInstance()->checkParam($rules, $req);
		if(!$result['result']) {
			$this->_retValue = EC_INVALID_INPUT;
			$this->_retMsg = $result['msg'];
			interface_log(ERROR, $this->_retValue, $this->_retMsg);
        	return false;
    	}
    	$keys = array_keys($rules);
    	extract($req);
    	$this->_args = compact($keys);
		if(count($this->_args) == 1) {
			$this->_retValue = EC_INVALID_INPUT;
			$this->_retMsg = "not enough parameter";
			interface_log(ERROR, $this->_retValue, $this->_retMsg);
        	return false;
		}
    	
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
			$userId = $this->_args['userId'];
			unset($this->_args['userId']);
			$data = $this->_oTable->getObject(array('userId' => $userId));
			if(count($data) != 1) {
				$this->_retValue = EC_RECORD_NOT_EXIST;
				$this->_retMsg = "user not exist or internel error!";
				interface_log(ERROR, $this->_retValue, $this->_retMsg);
				return false;
			}
			$this->_oTable->updateObject($this->_args, array('userId' => $userId));
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