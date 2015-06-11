<?php
namespace Home\Controller;
use Think\Controller;

class IndexController extends Controller {

    /**
     * 首页
     */
    public function index(){
        $this->display();
    }

    /**
     * 文件上传
     */
    public function upload(){
        //把这一批次上传的文件打包
        $this->package();
        //获取上传信息
        $info = $this->upFile();
        if(!is_array($info)){
            $this->error($info);
        }
        // 遍历上传文件信息, 传入数据库
        foreach($info as $key => $value){
            //取出文件的md5的hash值
            $hash = $value['md5'];
            //查询文件是否存在, 文件过期的时候记得删除数据库里面的数据, 或者只查询在保质期内的数据
            $isExist = M('uploadfile')->where(array('filehash' => $hash))->select();
            //如果文件存在, 就将其删除用新上传的文件替换并且修改savepath
            if($isExist){
                foreach($isExist as $v){
                    $file = './Uploads/'.$v['savepath'];
                    if(is_file($file)){
                        $result = unlink($file);
                        if($result){
                            // echo  "删除成功";
                        }else{
                            $this->error('删除失败');
                        }
                    }
                    // 删除老旧的同一个文件之后, 修改之前数据库里面的文件位置
                    $datav =[
                        'id' => $v['id'],
                        'savepath' => $value['savepath'].$value['savename']
                    ];
                    M('uploadfile')->data($datav)->save();
                }
            }
            //添加上传文件信息
            $data = [
                'filename' => $value['name'],    //文件原名
                'type' => $value['ext'],         //文件类型(后缀名)
                'size' => $value['size'],        //文件大小
                'time' => time(),                //上传时间
                'savepath' => ($value['savepath'].$value['savename']),  //存储路径
                'filehash' => $value['md5'],     //文件的hash编码
                'user_id' => 1,                  //上传用户的ID
                'code_id' => session('userid')
            ];
            //插入到数据库
            $result = M('uploadfile')->data($data)->add();
            if(!$result){
                $data['status']  = 1;
                $data['content'] = '上传失败';
                $this->ajaxReturn($data,'json');
            }
        }
    }
    /**
     * 上传文件函数
     */
    private function upFile(){
        $upload = new \Think\Upload();// 实例化上传类
        $upload->maxSize = 3145728;// 设置附件上传大小, 以字节为单位
        $upload->exts = array('jpg', 'gif', 'png', 'jpeg','zip','rar','7z','doc','docx','xlsx','xls','pdf','psd','ppt','pptx','avi','wmv','mkv','flv','mp4','rmvb','mpg','txt');// 设置附件上传类型
        $upload->rootPath = './Uploads/'; // 设置附件上传根目录;
        $upload->savePath = ''; // 设置附件上传（子）目录
        $upload->saveName = 'com_create_guid';// 采用GUID序列命名
        // 上传文件
        $info   =   $upload->upload();
        if(!$info) {// 上传错误提示错误信息
            return $upload->getError();
        }else{// 上传成功
            return $info;
        }
    }
    /**
     * 获取到毫秒的时间戳
     */
    private function getMillisecond() {
        list($s1, $s2) = explode(' ', microtime());
        return (float)sprintf('%.0f', (floatval($s1) + floatval($s2)) * 1000);
    }

    /**
     * 生成下载码函数(截取时间戳转换成36进制数)
     */
    private function getDownLoadCode(){
        $msec = $this->getMillisecond();
        $s = substr($msec,4);  //截取之后的字符串
        $str = "0123456789abcdefghijklmnopqrstuvwxyz";
        $res = "";
        while($s){
            $res .= $str[$s % 35];
            $s = intval($s/36);
        }
        while(strlen($res) < 6){
            $res= '0'.$res;
        }
        return $res;
    }
    /**
     * 文件打包
     */
    private function package(){
        $fileID = I('post.id');
        if($fileID == 'WU_FILE_0'){
            //如果id等于0说明是一次上传的开始,在上传码表里面插入一条数据并且存进session
            $data = [
                'downloadcode' => $this->getDownLoadCode()    //下载码
            ];
            $codeId = M('code')->data($data)->add();
            if(!$codeId){
                $data['status']  = 1;
                $data['content'] = '上传失败';
                $this->ajaxReturn($data,'json');
            }else{
                session('userid',$codeId);
            }
        }
    }

}