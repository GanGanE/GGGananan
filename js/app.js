function getUrlParms(){
    var params={};
    var url=window.location.href;;
    var arr=url.split("?");
    if(arr.length==2){
        var p=arr[1];
    }else{
        return params;
    }
    var parr=p.split("&");
    for(var i=0;i<parr.length;i++){
        var kv=parr[i].split("=");
        params[kv[0]]=kv[1];
        //console.log(params)
    }
	return params;
}
//getUrlParms();

function getM(){
    var url=window.location.href;
    var arr=url.split("#");
    if(arr.length!=2){
        return false;
    };
    var p = arr[1];
    p = p.split("?");
    return p[0];
}


//加载模块的函数
function router(m,container){
    container=container || $("#share")
    $.ajax({
        url:"views/"+m+".html",
        success:function(data){
            container.html(data)
        }
    })
    //请求js文件
    loadJs(m);
}
function loadJs(m){
    $.ajax({
        url:"js/"+m+".js",
    })
}
$(function(){
    //首次加载--打开欢迎页，两次以上打开的是tab模块


/*   if(!localStorage.count){
        localStorage.count=0;
    }
    localStorage.count++;
    if(localStorage.count==1){
        router("hello");
    }else{
        router("tab");

    }*/
    router("tab");
    router("audio",$("#global"));
    //console.log(JSON.parse(localStorage.collection))
})