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


















