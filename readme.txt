npm i -g express-generator
express -e music
npm i -g supervisor
supervisor bin/www   �Զ������ļ��Ƿ�仯


AudioContext
��������AudioNode�����Լ����ǵ���ϵ�Ķ��󣬿������Ϊaudio�����Ķ��󡣾����������£�һ��document��ֻ��һ��AudioContext��
������var ac =new window.AudioContext();
���ԣ�

destination��AudioDestinationNode�������е���Ƶ����ۼ��أ��൱����Ƶ��Ӳ�������е�AudioNode��ֱ�ӻ������ӵ�����

currentTime��AudioContext�Ӵ�����ʼ����ǰ��ʱ�䣨�룩

������
decodeAudioData(arrayBuffer,succ(buffer),err),�첽���������arrayBuffer�е���Ƶ����

createBufferSource(),����BufferSourceNode����
createAnalyser(),����AnalyserNode����
createGain()/createGainNode(),����GainNode����

AudioBufferSourceNode
��ʾ�ڴ��е�һ����Ƶ��Դ������Ƶ���ݴ�����AudioBuffer��(��buffer����)
������var buffersource=ac.createBufferSource();
���ԣ�buffer,AudioBuffer���󣬱�ʾҪ���ŵ���Ƶ��Դ���ݡ�--�����ԣ�duration������Ƶ��Դ��ʱ�����룩
loop���Ƿ�ѭ�����ţ�Ĭ��false
onended���ɰ���Ƶ�������ʱ���õ��¼��������

����;
start/noteOn(when=ac.aurrentTime,offset=0,duration=buffer.duration-offset),��ʼ������Ƶ��when:��ʱ��ʼ����;offset:����Ƶ�ĵڼ��뿪ʼ����;duration:���ż���;

atop/noteOff(when=ac.currentTime),����������Ƶ

GainNode
�ı���Ƶ�����Ķ��󣬻�ı�ͨ��������Ƶ�������е�sample frame���ź�ǿ��
������var gainNode=ac.createGain()/ac.createGainNode();��һ��Ϊ���ϵķ���
gain,AudioParam����ͨ���ı���valueֵ���Ըı���Ƶ�źŵ�ǿ����Ĭ�ϵ�value����ֵΪ1��ͨ����СֵΪ0�����ֵΪ1����valueֵҲ�ɴ���1��С��0��















