/**
 * Created by hxsd on 2017/6/27.
 */
function load(m){
    m=m||"home";
    router(m,$("#tabcontainer"))
}
load("home");

$(function(){
    $("#m1").click(function(){
        load("home");
    }),
    $("#m2").click(function(){
        load("songlist");
    }),
    $("#m3").click(function(){
        load("order")
    }),
    $("#m4").click(function(){
        load("singer")
    })
})