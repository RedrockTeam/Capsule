<?php if (!defined('THINK_PATH')) exit();?><!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <!-- 新 Bootstrap 核心 CSS 文件 -->
    <link rel="stylesheet" href="/Capsule/App/Home/Public/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="/Capsule/App/Home/Public/webuploader/webuploader.css">
</head>
<body>
<div id="uploader" class="wu-example">
    <!--用来存放文件信息-->
    <div id="thelist" class="uploader-list"></div>
    <div class="btns">
        <div id="picker">选择文件</div>
        <button id="ctlBtn" class="btn btn-default">开始上传</button>
    </div>
</div>
<!--<form action="/Capsule/index.php/Home/Index/upload" enctype="multipart/form-data" method="post" >-->
    <!--<input type="text" name="name" />-->
    <!--<input type="file" name="photo[]" />-->
    <!--<input type="file" name="photo[]" />-->
    <!--<input type="file" name="photo[]" />-->
    <!--<input type="file" name="photo[]" />-->
    <!--<input type="file" name="photo[]" />-->
    <!--<input type="submit" value="提交" >-->
<!--</form>-->

</body>
<!-- jQuery文件。务必在bootstrap.min.js 之前引入 -->
<script src="/Capsule/App/Home/Public/js/jquery-1.11.1.js"></script>
<!-- 最新的 Bootstrap 核心 JavaScript 文件 -->
<script src="/Capsule/App/Home/Public/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="/Capsule/App/Home/Public/webuploader/webuploader.js"></script>
<script src="/Capsule/App/Home/Public/js/upload.js"></script>
</html>