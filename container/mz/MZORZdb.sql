CREATE database MZORZdb;

create table users(
u_id int not null unique auto_increment comment '用户编号',
u_name varchar(15) not null unique comment '用户名',
u_pw varchar(50) not null comment '密码',
u_role varchar(50) not null default 'common' comment '用户身份',
u_phone varchar(11) comment '手机',
e_mail varchar(100) comment '邮箱'
);
CREATE TABLE about_us
(
abus_id INT NOT NULL UNIQUE AUTO_INCREMENT COMMENT '关于我们编号',
abus_title VARCHAR(30) NOT NULL COMMENT '标题',
abus_dcrt TEXT NOT NULL COMMENT '文字说明'
);

CREATE TABLE news
(
news_id INT NOT NULL UNIQUE AUTO_INCREMENT COMMENT '新闻编号',
news_title VARCHAR(30) NOT NULL COMMENT '标题',
news_content TEXT NOT NULL COMMENT '内容',
news_picurl VARCHAR(255) COMMENT '新闻图片url',
date TIMESTAMP NOT NULL COMMENT '日期'
);

CREATE TABLE products
(
prd_id INT NOT NULL UNIQUE AUTO_INCREMENT COMMENT '产品编号',
prd_name VARCHAR(30) NOT NULL COMMENT '产品名称',
prd_picurl VARCHAR(255) COMMENT '产品图片url',
prd_dcrt TEXT COMMENT '产品描述',
date TIMESTAMP COMMENT '发布时间'
);
CREATE TABLE cases
(
case_id INT NOT NULL UNIQUE AUTO_INCREMENT COMMENT '案例编号',
case_name VARCHAR(30) NOT NULL COMMENT '案例名称',
case_picurl VARCHAR(50) COMMENT '案例图片url',
date TIMESTAMP NOT NULL COMMENT '案例产生时间'
);

CREATE TABLE servers
(
serv_id INT NOT NULL UNIQUE AUTO_INCREMENT COMMENT '服务编号',
serv_name VARCHAR(30) NOT NULL COMMENT '服务名称',
serv_picurl VARCHAR(50) COMMENT '服务图片url',
serv_content TEXT NOT NULL COMMENT '服务内容',
serv_servline VARCHAR(15) NOT NULL COMMENT '咨询热线'
);

CREATE TABLE recruit
(
rcrt_id INT NOT NULL UNIQUE AUTO_INCREMENT COMMENT '招聘编号',
rcrt_job VARCHAR(20) NOT NULL COMMENT '招聘职位',
rcrt_money VARCHAR(50) default '面议' COMMENT '薪酬',
rcrt_place VARCHAR(255) COMMENT '工作地点',
rcrt_edu VARCHAR(50) COMMENT '学历要求',
rcrt_exp VARCHAR(50) COMMENT '工作经验',
rcrt_detail TEXT COMMENT '招聘细节',
date TIMESTAMP COMMENT '发布时间'
);

CREATE TABLE hunts
(
hunt_id INT NOT NULL UNIQUE AUTO_INCREMENT COMMENT '求职编号',
u_name VARCHAR(20) COMMENT '求职人姓名',
phone VARCHAR(20) COMMENT '手机号码',
rcrt_id VARCHAR(20) COMMENT '职位id' ,
hunt_fileurl VARCHAR(255) NOT NULL COMMENT '简历文件url',
date TIMESTAMP NOT NULL COMMENT '投递时间'
);

/*
CREATE TABLE hunts
(
hunt_id INT NOT NULL UNIQUE AUTO_INCREMENT COMMENT '求职编号',
hunt_name VARCHAR(15) NOT NULL COMMENT '求职者姓名',
hunt_age VARCHAR(10) NOT NULL COMMENT '求职者年龄',
hunt_bckgrd VARCHAR(20) NOT NULL COMMENT '求职者学历',
hunt_exp TEXT COMMENT '求职者工作经验',
hunt_detail TEXT COMMENT '其它补充',
hunt_fileurl VARCHAR(50) NOT NULL COMMENT '简历文件url',
date TIMESTAMP NOT NULL COMMENT '投递日期'
);*/

CREATE TABLE contact_us
(
cttus_id INT NOT NULL UNIQUE AUTO_INCREMENT COMMENT '联系我们编号',
cttus_qq VARCHAR(20) NOT NULL COMMENT 'qq',
cttus_email VARCHAR(30) NOT NULL COMMENT '邮箱',
cttus_code VARCHAR(10) NOT NULL COMMENT '邮编',
cttus_address VARCHAR(50) NOT NULL COMMENT '地址',
cttus_web VARCHAR(50) NOT NULL COMMENT '网址',
cttus_rcrutline VARCHAR(20) COMMENT '招聘专线',
cttus_phonecall VARCHAR(20) NOT NULL COMMENT '电话传真',
cttus_servline VARCHAR(20) NOT NULL COMMENT '客服专线'
);

CREATE TABLE message
(
msg_id INT NOT NULL UNIQUE AUTO_INCREMENT COMMENT '留言编号',
u_id VARCHAR(20) NOT NULL COMMENT '留言人编号',
msg_content TEXT NOT NULL COMMENT '留言内容',
date TIMESTAMP NOT NULL COMMENT '留言时间'
);

CREATE TABLE comment
(
cm_id INT NOT NULL UNIQUE AUTO_INCREMENT COMMENT '回复编号',
u_id VARCHAR(20) NOT NULL COMMENT '回复人编号',
cm_content TEXT COMMENT '回复内容',
date TIMESTAMP NOT NULL COMMENT '回复时间'
);