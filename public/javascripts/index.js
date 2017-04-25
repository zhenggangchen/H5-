/**
 * Created by czg on 2017/4/25.
 */
function $(s){
    return document.querySelectorAll(s);
}
var lis=$("#list li");
for(var i=0;i<lis.length;i++){
    lis[i].onclick= function () {
        for(var j=0;j<lis.length;j++){
            lis[j].className="";
        }
        this.className="selected"
    }
}












