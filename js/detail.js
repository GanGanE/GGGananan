/**
 * Created by hxsd on 2017/6/28.
 */
//获取专辑对应的歌曲列表
function getPlayList(id,callback){
    $.ajax({
        type:"get",
        //url:"data/playlist.json",
        url:"https://api.imjad.cn/cloudmusic/?type=playlist&id="+id,
        async:true,
        success:function(data){
            callback(data.playlist)
            console.log(data)
        }
    });
}
$(".prev").click(function(){
    router("tab");
    router("audio",$("#global"))
})
//获取专辑的id号码
var params=getUrlParms();
console.log("专辑id号码为："+params.id);
getPlayList(params.id,function(data){
    var $musicList=$("#musicList");
    var li=$("#listItem").html();
    for(var i=0;i<data.tracks.length;i++){
        var music=data.tracks[i];
        var $li=$(li);
        console.log($li.find('.music').html)
        $li.find(".music").html(music.name);
        $li.find(".artist").html(music.ar[0].name);

        if(isCollected(music.id)){
            $li.find("span").addClass("yes")
        }else{
            $li.find("span").addClass("no")
        }
        $li.appendTo($musicList);

        $li.data("music",music).click(function(){
            musicControler.play($(this).data("music"));
        })
        $li.find("span").data("music",music).click(function(e){
            e.stopPropagation();
            //console.log($(this).data("music").id);
            var music=$(this).data("music")
            if(localStorage.collection){
                var list=JSON.parse(localStorage.collection);
                console.log("缓存对象存在")
                //当前音乐是否被收藏
                if(isCollected(music.id)){
                    //修改对象数据并保存到缓存中
                    list[music.id].isCollected=false;
                    //修改视图中的数据
                    $(this).removeClass().addClass("no")
                    console.log("取消收藏"+music.id)
                }else{
                    console.log("收藏歌曲"+music.id)
                    list[music.id]={"name":music.name,"artist":music.ar[0].name,isCollected:true}
                    $(this).removeClass().addClass("yes");
                }
            }else{
                console.log("第一次缓存")
                localStorage.collection={};
                var list=localStorage.collection;
                list[music.id]={"name":music.name,"artist":music.ar[0].name,isCollected:true}
            }
            localStorage.collection=JSON.stringify(list);
            $(this).removeClass().addClass("yes");
        })
/*        $li.find(".collect").data("music",music).click(function(){
            var music=$(this).data("music");
            var clist=JSON.parse(localStorage.clist);
            music.isCollection=true;//标示当前音乐已经被收藏
            clist[music.id]=music;
            localStorage.clist=JSON.stringify(clist);
        })*/
    }
})
/*localStroage.collection={
 "12345":{name:"你在他乡还好吗",artist:"李宇",isCollected:true}
 "11112":{name:"你在他乡还好吗1",artist:"李宇1",isCollected:false}
 "33424":{name:"你在他乡还好吗2",artist:"李宇2",isCollected:true}
}*/
function isCollected(id){
    //将本地缓存中的数据转换为对象
    //判断收藏列表对象是否存在
    if(localStorage.collection){
        var list=JSON.parse(localStorage.collection);
    }else{
        return false
    }

    //列表对象中是否存在指定一月ID对应的数据
    //在数据中查找iscollected true false
        if(list&&list[id]&&list[id].isCollected){
            return true;
        }else{
            return false;
        }
}
