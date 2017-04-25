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


















