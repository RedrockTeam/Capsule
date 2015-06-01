/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50617
Source Host           : 127.0.0.1:3306
Source Database       : capsule

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2015-06-01 22:04:17
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for code
-- ----------------------------
DROP TABLE IF EXISTS `code`;
CREATE TABLE `code` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `downloadcode` char(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for uploadfile
-- ----------------------------
DROP TABLE IF EXISTS `uploadfile`;
CREATE TABLE `uploadfile` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) NOT NULL,
  `type` varchar(20) NOT NULL,
  `size` double NOT NULL,
  `time` int(11) NOT NULL,
  `savepath` varchar(255) NOT NULL,
  `filehash` char(32) NOT NULL,
  `user_id` int(11) NOT NULL,
  `code_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=203 DEFAULT CHARSET=utf8;
