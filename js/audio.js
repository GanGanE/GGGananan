/**
 * Created by hxsd on 2017/6/28.
 */
var musicControler={
    server: "http://musicapi.duapp.com/api.php",
    play:function(music){
        var $state=$("#music_state");
        $state.html("歌曲正在加载中")
        $.ajax({
            type:"get",
            //url:"Faded-Alan Walker.mp4",
            url:this.server+"?type=url&id="+music.id,
            async:true,
            success:function(data){
                $state.html("歌曲已经加载成功")
                var audio=$("#audio").get(0);//将jq对象转换为js对象
                audio.src=data.data[0].url;
                //console.log(data.data[0].url)
                audio.play();
                $("#btn").addClass("play");
                $("#btn").click(function(){
                    if($(this).hasClass("play")){
                        audio.pause();
                        $(this).removeClass("play");
                        $(this).addClass("pause");
                    }else{
                        audio.play();
                        $(this).removeClass("pause");
                        $(this).addClass("play");
                    }
                })
            }
        });
        var $name=$("#music_name");
        $name.html(music.name);
    }
}