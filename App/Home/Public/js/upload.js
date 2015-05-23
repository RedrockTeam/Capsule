
//加载函数
window.onload = function () {
    var btn = document.getElementById("uploadBtn");
    btn.onclick = function () {
        addUpBtn();
    }
}

//增加一个上传文件的input按钮
function addUpBtn(){
    var upBtn = document.getElementById("uploadBtn");
    var upBtnParent = upBtn.parentNode;
    var newNode = document.createElement("input");
    newNode.setAttribute("type","file");
    newNode.setAttribute("name","file[]");

    upBtnParent.insertBefore(newNode,upBtn);
}