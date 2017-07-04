/**
 * Created by hxsd on 2017/6/30.
 */
var server = "http://musicapi.duapp.com/api.php";
//请求服务器数据
function songList(limit,callback) {
    //判断浏览器是否有缓存
    if( isCheck() ){
        //把缓存中的字符串转换成json数据
        var list=JSON.parse(localStorage.list);
        callback(list)
    }else {
        $.ajax({
            type:'get',
            url: server+"?type=topPlayList&cat=%E5%85%A8%E9%83%A8&offset=0&limit="+limit,
            success:function (data) {
                //把请求到的数据转换成字符串
                var list=JSON.stringify(data.playlists);
                //设置缓存存在的时间
                localStorage.time=new Date().getTime();
                //保存在本地浏览器缓存中
                localStorage.list=list;
                callback(data.playlists)
            }
        });
    }
    function isCheck() {
        //判断是否存在浏览器缓存数据
        if (!localStorage.list) return false;
        //判断缓存时间 超过30秒重新从网络请求数据
        if (new Date().getTime()-localStorage.time>=30*1000) return false;
        else { return true }
    }
}
songList(20,function (data) {

    var $songlist=$(".singer");
    var template=$("#songerItem").html();

    for(var i=0;i<data.length;i++){
        var $template=$(template);
        $template.find("span").html(data[i].playCount);
        $template.find("img").attr("src",data[i].coverImgUrl);
        $template.find("a").attr("href",'#detail?id='+data[i].id);
        $template.find("p").html(data[i].name);
        $template.appendTo($songlist)
    }
});
