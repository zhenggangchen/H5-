/**
 * Created by czg on 2017/4/26.
 */
/**
 * Created by czg on 2017/4/26.
 */
function MusicVisualizer(obj) {
    this.source = null;
    this.count = 0;
    this.analyser = MusicVisualizer.ac.createAnalyser();
    this.size = obj.size;
    this.analyser.fftSize = this.size * 2;
    this.gainNode = MusicVisualizer. ac[MusicVisualizer.ac.createGain ? "createGain" : "createGainNode"]();
    this.gainNode.connect(MusicVisualizer.ac.destination);
    this.analyser.connect(this.gainNode);

    this.xhr = new XMLHttpRequest();

    this.visualizer = obj.visualizer;
    this.visualize();


}

MusicVisualizer.ac = new (window.AudioContext || window.webkitAudioContext)();

MusicVisualizer.prototype.load = function (url,fun) {
    this.xhr.abort();
    this.xhr.open("GET", url);
    this.xhr.responseType = "arraybuffer";
    var self = this;
    this.xhr.onload = function () {
        fun(self.xhr.response);
    }
    this.xhr.send();
}

MusicVisualizer.prototype.decode = function (arraybuffer, fun) {
    MusicVisualizer.ac.decodeAudioData(arraybuffer, function (buffer) {
        fun(buffer);
    }, function (err) {
        console.log(err);
    });
}

MusicVisualizer.prototype.play = function (url) {
    var n = ++this.count;
    var self = this;
    this.source && this.stop();
    this.load(url, function (arrayBuffer) {
        if (n != self.count)return;
        self.decode(arrayBuffer, function (buffer) {
            if (n != self.count)return;
            var bs = MusicVisualizer.ac.createBufferSource();
            bs.buffer = buffer;
            bs.connect(self.analyser);
            bs[bs.start ? "start" : "noteOn"](0);
            self.source = bs;
        })
    })
}

MusicVisualizer.prototype.stop = function () {
    this.source[this.source.stop ? "stop" : "noteOff"](0);
}

MusicVisualizer.prototype.changeVolume = function (precent) {
    this.gainNode.gain.value = precent * precent;
}

MusicVisualizer.prototype.visualize = function () {
    var arr = new Uint8Array(this.analyser.frequencyBinCount); //实时得到的音频频域的数据个数为前面设置的fftSize的一半

    requestAnimationFrame = window.requestAnimationFrame
        || window.webkitRequestAnimationFrame;  //动画函数
    var self = this;

    function v() {
        self.analyser.getByteFrequencyData(arr);
        self.visualizer(arr);
        requestAnimationFrame(v);
    }

    requestAnimationFrame(v);
}



