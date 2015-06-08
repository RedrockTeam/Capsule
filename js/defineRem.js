/**
 * Created by Raymond on 15/6/2.
 */

function defineRem(){
    var doc = document,
        docEl = doc.documentElement || doc.body,
        witDoc = docEl.offsetWidth;

    if(witDoc > 960){
        docEl.style.fontSize = witDoc / 72 + 'px';
    }else{
        docEl.style.fontSize = "13.3px";
    }
}
defineRem();

window.onresize = defineRem;