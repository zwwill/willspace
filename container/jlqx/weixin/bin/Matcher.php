#!/usr/local/services/php/bin/php
<?php
require_once dirname(__FILE__) . '/../common/Common.php';
$maxMoney = 100;
$minMoney = 10;
try {

  $oTable = new SingleTableOperation('cWaitingUser', 'MYZL');
  while (1) {
    $data = $oTable->getObject(array('_sortExpress' => 'addTimeStamp'));
    matcher_log(DEBUG, 0, json_encode($data));
    if(count($data) < 2) {
      sleep(2);
      continue;
    } else {
      $length = count($data);
      for ($i = 0; $i + 1 < $length; $i = $i + 2) {
        $userId1 = $data[$i]['userId'];
        if($i >= $length) {
          continue;
        }
        $userId2 = $data[$i + 1]['userId'];
        DbFactory::getInstance('MYZL')->autoCommit();
        //minus bullets
        DbFactory::getInstance('MYZL')->update("update cUser set bulletNum=bulletNum-1 where userId IN('" . $userId1 . "', '" . $userId2 . "')");
        //删除
        $oTable->delObject(array('userId' => array($userId1, $userId2)));
        //添加
        $oTable->addObject(array(
          '_tableName' => 'cFight',
          'user1' => $userId1,
          'user2' => $userId2,
          'first' => $userId1,
          'current' => $userId1,
          'operation' => START,
          'maxMoney' => $maxMoney,
          'minMoney' => $minMoney,
          'operator' => 0
        ));
        matcher_log(DEBUG, 0, "add $userId1 and $userId2 to fight");
        DbFactory::getInstance('MYZL')->tryCommit();
      }
      
    }
  }
} catch (DB_Exception $e) {
  DbFactory::getInstance()->rollback();
  matcher_log(ERROR, 0, $oTable->getErrorInfo().$e->getMessage());
}
