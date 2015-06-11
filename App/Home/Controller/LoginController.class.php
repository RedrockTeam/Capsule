<?php
namespace Home\Controller;
use Think\Controller;

class LoginController extends Controller {

    public function login(){
//        $username = I('post.username');
//        $password = I('post.password');
        $username = '2012138190';
        $password = '24586';
        $uri = "http://hongyan.cqupt.edu.cn/RedCenter/Api/Handle/login";
        // 参数数组
        $data = array(
            'user' => $username,
            'password' => $password
        );
        $re = $this->curl($data,$uri);
        switch ($re['status']){
            case '200':
                $this->redirect('Home/Index/index');
            break;
            case '408':
                $this->error('用户名或密码错误');
            break;
            case '409':
                $this->error('用户名不存在');
            break;
            default:
                $this->error('登陆失败');
        }
    }

    public function logout(){
        session_unset();
        session_destroy();
        $this->redirect('Home/Index/index');
    }

    private function curl($info,$uri){
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $uri);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $info);
        $return = curl_exec($ch);
        curl_close($ch);
        $result = json_decode($return, true);    //json字符串转化为数组

        return $result;
    }
}