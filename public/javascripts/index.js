/**
 * Created by czg on 2017/4/25.
 */
//�ı�li��ѡ���ǵ���ʽ
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


//ajax����������Ƶ��Դ����
var xhr = new XMLHttpRequest();
//web Audios API
//����
var ac = new (window.AudioContext || window.webkitAudioContext)();
//�����������
var gainNode = ac[ac.createGain ? "createGain" : "createGainNode"]();

gainNode.connect(ac.destination); //������Ƶ����ۼ���

var analyser = ac.createAnalyser();

var size = 128;//��������
analyser.fftSize = size * 2; //����FFT�Ĵ�С(���ڽ�һ���źű任��Ƶ��Ĭ����2048)
analyser.connect(gainNode);

var source = null;

var count = 0;

var box = $("#box")[0];
var height, width;
var canvas = document.createElement("canvas");
box.appendChild(canvas);
var ctx = canvas.getContext("2d");

var DOTS = [];
function random(m, n) {
    return Math.round(Math.random() * (n - m) + m);
}
function getDots() {
    DOTS = [];
    for (var i = 0; i < size; i++) {
        var x = random(0, width);
        var y = random(0, height);
        var color = "rgb(" + random(0, 255) + "," + random(0, 255) +"," + random(0, 255) + ")";
        DOTS.push({
            x: x,
            y: y,
            color: color
        });
    }
}
var line;
function resize() { //��̬�ı�canva����Ŀ��
    height = box.clientHeight;
    width = box.clientWidth;
    canvas.height = height;
    canvas.width = width;
    line = ctx.createLinearGradient(0, 0, 0, height);
    line.addColorStop(0, "red");
    line.addColorStop(0.5, "yellow");
    line.addColorStop(1, "green");

    getDots();
}
resize();

window.onresize = resize;


//����״ͼ
function draw(arr) {
    ctx.clearRect(0, 0, width, height);
    var w = width / size;
    ctx.fillStyle = line;
    for (var i = 0; i < size; i++) {
        if (draw.type == "column") {
            var h = arr[i] / 256 * height;
            ctx.fillRect(w * i, height - h, w * 0.6, h); //x������,y������,���(0.4��Ϊ��϶),�߶�
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

    //������д��
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




