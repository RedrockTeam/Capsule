<?php
return array(
    //设置访问列表
    'MODULE_ALLOW_LIST' => array('Home','Admin'),
    //'DEFAULT_MODULE' => 'Admin',

    //显示信息(基本/加载文件/流程/SQL/调试)右下角

    //'SHOW_PAGE_TRACE'=>true,

    //数据库配置
    'DB_TYPE'               =>  'mysql',     		// 数据库类型
    'DB_HOST'               =>  'localhost', 		// 服务器地址
    'DB_NAME'               =>  'capsule',          // 数据库名
    'DB_USER'               =>  'root',      		// 用户名
    'DB_PWD'                =>  '',    	            // 密码
    'DB_PORT'               =>  '3306',        		// 端口
    'DB_PREFIX'   			=>	'',				    // 表前缀

    'RBAC_ROLE_TABLE' => 'role',        	//角色表名称
    'RBAC_USER_TABLE' => 'user_dept_role',  //角色表和用户表的中间表
    'RBAC_ACCESS_TABLE' => 'access',    	//权限表名称
    'RBAC_NODE_TABLE' => 'node',        	//节点表名称
);
