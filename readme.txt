npm i -g express-generator
express -e music
npm i -g supervisor
supervisor bin/www   自动监视文件是否变化


AudioContext
包含各个AudioNode对象以及它们的联系的对象，可以理解为audio上下文对象。绝大多数情况下，一个document中只有一个AudioContext。
创建：var ac =new window.AudioContext();
属性：

destination，AudioDestinationNode对象，所有的音频输出聚集地，相当于音频的硬件，所有的AudioNode都直接或间接链接到这里

currentTime，AudioContext从创建开始到当前的时间（秒）

方法：
decodeAudioData(arrayBuffer,succ(buffer),err),异步解码包含在arrayBuffer中的音频数据

createBufferSource(),创建BufferSourceNode对象
createAnalyser(),创建AnalyserNode对象
createGain()/createGainNode(),创建GainNode对象

AudioBufferSourceNode
表示内存中的一段音频资源，其音频数据存在于AudioBuffer中(其buffer属性)
创建：var buffersource=ac.createBufferSource();
属性：buffer,AudioBuffer对象，表示要播放的音频资源数据。--子属性：duration，该音频资源的时长（秒）
loop，是否循环播放，默认false
onended，可绑定音频播放完毕时调用的事件处理程序

方法;
start/noteOn(when=ac.aurrentTime,offset=0,duration=buffer.duration-offset),开始播放音频。when:何时开始播放;offset:从音频的第几秒开始播放;duration:播放几秒;

atop/noteOff(when=ac.currentTime),结束播放音频

GainNode
改变音频音量的对象，会改变通过它的音频数据所有的sample frame的信号强度
创建：var gainNode=ac.createGain()/ac.createGainNode();后一个为较老的方法
gain,AudioParam对象，通过改变其value值可以改变音频信号的强弱，默认的value属性值为1，通常最小值为0，最大值为1，其value值也可大于1，小于0。


https://github.com/zhenggangchen/H5-/blob/master/public/images/API%E5%85%B3%E7%B3%BB%E5%9B%BE.png?raw=true












