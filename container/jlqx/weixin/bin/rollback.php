<?php
require_once dirname(__FILE__) . '/../common/Common.php';
$fightId = $argv[1];
try {
	$oTable = new SingleTableOperation('cFight');
	$data = $oTable->getObject(array('fightId' => $fightId));
	if(empty($data)) {
		echo 'fight with id:' . $fightId . ' not exists!';
		exit(0);
	}
	$fightInfo = $data[0];
	if (!$fightInfo['lastInfo']) {
		echo "lastInfo is empty, fightId:" . $fightId;
		exit(0);
	}
	$lastInfo = json_decode($fightInfo['lastInfo'], true);
	unset($lastInfo['fightId']);
	$oTable->updateObject($lastInfo, array('fightId' => $fightId));
} catch (DB_Exception $e) {
	echo 'mysql error!' . $oTable->getErrorInfo().$e->getMessage();
}