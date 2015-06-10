/**
 * Created by observer on 15/6/10.
 */
$(function(){
    var unfold = $('.item .code i');
    var files= $('.file-box');
    var codes = $('.item');
    var aside = $('.aside');
    var headerHeight = $('.header').height();
    var wrapper = $('.wrapper');
    var pageHeight = $('.wrapper-bottom').height();
    var choose = $('.checkbox');

    //重设高度
    function reSize(){
        var clientHeight = $(window).height();
        var bottomHeight = clientHeight-headerHeight;

        aside.eq(0).css('height',bottomHeight);

        var fileHeight = bottomHeight - pageHeight - 10;
        wrapper.eq(0).css('height',fileHeight);

    }

    reSize();

    $(window).bind('resize',function(){
        reSize();
    });

    //展开内容
    unfold.bind('click',function(){
        var self = $(this);
        var index = unfold.index(self);
        var file= files.eq(index);
        var code = codes.eq(index);
        var itemBox = $(this).parent().parent().parent();

        if(file.css('display') == 'none'){
            file.css('display','block');
            code.addClass('item-unfold');
            self.html('<i class="iconfont">&#xe604;</i>')
        }else{
            file.css('display','none');
            code.removeClass('item-unfold');
            self.html('<i class="iconfont">&#xe608;</i>');
            itemBox.find('.checkbox i').removeClass('checked');
        }
    });

    //全选监听
    function chooseAll(target,parent,flag){
        var check = parent.find('.file .checkbox i');
        var checked = parent.find('.file .checked');
        var chooseAll = parent.find('.chooseAll');

        if(target.hasClass('chooseAll') && flag){
            check.addClass('checked')
        }else if(target.hasClass('chooseAll') && !flag){
            checked.removeClass('checked')
        }else if(check.length == checked.length){
            chooseAll.addClass('checked')
        }else if(check.length != checked.length){
            chooseAll.removeClass('checked');
        }

    }

    //选择
    choose.bind('click',function(){
        var choose = $(this).find('i');
        var chooseOn = $(this).find('i').hasClass('checked');
        var parent = choose.parent().parent().parent().parent();
        if(chooseOn){
            choose.removeClass('checked');
            chooseAll(choose,parent,false);
        }else{
            choose.addClass('checked');
            chooseAll(choose,parent,true);
        }
    });

    /*登陆框和下载框公共功能提取函数*/
    function alert_box(fire_target, run_target,fn){
        fire_target.click(function(){
            if($('#banner')){
                $('#banner').css('filter','alpha(opacity=30)');
                $('.btn').css('filter','alpha(opacity=30)');
            }else {
                $("#main_box").addClass("active");
            }

            run_target.css('display',"block");


            $('.close_btn').on('click',function(){
                if($('#banner')){
                    $('#banner').css('filter','alpha(opacity=100)');
                    $('.btn').css('filter','alpha(opacity=100)');
                }else {
                    $('#main_box').removeClass('active');

                }
                run_target.css('display',"none");
                $(this).off();
            });

            $(document).on('keydown',function(event){
                if(event.keyCode === 27){
                    $('#main_box').removeClass('active');
                    run_target.css('display',"none");
                    $(this).off();
                }
            });

            if(fn){
                fn();
            }
        });
    }

    /*上传框*/
    if($('.upload')){
        alert_box($('.upload'),$('#uploader'),function(){
            $('#uploader').css('width','926px');
        });
    }


    /*uploader插件*/
    var $list = $('#thelist');
    var uploader = WebUploader.create({

        // swf文件路径
        swf : 'Uploader.swf',

        // 文件接收服务端。
        server: 'http://webuploader.duapp.com/server/fileupload.php',

        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: '#picker',

        // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
        resize: false
    });

    uploader.on( 'fileQueued', function( file ) {
        $list.append( '<div id="' + file.id + '" class="item">' +
            '<h4 class="info">' + file.name + '</h4>' +
            '<p class="state">等待上传...</p>' +
            '</div>' );
    });

    // 文件上传过程中创建进度条实时显示。
    uploader.on( 'uploadProgress', function( file, percentage ) {
        var $li = $( '#'+file.id ),
            $percent = $li.find('.progress .progress-bar');

        // 避免重复创建
        if ( !$percent.length ) {
            $percent = $('<div class="progress progress-striped active">' +
                '<div class="progress-bar" role="progressbar" style="width: 0%">' +
                '</div>' +
                '</div>').appendTo( $li ).find('.progress-bar');
        }

        $li.find('p.state').text('上传中');

        $percent.css( 'width', percentage * 100 + '%' );
    });

});