<?php if (!defined('THINK_PATH')) exit();?><!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
<form action="<?php echo U('Home/Index/upload');?>" enctype="multipart/form-data" method="post" >
        <input type="file" name="file[]" />
        <a href="javascript:void(0);" id="uploadBtn">再选择一个文件</a>
        <input type="submit" value="提交" >
</form>
</body>
<script src="/Capsule/App/Home/Public/js/upload.js"></script>
</html>