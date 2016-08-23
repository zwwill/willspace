<?php

require_once dirname(__FILE__) . '/common/Common.php';


class GetOpponent extends AbstractInterface {
  
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
	
	public function prepareData(){
		return true;
	}
	
	public function process() {
		
		try {
			$this->_oTable->setTableName('cUser');
			$data = $this->_oTable->getObject(array('userId' => $this->_args['userId']));
			if(count($data) == 0) {
				$this->_retValue = EC_RECORD_NOT_EXIST;
				$this->_retMsg = "userId:" . $this->_args['userId'];
				interface_log(ERROR, $this->_retValue, $this->_retMsg);
				return false;
			}
			$this->_oTable->setTableName ( 'cFight' );
			$data = $this->_oTable->getObject ( array ('user1' => $this->_args ['userId'], 'user2' => $this->_args ['userId'] ), 1 );
			if (count ( $data ) > 1) {
				$this->_retValue = EC_MULTIPLE_FIGHT;
				$this->_retMsg = "userId:" . $this->_args ['userId'];
				interface_log ( ERROR, $this->_retValue, $this->_retMsg );
				return false;
			} else if (empty ( $data )) {
				$this->_data = array();
				return true;
			} else {
				//match sucess
				$this->_data = $data [0];
				return true;
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