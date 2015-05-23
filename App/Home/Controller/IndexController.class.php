<?php
namespace Home\Controller;
use Think\Controller;
class IndexController extends Controller {

    //首页
    public function index(){
        $this->display();
    }

    //文件上传
    /**
     *
     */
    public function upload(){
        $upload = new \Think\Upload();// 实例化上传类
        $upload->maxSize   =     3145728 ;// 设置附件上传大小
        $upload->exts      =     array('jpg', 'gif', 'png', 'jpeg','zip','rar','7z','doc','docx','xlsx','xls','pdf','psd','ppt','pptx','avi','wmv','mkv','flv','mp4','rmvb','mpg','txt');// 设置附件上传类型
        $upload->rootPath  =     './Uploads/'; // 设置附件上传根目录;
        $upload->savePath  =   ''; // 设置附件上传（子）目录
        $upload->saveName = 'com_create_guid';
        // 上传文件
        $info = $upload->upload();
        if(!$info) {// 上传错误提示错误信息
            $this->error($upload->getError());
        }else{// 上传成功
            dd($info);
            $data = [
                'filename' => $info['file']['name'],
                'type' => $info['file']['ext'],
                'size' => $info['file']['size'],
                'time' => time(),
                'savepath' => $info['file']['savepath'].$info['file']['savename'],
                'work_id' => I('get.work_id'),
                'user_id' => I('get.user_id'),
            ];

            if(M('work_up')->data($data)->add())
            {
                $this->success('上传成功');
            }
        }
    }

}