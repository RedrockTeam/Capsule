/**
 * Created by Raymond on 15/5/31.
 */
;(function(){

    /*登陆框和下载框*/
    function alert_box(fire_target, run_target,fn){
       fire_target.click(function(){
            $("#main_box").addClass("active");
            run_target.css('display',"block");


            $('.close_btn').on('click',function(){
                $('#main_box').removeClass('active');
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

    alert_box($('.login_btn'), $('#login_box'),function(){
        $('.student_number, .password').each(function(){
            var text = ''
            $(this).on('focus',function(){
                text = $(this).val();
                console.log($(this));
                $(this).val('');
            });
            $(this).on('blur',function(){
                if($(this).val().trim() == ''){
                    $(this).val(text);
                }
            })
        })
    });

    alert_box($('.download'), $('#input_box'),function(){
        var count = 0
        $(document).on('keydown',function(event){
            if((event.keyCode >= 48 && event.keyCode <= 57 || event.keyCode >= 65 && event.keyCode <= 90 || event.keyCode >= 97 && event.keyCode <= 122) && count < 6){
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



})();
