-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2014 年 07 月 13 日 02:16
-- 服务器版本: 5.5.24-log
-- PHP 版本: 5.3.13

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `mzorzdb`
--

-- --------------------------------------------------------

--
-- 表的结构 `about_us`
--

CREATE TABLE IF NOT EXISTS `about_us` (
  `abus_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '关于我们编号',
  `abus_title` varchar(30) COLLATE utf8_bin NOT NULL COMMENT '标题',
  `abus_dcrt` text COLLATE utf8_bin NOT NULL COMMENT '文字说明',
  UNIQUE KEY `abus_id` (`abus_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `cases`
--

CREATE TABLE IF NOT EXISTS `cases` (
  `case_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '案例编号',
  `case_name` varchar(30) COLLATE utf8_bin NOT NULL COMMENT '案例名称',
  `case_picurl` varchar(50) COLLATE utf8_bin DEFAULT NULL COMMENT '案例图片url',
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '案例产生时间',
  UNIQUE KEY `case_id` (`case_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `comment`
--

CREATE TABLE IF NOT EXISTS `comment` (
  `cm_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '回复编号',
  `u_id` varchar(20) COLLATE utf8_bin NOT NULL COMMENT '回复人编号',
  `cm_content` text COLLATE utf8_bin COMMENT '回复内容',
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '回复时间',
  UNIQUE KEY `cm_id` (`cm_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `contact_us`
--

CREATE TABLE IF NOT EXISTS `contact_us` (
  `cttus_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '联系我们编号',
  `cttus_qq` varchar(20) COLLATE utf8_bin NOT NULL COMMENT 'qq',
  `cttus_email` varchar(30) COLLATE utf8_bin NOT NULL COMMENT '邮箱',
  `cttus_code` varchar(10) COLLATE utf8_bin NOT NULL COMMENT '邮编',
  `cttus_address` varchar(50) COLLATE utf8_bin NOT NULL COMMENT '地址',
  `cttus_web` varchar(50) COLLATE utf8_bin NOT NULL COMMENT '网址',
  `cttus_rcrutline` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '招聘专线',
  `cttus_phonecall` varchar(20) COLLATE utf8_bin NOT NULL COMMENT '电话传真',
  `cttus_servline` varchar(20) COLLATE utf8_bin NOT NULL COMMENT '客服专线',
  UNIQUE KEY `cttus_id` (`cttus_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `hunts`
--

CREATE TABLE IF NOT EXISTS `hunts` (
  `hunt_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '求职编号',
  `u_name` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '求职人姓名',
  `phone` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '手机号码',
  `rcrt_id` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '职位id',
  `hunt_fileurl` varchar(255) COLLATE utf8_bin NOT NULL COMMENT '简历文件url',
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '投递时间',
  UNIQUE KEY `hunt_id` (`hunt_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=27 ;

--
-- 转存表中的数据 `hunts`
--

INSERT INTO `hunts` (`hunt_id`, `u_name`, `phone`, `rcrt_id`, `hunt_fileurl`, `date`) VALUES
(23, '杨威', '15651701752', '2', '../../upLoadFile/resume/1405157188_新建 Microsoft Word 文档.pdf', '2014-07-12 09:26:28'),
(24, '杨威', '15651701752', '2', '../../upLoadFile/resume/1405157355_新建 Microsoft Word 文档.pdf', '2014-07-12 09:29:15'),
(25, '杨威', '15651701752', '2', '../../upLoadFile/resume/1405157920_新建 Microsoft Word 文档.pdf', '2014-07-12 09:38:40'),
(26, '杨威', '15651701752', '2', '../../upLoadFile/resume/1405183196_新建 Microsoft Word 文档.pdf', '2014-07-12 16:39:56');

-- --------------------------------------------------------

--
-- 表的结构 `message`
--

CREATE TABLE IF NOT EXISTS `message` (
  `msg_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '留言编号',
  `u_id` varchar(20) COLLATE utf8_bin NOT NULL COMMENT '留言人编号',
  `msg_content` text COLLATE utf8_bin NOT NULL COMMENT '留言内容',
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '留言时间',
  UNIQUE KEY `msg_id` (`msg_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=26 ;

--
-- 转存表中的数据 `message`
--

INSERT INTO `message` (`msg_id`, `u_id`, `msg_content`, `date`) VALUES
(12, '1', '留言区', '2014-07-12 17:00:35'),
(13, '1', '苏打粉', '2014-07-12 17:01:52'),
(14, '1', '1', '2014-07-12 17:06:42'),
(15, '1', '1', '2014-07-12 17:06:50'),
(16, '1', '23', '2014-07-12 17:07:50'),
(17, '1', '苏打粉', '2014-07-12 17:08:07'),
(18, '1', '苏打粉', '2014-07-12 17:08:20'),
(19, '1', 'sdf ', '2014-07-12 17:12:48'),
(20, '1', 'df ', '2014-07-12 17:18:58'),
(21, '1', 'sf ', '2014-07-12 17:19:40'),
(25, '1', '大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试大数据量测试', '2014-07-12 18:12:29');

-- --------------------------------------------------------

--
-- 表的结构 `news`
--

CREATE TABLE IF NOT EXISTS `news` (
  `news_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '新闻编号',
  `news_title` varchar(30) COLLATE utf8_bin NOT NULL COMMENT '标题',
  `news_content` text COLLATE utf8_bin NOT NULL COMMENT '内容',
  `news_picurl` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '新闻图片url',
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '日期',
  UNIQUE KEY `news_id` (`news_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=11 ;

--
-- 转存表中的数据 `news`
--

INSERT INTO `news` (`news_id`, `news_title`, `news_content`, `news_picurl`, `date`) VALUES
(7, '国难日！巴西1-7德国 球迷嘶吼眼泪横飞', '当地时间2014年7月9日，贝洛奥里藏特米内朗体育场，2014巴西世界杯半决赛，巴西1-7德国。巴西队半场被灌五球，观看比赛的球迷失声痛哭。', '../../upLoadFile/pic/1404896654_1.jpg', '2014-07-09 09:04:14'),
(8, '半决赛-巴西1-7德国', '2014年7月9日，巴西米内罗竞技场，2014巴西世界杯半决赛，巴西1-7德国。上半场，德国即完成大屠杀，穆勒、克洛泽和赫迪拉分别进球，克罗斯梅开二度；下半场，替补出战的许尔勒连入2球，奥斯卡打入挽回颜面一球，最终，德国7-1屠杀东道主巴西，从而顺利晋级决赛。', '../../upLoadFile/pic/1404896679_2.jpg', '2014-07-09 09:04:39'),
(9, '巴西惨败后爆发骚乱 焚烧国旗+大巴', '2014年7月9日，巴西米内罗竞技场，2014巴西世界杯半决赛，巴西1-7德国。全场比赛1-7，半场0-5，这是巴西球迷难以接受的一个比分，比赛尚未结束，失去理智的巴西球迷就愤怒了。在场外，巴西球迷十分激动，甚至出现了小规模的骚乱。', '../../upLoadFile/pic/1404896707_3.jpg', '2014-07-09 09:05:07'),
(10, '巴西死忠球迷守候在医院', '北京时间7月5日凌晨，1/4决赛中巴西2-1惊险战胜哥伦比亚，但在比赛中受伤的内马尔伤情确诊为椎骨骨裂，已经确定告别本届世界杯。内马尔死忠守候在医院门口。', '../../upLoadFile/pic/1404896765_4.jpg', '2014-07-09 09:06:05');

-- --------------------------------------------------------

--
-- 表的结构 `products`
--

CREATE TABLE IF NOT EXISTS `products` (
  `prd_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '产品编号',
  `prd_name` varchar(30) COLLATE utf8_bin NOT NULL COMMENT '产品名称',
  `prd_picurl` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '产品图片url',
  `prd_dcrt` text COLLATE utf8_bin COMMENT '产品描述',
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '发布时间',
  UNIQUE KEY `prd_id` (`prd_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=7 ;

--
-- 转存表中的数据 `products`
--

INSERT INTO `products` (`prd_id`, `prd_name`, `prd_picurl`, `prd_dcrt`, `date`) VALUES
(3, 'Picasa网络相册', '../../upLoadFile/pic/1404899339_house.jpg', '网上照片分享站点，与Picasa照片编辑软件集成。', '2014-07-09 09:48:59'),
(4, 'Google阅读器', '../../upLoadFile/pic/1404899357_img.jpg', '网络新闻集成阅读工具。用户可以搜索、导入、订阅Atom和RSS feed。这项服务还支持嵌入的音频附件（Audio Enclosures）。2006年10月进行了重大的系统更新，于2013年7月1日终止服务。', '2014-07-09 09:49:17'),
(5, 'YouTube', '../../upLoadFile/pic/1404899371_qingdan.jpg', '著名的网络视频分享站点。用户可以上载、观看、分享视频短篇。Google于2006年10月宣布以价值16.5亿美元的Google股票收购YouTube。并于2006年11月13日完成收购。', '2014-07-09 09:49:31'),
(6, '测试文本溢出省略', '../../upLoadFile/pic/1404975963_sea.jpg', '测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略测试文本溢出省略', '2014-07-10 07:06:03');

-- --------------------------------------------------------

--
-- 表的结构 `recruit`
--

CREATE TABLE IF NOT EXISTS `recruit` (
  `rcrt_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '招聘编号',
  `rcrt_job` varchar(20) COLLATE utf8_bin NOT NULL COMMENT '招聘职位',
  `rcrt_money` varchar(50) COLLATE utf8_bin DEFAULT '面议' COMMENT '薪酬',
  `rcrt_place` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '工作地点',
  `rcrt_edu` varchar(50) COLLATE utf8_bin DEFAULT NULL COMMENT '学历要求',
  `rcrt_exp` varchar(50) COLLATE utf8_bin DEFAULT NULL COMMENT '工作经验',
  `rcrt_detail` text COLLATE utf8_bin COMMENT '招聘细节',
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '发布时间',
  UNIQUE KEY `rcrt_id` (`rcrt_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=4 ;

--
-- 转存表中的数据 `recruit`
--

INSERT INTO `recruit` (`rcrt_id`, `rcrt_job`, `rcrt_money`, `rcrt_place`, `rcrt_edu`, `rcrt_exp`, `rcrt_detail`, `date`) VALUES
(1, 'JAVA工程师', '3000-5000', '南京', '本科', '1-3年', '无', '2014-07-09 06:29:46'),
(2, '软件工程师', '8000', '南京', '本科', '2-5年', '无', '2014-07-09 06:30:03'),
(3, '测试人员', '3000-5000', '南京', '本科', '1-3年', '牛逼', '2014-07-09 06:30:32');

-- --------------------------------------------------------

--
-- 表的结构 `servers`
--

CREATE TABLE IF NOT EXISTS `servers` (
  `serv_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '服务编号',
  `serv_name` varchar(30) COLLATE utf8_bin NOT NULL COMMENT '服务名称',
  `serv_picurl` varchar(50) COLLATE utf8_bin DEFAULT NULL COMMENT '服务图片url',
  `serv_content` text COLLATE utf8_bin NOT NULL COMMENT '服务内容',
  `serv_servline` varchar(15) COLLATE utf8_bin NOT NULL COMMENT '咨询热线',
  UNIQUE KEY `serv_id` (`serv_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `u_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户编号',
  `u_name` varchar(15) COLLATE utf8_bin NOT NULL COMMENT '用户名',
  `u_pw` varchar(50) COLLATE utf8_bin NOT NULL COMMENT '密码',
  `u_role` varchar(50) COLLATE utf8_bin NOT NULL DEFAULT 'common' COMMENT '用户身份',
  `u_phone` varchar(11) COLLATE utf8_bin DEFAULT NULL COMMENT '手机',
  `e_mail` varchar(100) COLLATE utf8_bin DEFAULT NULL COMMENT '邮箱',
  UNIQUE KEY `u_id` (`u_id`),
  UNIQUE KEY `u_name` (`u_name`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=3 ;

--
-- 转存表中的数据 `users`
--

INSERT INTO `users` (`u_id`, `u_name`, `u_pw`, `u_role`, `u_phone`, `e_mail`) VALUES
(1, 'revolyw', '104132', 'admin', NULL, NULL),
(2, '1', '1', 'common', NULL, NULL);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
