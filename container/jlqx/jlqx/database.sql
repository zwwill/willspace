CREATE TABLE users
(
studentID VARCHAR(16) NOT NULL UNIQUE PRIMARY KEY  COMMENT '学号',
userName NVARCHAR(10) NOT NULL COMMENT '姓名',
sex TINYINT NOT NULL COMMENT '性别，0男，1女',
citizenID VARCHAR(18) NOT NULL UNIQUE COMMENT '身份证号码',
admissionDate DATE NOT NULL COMMENT '入学日期',
admissionDepartment INT(4) COMMENT '入学院系',
admissionMajor NVARCHAR(16) COMMENT '入学专业',
phoneNumber VARCHAR(15) NOT NULL COMMENT '手机号',
qqNumber INT(11) COMMENT 'QQ号',
email VARCHAR(32) COMMENT '邮箱',
naviePlace NVARCHAR(15) NOT NULL COMMENT '籍贯',
ethnicGroup NVARCHAR(10) NOT NULL COMMENT '民族',
password VARCHAR(20) NOT NULL COMMENT '密码',
userLevel INT(4) NOT NULL DEFAULT 0 COMMENT '用户等级，0最低，3最高',
activityHours INT(8) DEFAULT 0 COMMENT '用户服务总时长'
);

CREATE TABLE activities
(
activityID BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '活动唯一ID',
studentID VARCHAR(16) NOT NULL COMMENT '学号',
userName NVARCHAR(10)  COMMENT '姓名',
activityName NVARCHAR(20) NOT NULL COMMENT '项目名称',
activityDetail NVARCHAR(20) NOT NULL COMMENT '活动内容',
activityDate DATE NOT NULL COMMENT '活动日期',
activityHour INT(4) NOT NULL COMMENT '活动时长',
activityRemark NVARCHAR(100) COMMENT '活动备注',
activityArticle NVARCHAR(1024) COMMENT '活动心得'
);

CREATE TABLE act_release
(
actID BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '发布活动唯一ID',
actPRID VARCHAR(16) NOT NULL COMMENT '活动负责人ID',
actPRContact NVARCHAR(40) NOT NULL COMMENT '活动负责人联系方式',
actCodeNum INT(8) NOT NULL COMMENT '活动代号',
actDept INT(4) NOT NULL COMMENT '活动院系',
actName NVARCHAR(20) NOT NULL COMMENT '项目名称',
actDate DATE NOT NULL COMMENT '活动日期',
actTime TIME NOT NULL COMMENT '活动时间',
actHour INT(4) NOT NULL COMMENT '活动时长',
actLimit INT(6) NOT NULL COMMENT '人数限制',
actSigned INT(6) DEFAULT 0 COMMENT '已报名人数',
actTaken INT(6) DEFAULT 0 COMMENT '实际参加人数',
actPlace NVARCHAR(20) NOT NULL COMMENT '活动地点',
actDeadline DATETIME NOT NULL COMMENT '报名截止时间',
actRemark NVARCHAR(50) COMMENT '活动备注',
actState TINYINT  DEFAULT 0 COMMENT '活动状态，未开始0，未生成活动记录1，完成2',
actArticle NVARCHAR(1000) COMMENT '活动新闻稿'
);

CREATE TABLE act_dict
(
actCodeNum INT(8) NOT NULL  PRIMARY KEY AUTO_INCREMENT COMMENT'活动代号',
actName NVARCHAR(20) NOT NULL COMMENT '活动名称',
actHour INT(4) NOT NULL COMMENT '活动时长',
actTime TIME NOT NULL COMMENT '活动时间（不限定日）',
actIntro NVARCHAR(20) NOT NULL COMMENT '活动简介'
);

CREATE TABLE act_dict_stu 
(
actCodeNum INT(8) NOT NULL COMMENT'活动代号',
studentID VARCHAR(16) NOT NULL COMMENT '绑定学号',
PRIMARY KEY(actCodeNum, studentID)
);

CREATE TABLE act_relation
(
actID BIGINT COMMENT '发布活动唯一ID',
studentID VARCHAR(16) COMMENT '学生ID',
stuTimestamp TIMESTAMP COMMENT'参加时间戳',
stuRemark NVARCHAR(50) COMMENT '学生备注',
stuLike TINYINT DEFAULT 0 COMMENT '是否赞，0不赞，1赞',
stuComment NVARCHAR(50) COMMENT '学生评论',
stuCommentReply NVARCHAR(50) COMMENT '回复学生评论',
stuState TINYINT DEFAULT 0 COMMENT '参加状态，-1报名未参加活动，0取消参加，1参加，2活动完成，3审核通过',
stuActivityRemark NVARCHAR(100) COMMENT '活动备注',
stuActivityDetail NVARCHAR(20) NOT NULL COMMENT '活动内容',
PRIMARY KEY(actID, studentID)
);
/*
								0 金陵学院
                  <option value="1" selected="selected">传媒学院</option>
                  <option value="2" >信息科学与工程学院</option>
                  <option value="3" >商学院</option>
                  <option value="4" >化学与生命科学学院</option>
				  <option value="5" >艺术学院</option>
				  <option value="6" >城市与资源学院</option>
				  <option value="7" >外国语学院</option>
				 
*/