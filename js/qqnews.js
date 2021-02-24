 var configs={
            iosScheme:"qqnews://article_9527?nm=DSG2020070900846800"
        };

    var UA = function() {
        var a = navigator.userAgent.toLowerCase();
        return {
            ipad: /ipad/.test(a),
            iphone: /iphone/.test(a),
            android: /android/.test(a),
            qqnews: /qqnews/.test(a),
            weixin: /micromessenger/.test(a),
            qqnews_version: a.match(/qqnews/i) == "qqnews" ? a.split('qqnews/')[1] : '',
            isQQApp:a.match(/QQ/i) == "qq"
        }
    };

    var qqnewsDown = {
        iosScheme:configs.iosScheme,
        androidPackageName: "com.tencent.news",
        downloadUrl: "http://view.inews.qq.com/newsDownLoad?refer=biznew&src=10905zhiboceshi&by=dict",
        init: function() {
            var _this=this;
            if (UA().weixin) {
                function getInstallState() {
                    WeixinJSBridge.invoke("getInstallState", {
                        "packageUrl": _this.iosScheme,
                        "packageName": _this.androidPackageName
                    }, function(res) {
                        if (res && res.err_msg && res.err_msg.indexOf("get_install_state:yes") >= 0) {
                            _this.installed()
                        } else {
                            _this.uninstalled()
                        }
                    })
                }
                if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
                    getInstallState()
                } else {
                    if (document.addEventListener) {
                        document.addEventListener("WeixinJSBridgeReady", getInstallState, false)
                    } else if (document.attachEvent) {
                        document.attachEvent("WeixinJSBridgeReady", getInstallState);
                        document.attachEvent("onWeixinJSBridgeReady", getInstallState)
                    }
                }
            }else if(UA().isQQApp){
                var _this = this;
                if(UA().android){
                    $.get('https://open.mobile.qq.com/sdk/qqapi.js?_bid=152',function(){
                        var value = _this.androidPackageName;
                        mqq.app.isAppInstalled(value, function(result){
                            if(result){
                                _this.tryCallApp(_this.iosScheme)
                            }else{
                                _this.uninstalled();
                            }
                        });
                    });
                }else{
                    this.checkOpen(function(isSuccess) {
                        if (!isSuccess) {
                            _this.tryCallApp(_this.iosScheme)
                            _this.uninstalled();
                        }
                    });
                }
            } else {
                _this.otherInit();
            }
        },
        installed: function() {
            var _this = this;
            var param = {
                schemeUrl : this.iosScheme
            };
            var ss = navigator.userAgent.toLowerCase().match(/micromessenger\/(\d+)\.(\d+)\.(\d+)/),
                n = 0;
            ss && ss.length>=4 && (n = 100 * parseInt(ss[1]) + parseInt(ss[2]) + parseInt(ss[3]) / 1000);

            if( n>605.006 ){
                // 版本大于6.5.6时
                WeixinJSBridge.invoke("launchApplication",param,function(res){
                    console.log('打开成功...');
                });
            }else{
                location.href = param.schemeUrl;
            }
        },
        checkOpen:function(cb) {
            var inter = null;
            var statue = false;
            var count = 0;
            inter = window.setInterval(function() {
                count++;
                statue = document.hidden || document.webkitHidden;
                if (statue || count > 30) {
                    cb(statue);
                    clearInterval(inter);
                }
            }, 50);
        },
        tryCallApp:function(scheme) {
            var aLink = document.createElement('a'),body = document.body;
            aLink.href = scheme;
            body.appendChild(aLink);
            aLink.click();
        },
        uninstalled: function() {
            var _this = this;
            window.location.href = _this.downloadUrl
        },
        otherInit: function() {
            var _this = this;
            window.location.href = _this.downloadUrl;
        }
    };


$(".btn_yuyue,.slogan_live").on('touchstart',function(){
    //点击执行
    qqnewsDown.init();
})