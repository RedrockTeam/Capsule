/**
 * Created by Raymond on 15/5/31.
 */
;(function(){

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

    /*解决IE8下REM和居中的问题*/
    (function(){

        var isIE=!!window.ActiveXObject,
            isIE8=isIE&&!!document.documentMode;

        function reSizeEvent(){
            if(isIE8){

                var $html = $('html'),
                    $wrapCon = $('#wrap_content'),
                    $h4Con = $('#content h4'),
                    $h1Con = $('#content h1'),
                    $iCon = $('#content i'),
                    outWid = parseInt($html.css('width')),
                    outHei = parseInt($html.css('height')),
                    inWid = parseInt($wrapCon.css('width')),
                    inHei = parseInt($wrapCon.css('height')),
                    rem = parseInt($html.css('fontSize'));

                $wrapCon.css('left', ((outWid - inWid)/2) + 'px' );
                $wrapCon.css('top', ((outHei - inHei)/2) + 'px' );

                $h1Con.css('fontSize',(rem * 3.5) + 'px');
                $h1Con.css('marginBottom',(rem * 0.75) + 'px');

                $('.download, .upload').each(function(){
                    $(this).css('width',(rem * 10.5) + 'px');
                    $(this).css('height',(rem * 3) + 'px');
                    $(this).css('fontSize',(rem * 1.2) + 'px');
                    $(this).css('lineHeight',(rem * 3) + 'px');
                    $(this).css('marginTop', (rem * 3) + 'px');
                    $(this).css('marginRight', (rem * 1.5) + 'px');
                });

                $h4Con.css('marginTop', rem + 'px');
                $h4Con.css('fontSize', (1.5 * rem) + 'px');
                $h4Con.css('lineHeight', (2.2 * rem) + 'px');

                $iCon.css('fontSize', (1.2 * rem) + 'px');
                $iCon.css('paddingRight', (0.3 * rem) + 'px');



            }
        }

        reSizeEvent();
        $(window).on('resize',reSizeEvent);




    })();


    /*登陆框*/
    alert_box($('.login_btn'), $('#login_box'),function(){
        $('.student_number, .password').each(function(){
            var text = ''
            $(this).on('focus',function(){
                text = $(this).val();
                $(this).val('');
            });
            $(this).on('blur',function(){
                if($.trim($(this).val()) == ''){
                    $(this).val(text);
                }
            })
        })
    });

    /*下载框*/
    if($('.download')){
        alert_box($('.download'), $('#input_box'),function(){
            var count = 0
            $(document).on('keydown',function(event){

                if((event.keyCode >= 48 && event.keyCode <= 57 || event.keyCode >= 65 && event.keyCode <= 90 || event.keyCode >= 97 && event.keyCode <= 122 || event.keyCode == 27) && count < 6){
                    if(event.keyCode === 27){
                        console.log(event);
                        event.stopPropagation();
                        $('#input_box li').eq(count).html('');
                        count--;
                        return false;
                    }
                    $('#input_box li').eq(count).html(String.fromCharCode(event.keyCode));
                    count++;

                    if(count === 6){
                        var str = '';
                        $('#input_box li').each(function(){
                            str += $(this).html();
                        });
                        $('.input_number').html(str);
                    }
                }
            })
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




})();
