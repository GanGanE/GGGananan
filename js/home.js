/**
 * Created by hxsd on 2017/6/27.
 */
var server = "http://musicapi.duapp.com/api.php";

function getPlayList(limit,callback){
    if(isCache()){
        console.log("访问缓存")
        //将字符串转换为json对象
        var list=JSON.parse(localStorage.list);
        callback(list);
    }else{
        $.ajax({
            type:"get",
            //url: "data/topPlayList.json",
            url:server+"?type=topPlayList&cat=%E5%85%A8%E9%83%A8&offset=0&limit="+limit,
            async:true,
            success:function(data){
                console.log("访问网络");
                //记录当前缓存时间
                localStorage.cacheTime=new Date().getTime();
                //获取json数据转换字符串
                var list=JSON.stringify(data.playlists);
                //保存缓存中的数据
                localStorage.list=list;
                callback(data.playlists)
            }
        })
    }
    function isCache(){
        if(!localStorage.list){//如果缓存不存在返回false
            return false;
        }if(new Date().getTime()-localStorage.cacheTime>=60*10*1000){//判断缓存是否过期
            return false;
        }
        return true;
    }

}
getPlayList(9,function(data){
    console.log(data)
    var $songlist=$(".songlist");
    var template=$("#templateItem").html();
    for(var i=0;i<data.length;i++){
        var $template=$(template);
        $template.find("a").attr("href","#detail?id="+data[i].id);
        $template.find("span").html(data[i].playCount);
        $template.find("img").attr("src",/*"images/6660841442686019.jpg"*/data[i].coverImgUrl);
        $template.find("p").html(data[i].name);
        $template.appendTo($songlist);
    }
})