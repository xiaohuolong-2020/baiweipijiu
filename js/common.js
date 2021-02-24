$(function(){	
	//直播前调用
	//livebefore();

    //直播中调用
    //liveing();

    //直播后调用
    liveafter();

    //点击切换视频
    $(".video_thumb a").on("click",function(){
        $(this).parent("li").addClass("hover").siblings("li").removeClass("hover");
        $("#video_player,#video_live").remove();
        $(".video_thumb a i,.video_thumb a .icon_play").each(function(){
            $(this).show();
        })
        $(this).find('i').hide();
        $(this).find('.icon_play').hide();

        if(curstate == "stateBefore"){
            $(".comingSoon_txt,.live_before").show();
        }

        //直播
        if($(this).attr("livevid")){
            $(".page_video").append('<div class="video_live" id="video_live"></div>')
            $(".video_live").show();
            $(".video_player").hide();
            if (ua.match(/MicroMessenger/i)=="micromessenger") {
                videoLive();
            }else{
                videoLive2();
            } 
        }else{
            //点播
            if($(this).attr("vid")){
                $(".page_video").append('<div class="video_player" id="video_player"></div>')
                $(".live_before").hide();
                $(".video_player").show();
                var vid = $(this).attr("vid");
                var posterImg = $(this).attr("posterImg");
                videoPlayer(vid,posterImg);
            }else{
                $(".comingSoon_txt").hide();
            }
        }
    });

    
    // 轮播
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        loop:true
    });
})
var ua = navigator.userAgent.toLowerCase(); //获取判断用的对象

var curstate = "";
//直播前
function livebefore(){
	$(".video_player").show();
    $(".video_live,.live_before,.li4 i,.li4 .icon_play").hide();
    $(".li4").addClass("hover");
    var vid = $(".li4 a").attr("vid");
    var posterImg = $(".li4 a").attr("posterImg");
    videoPlayer(vid,posterImg);
    curstate = 'stateBefore';
}
//直播中
function liveing(){
    $(".live_before,.li1,.li2 i,.li2 .icon_play,.btn_yuyue,.hand").hide();
    $(".video_live,.li2,.slogan_live").show();
    $(".li2").addClass("hover");
    if (ua.match(/MicroMessenger/i)=="micromessenger") {
        videoLive();
    }else{
        videoLive2();
    } 
    curstate = 'stateLive';
}
//直播后
function liveafter(){
    $(".live_before,.li1,.li2,.li3 i,.li3 .icon_play,.btn_yuyue,.hand,.slogan_live").hide();
    $(".video_player,.li3,.slogan_after").show();
    $(".li3").addClass("hover");
    var vid = $(".li3 a").attr("vid");
    var posterImg = $(".li3 a").attr("posterImg");
    videoPlayer(vid,posterImg);
    curstate = 'stateAfter';
}
//直播
function videoLive(){
    var player = new TxvLive({
        width:"100%",//如果是移动端 宽高设置为100%
        height:"100%",
        containerId: "video_live",
        vid: "1552930901",
        livepid: '92048',
        autoplay: false,
        poster:'https://mat1.gtimg.com/news/zt2020/BudLight/video_img01.jpg'
    }); 
}
function videoLive2(){
    var player = new TxvLive({
        width:"100%",//如果是移动端 宽高设置为100%
        height:"100%",
        containerId: "video_live",
        vid: "1552930901",
        livepid: '92048',
        autoplay: true,
        poster:'https://mat1.gtimg.com/news/zt2020/BudLight/video_img01.jpg'
    }); 
}
//点播   
function videoPlayer(vid,posterImg){
    var player = new Txplayer({
        width:'100%',
        height:'100%',
        containerId: "video_player",
        vid: vid,
        autoplay: true,
        useMiniSkin:true,
        poster:posterImg
    }); 
}