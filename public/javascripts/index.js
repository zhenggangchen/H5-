/**
 * Created by czg on 2017/4/25.
 */

function $(s) {
    return document.querySelectorAll(s);
}
////ajax请求服务端音频资源数据
//var xhr = new XMLHttpRequest();
////web Audios API
////兼容
//var ac = new (window.AudioContext || window.webkitAudioContext)();
////添加音量控制
//var gainNode = ac[ac.createGain ? "createGain" : "createGainNode"]();// 改变音频音量的对象
//
//gainNode.connect(ac.destination); //所有音频输出聚集地
//
//var analyser = ac.createAnalyser();//音频分析对象
var size = 128;//控制疏密
//analyser.fftSize = size * 2; //设置FFT的大小(用于将一个信号变换到频域，默认是2048)
//analyser.connect(gainNode);
//
//var source = null;
//
//var count = 0;
var box = $("#box")[0];
var height, width
var canvas = document.createElement("canvas");
box.appendChild(canvas);
var ctx = canvas.getContext("2d");
var line;
var DOTS = [];

var mv = new MusicVisualizer({
    size: size,
    visualizer: draw

});


//改变li被选中时的样式
var lis = $("#list li");

for (var i = 0; i < lis.length; i++) {
    lis[i].onclick = function () {
        for (var j = 0; j < lis.length; j++) {
            lis[j].className = "";
        }
        this.className = "selected";
        //load("/media/" + this.title);
        mv.play("/media/" + this.title);
    }
}



function random(m, n) {
    return Math.round(Math.random() * (n - m) + m);
}
function getDots() {
    DOTS = [];
    for (var i = 0; i < size; i++) {
        var x = random(0, width);
        var y = random(0, height);
        var color = "rgb(" + random(0, 255) + "," + random(0, 255) + "," + random(0, 255) + ")";
        DOTS.push({
            x: x,
            y: y,
            color: color,
            cap:0
        });
    }
}

function resize() { //动态改变canva区域的宽高
    height = box.clientHeight;
    width = box.clientWidth;
    canvas.height = height;
    canvas.width = width;
    line = ctx.createLinearGradient(0, 0, 0, height);//创建线性渐变
    line.addColorStop(0, "red");
    line.addColorStop(0.5, "yellow");
    line.addColorStop(1, "green");

    getDots();
}
resize();

window.onresize = resize;


//画柱状图
function draw(arr) {
    ctx.clearRect(0, 0, width, height);// 清除上次canvas,保证流畅效果
    var w = width / size;
    var cw=w*0.6;
    var capH=cw;
    ctx.fillStyle = line;
    for (var i = 0; i < size; i++) {
        if (draw.type == "column") {
            var h = arr[i] / 256 * height;
            ctx.fillRect(w * i, height - h, w * 0.6, h); //x轴坐标,y轴坐标,宽度(0.6留为间隙),高度
            ctx.fillRect(w * i, height - h, w * 0.6, h); //x轴坐标,y轴坐标,宽度(0.6留为间隙),高度

        } else if (draw.type == "dot") {
            ctx.beginPath();
            var o = DOTS[i];
            var r = arr[i] / 256 * 50;
            ctx.arc(o.x, o.y, r, 0, Math.PI * 2, true);
            var g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, r);
            g.addColorStop(0, "#fff");
            g.addColorStop(1, o.color);
            ctx.fillStyle = g;
            ctx.fill();
            //ctx.strokeStyle = "#fff";
            //ctx.stroke();
        }
    }
}

draw.type = "column";

var types = $("#type li");
for (var i = 0; i < types.length; i++) {
    types[i].onclick = function () {
        for (var j = 0; j < types.length; j++) {
            types[j].className = "";
        }
        this.className = "selected";
        draw.type = this.getAttribute("data-type");
    }

}

/*function load(url) {
 var n = ++count;
 source && source[source.stop ? "stop" : "noteOff"]();
 xhr.abort();// 终止之前的异步请求
 xhr.open("GET", url);
 xhr.responseType = "arraybuffer";//音频数据以二进制形式返回，便于解压缩
 xhr.onload = function () { //加载完成
 if (n != count)return; //正常情况n和count是相等的,用到了闭包的知识
 ac.decodeAudioData(xhr.response, function (buffer) { // 异步解码包含在arrayBuffer中的音频数据
 if (n != count)return;
 var bufferSource = ac.createBufferSource(); // 创建AudioBufferSourceNode对象
 bufferSource.buffer = buffer; // 表示要播放的音频资源数据
 bufferSource.connect(analyser);  // 连接到分析对象上
 //bufferSource.connect(gainNode);
 //bufferSource.connect(ac.destination);
 bufferSource[bufferSource.start ? "start" : "noteOn"](0);  // 老版本是noteOn
 source = bufferSource

 }, function (err) {
 console.log(err);
 });
 };
 xhr.send();
 }

 function visualizer() {
 var arr = new Uint8Array(analyser.frequencyBinCount); //实时得到的音频频域的数据个数为前面设置的fftSize的一半

 //兼容性写法
 requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;  //动画函数
 function v() {
 analyser.getByteFrequencyData(arr); // 复制音频当前的频域数据到Unit8Array中

 draw(arr);

 requestAnimationFrame(v);
 }

 requestAnimationFrame(v);
 }

 visualizer();

 function changeVolume(percent) {  // 改变音量大小函数
 gainNode.gain.value = percent * percent;
 }*/
$("#volume")[0].onmousemove = function () {
    mv.changeVolume(this.value / this.max); //频率
}

//$("#volume")[0].onchange();   //让它默认60生效

$('#volume')[0].onmousemove();

