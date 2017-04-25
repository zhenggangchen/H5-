/**
 * Created by czg on 2017/4/25.
 */
//改变li被选中是的样式
function $(s) {
    return document.querySelectorAll(s);
}
var lis = $("#list li");
for (var i = 0; i < lis.length; i++) {
    lis[i].onclick = function () {
        for (var j = 0; j < lis.length; j++) {
            lis[j].className = "";
        }
        this.className = "selected";
        load("/media/" + this.title);
    }
}


//ajax请求服务端音频资源数据
var xhr = new XMLHttpRequest();
//web Audios API
//兼容
var ac = new (window.AudioContext || window.webkitAudioContext)();
//添加音量控制
var gainNode = ac[ac.createGain ? "createGain" : "createGainNode"]();

gainNode.connect(ac.destination); //所有音频输出聚集地

var analyser = ac.createAnalyser();

var size = 64;
analyser.fftSize = size * 2; //设置FFT的大小(用于将一个信号变换到频域，默认是2048)
analyser.connect(gainNode);

var source = null;

var count = 0;

var box = $("#box")[0];
var height, width;
var canvas = document.createElement("canvas");
box.appendChild(canvas);
var ctx = canvas.getContext("2d");

function resize() { //动态改变canva区域的宽高
    height = box.clientHeight;
    width = box.clientWidth;
    canvas.height = height;
    canvas.width = width;
    var line = ctx.createLinearGradient(0, 0, 0, height);
    line.addColorStop(0, "red");
    line.addColorStop(0.5, "yellow");
    line.addColorStop(1, "green");
    ctx.fillStyle=line;
}
resize();

window.onresize = resize;

function draw(arr) {
    ctx.clearRect(0,0,width,height);
    var w = width / size;
    for (var i = 0; i < size; i++) {
        var h = arr[i] / 256 * height;
        ctx.fillRect(w * i, height - h, w * 0.6, h);
    }
}


function load(url) {
    var n = ++count;
    source && source[source.stop ? "stop" : "noteOff"]();
    xhr.abort();
    xhr.open("GET", url);
    xhr.responseType = "arraybuffer";
    xhr.onload = function () {
        if (n != count)return;
        ac.decodeAudioData(xhr.response, function (buffer) {
            if (n != count)return;
            var bufferSource = ac.createBufferSource();
            bufferSource.buffer = buffer;
            bufferSource.connect(analyser);
            //bufferSource.connect(gainNode);
            //bufferSource.connect(ac.destination);
            bufferSource[bufferSource.start ? "start" : "noteOn"](0);
            source = bufferSource

        }, function (err) {
            console.log(err);
        });
    };
    xhr.send();
}

function visualizer() {
    var arr = new Uint8Array(analyser.frequencyBinCount);

    //兼容性写法
    requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
    function v() {
        analyser.getByteFrequencyData(arr);

        draw(arr);

        requestAnimationFrame(v);
    }

    requestAnimationFrame(v);
}

visualizer();

function changeVolume(percent) {
    gainNode.gain.value = percent * percent;
}
$("#volume")[0].onchange = function () {
    changeVolume(this.value / this.max);
}

$("#volume")[0].onchange();




