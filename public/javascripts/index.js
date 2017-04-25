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

function load(url) {
    xhr.open("GET", url);
    xhr.responseType = "arraybuffer";
    xhr.onload = function () {
        ac.decodeAudioData(xhr.response, function (buffer) {
            var bufferSource = ac.createBufferSource();
            bufferSource.buffer = buffer;
            bufferSource.connect(ac.destination);
            bufferSource[bufferSource.start ? "start" : "noteOn"](0);
        }, function (err) {
            console.log(err);
        });
    };
    xhr.send();
}









