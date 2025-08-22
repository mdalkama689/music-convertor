import { effects, presets } from '@/config/tools';


 

const createReverbImpulseResponse = (audioContext, duration, decay, reverse = false) => {

    const sampleRate = audioContext.sampleRate;

    const length = sampleRate * duration;

    const impulse = audioContext.createBuffer(2, length, sampleRate);

    const impulseL = impulse.getChannelData(0);

    const impulseR = impulse.getChannelData(1);


 

    for (let i = 0; i < length; i++) {

        const n = reverse ? length - i : i;

        impulseL[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);

        impulseR[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, decay);

    }

    return impulse;

};


 

const processWithContext = (audioBuffer, tool, options, onProgress) => {

    const { name } = tool;

    let sourceChannels = audioBuffer.numberOfChannels;

    let duration = audioBuffer.duration;

    const sampleRate = audioBuffer.sampleRate;

    

    let startOffset = 0;

    let endOffset = duration;


 

    if (name === 'Trimmer / Cutter' && options?.trim) {

        startOffset = Math.max(0, options.trim[0]);

        endOffset = Math.min(duration, options.trim[1]);

        duration = endOffset - startOffset;

        if(duration <= 0) {

            throw new Error("Invalid trim range. End time must be after start time.");

        }

    }

    

    if(name === 'Downmixer') {

        sourceChannels = 1;

    }


 

    const offlineCtx = new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(

        sourceChannels,

        sampleRate * duration,

        sampleRate

    );


 

    const source = offlineCtx.createBufferSource();

    source.buffer = audioBuffer;

    let lastNode = source;


 

    const connect = (node) => {

        lastNode.connect(node);

        lastNode = node;

    };

    

    if (name === 'Equalizer' && options?.bands) {

        const bands = Object.keys(options.bands).map(freq => {

            const filter = offlineCtx.createBiquadFilter();

            filter.type = 'peaking';

            filter.frequency.value = Number(freq);

            filter.Q.value = 1;

            filter.gain.value = options.bands[freq];

            return filter;

        });


 

        bands.forEach(band => connect(band));

    }



 

    if (name.includes('Bass Boost') || name === 'Bass Booster') {

        const gainValue = options?.gain ?? ({

            'Very Light Bass Boost': 3, 'Light Bass Boost': 6, 'Moderate Bass Boost': 9,

            'Heavy Bass Boost': 12, 'Extreme Bass Boost': 15, 'Bass Booster': 10,

        }[name] || 10);

        const bassEQ = offlineCtx.createBiquadFilter();

        bassEQ.type = 'lowshelf';

        bassEQ.frequency.value = 250;

        bassEQ.gain.value = gainValue;

        connect(bassEQ);

    }


 

    if (name.includes('Reverb')) {

        const reverbParams = {

            'Vocal Reverb': { duration: 1.5, decay: 2.0 }, 'Bathroom Reverb': { duration: 0.7, decay: 1.5 },

            'Small Room Reverb': { duration: 1, decay: 2 }, 'Medium Room Reverb': { duration: 2, decay: 2.2 },

            'Large Room Reverb': { duration: 3, decay: 2.5 }, 'Church Hall Reverb': { duration: 4, decay: 3 },

            'Cathedral Reverb': { duration: 6, decay: 3.5 }, 'Slowed and Reverb': { duration: 3, decay: 2.5 },

        }[name] || { duration: 2, decay: 2 };

        

        const convolver = offlineCtx.createConvolver();

        convolver.buffer = createReverbImpulseResponse(offlineCtx, reverbParams.duration, reverbParams.decay);

        const wetGain = offlineCtx.createGain();

        wetGain.gain.value = 0.4;

        source.connect(convolver);

        convolver.connect(wetGain);

        wetGain.connect(offlineCtx.destination);

    }

    

    if (name === 'Slowed and Reverb') source.playbackRate.value = 0.85;

    if (name === '440 Hz to 432 Hz Converter') source.playbackRate.value = 432 / 440;


 

    if (name === 'Vocal Remover' && sourceChannels > 1) {

        const splitter = offlineCtx.createChannelSplitter(2);

        const merger = offlineCtx.createChannelMerger(1);

        const gain = offlineCtx.createGain();

        gain.gain.value = -1;

        source.connect(splitter);

        splitter.connect(gain, 0);

        splitter.connect(merger, 0, 0);

        gain.connect(merger, 0, 0);

        lastNode = merger;

    }


 

    if (name === 'Reverse Audio') {

        Array.from({ length: audioBuffer.numberOfChannels }).forEach((_, i) => {

            const channelData = audioBuffer.getChannelData(i);

            const segment = channelData.slice(startOffset * sampleRate, endOffset * sampleRate);

            segment.reverse();

            channelData.set(segment, startOffset * sampleRate);

        });

        source.buffer = audioBuffer;

    }

    

    if (name === '3D Audio' || name === '8D Audio') {

        const panner = offlineCtx.createPanner();

        panner.panningModel = 'HRTF';

        const lfo = offlineCtx.createOscillator();

        lfo.frequency.value = name === '8D Audio' ? 0.5 : 0.2;

        const lfoGain = offlineCtx.createGain();

        lfoGain.gain.value = 10;

        lfo.connect(lfoGain);

        lfoGain.connect(panner.positionX);

        lfo.start();

        connect(panner);

    }


 

    if (name === 'Auto Panner') {

        const panner = offlineCtx.createStereoPanner();

        const lfo = offlineCtx.createOscillator();

        lfo.type = 'sine';

        lfo.frequency.value = options?.speed ?? 0.5;

        lfo.connect(panner.pan);

        lfo.start();

        connect(panner);

    }


 

    if (name === 'Stereo Panner') {

        const panner = offlineCtx.createStereoPanner();

        panner.pan.value = options?.pan ?? 0.5;

        connect(panner);

    }


 

    if (name === 'Pitch Shifter') source.playbackRate.value = options?.pitch ?? 1.2;

    if (name === 'Tempo Changer') source.playbackRate.value = options?.tempo ?? 1.5;


 

    if (name === 'Volume Changer') {

        const gainNode = offlineCtx.createGain();

        gainNode.gain.value = options?.volume ?? 1.5;

        connect(gainNode);

    }


 

    if (name === 'Noise Reducer') {

        const compressor = offlineCtx.createDynamicsCompressor();

        compressor.threshold.value = -50;

        compressor.knee.value = 40;

        compressor.ratio.value = 12;

        compressor.attack.value = 0;

        compressor.release.value = 0.25;

        connect(compressor);

    }


 

    lastNode.connect(offlineCtx.destination);

    source.start(0, startOffset, duration);


 

    return new Promise((resolve, reject) => {

        offlineCtx.startRendering().then(resolve).catch(reject);

        

        let progressInterval = setInterval(() => {

            const progress = (offlineCtx.currentTime / duration);

            if (onProgress) onProgress(progress);

            if (offlineCtx.currentTime >= duration) clearInterval(progressInterval);

        }, 200);

    });

};


 

const drawWaveform = (buffer) => {

    const canvas = document.createElement('canvas');

    const width = 1200, height = 200;

    canvas.width = width;

    canvas.height = height;

    const ctx = canvas.getContext('2d');

    const data = buffer.getChannelData(0);

    const step = Math.ceil(data.length / width);

    const amp = height / 2;


 

    ctx.fillStyle = '#0f0f23';

    ctx.fillRect(0, 0, width, height);

    ctx.lineWidth = 2;

    ctx.strokeStyle = '#8b5cf6';


 

    ctx.beginPath();

    for (let i = 0; i < width; i++) {

        let min = 1.0, max = -1.0;

        for (let j = 0; j < step; j++) {

            const datum = data[i * step + j];

            if (datum < min) min = datum;

            if (datum > max) max = datum;

        }

        ctx.moveTo(i, (1 + min) * amp);

        ctx.lineTo(i, (1 + max) * amp);

    }

    ctx.stroke();

    return canvas.toDataURL('image/png');

}


 

const drawSpectrogram = (buffer) => {

    const canvas = document.createElement('canvas');

    const width = 1200, height = 512;

    canvas.width = width;

    canvas.height = height;

    const ctx = canvas.getContext('2d');

    const channelData = buffer.getChannelData(0);

    const sampleRate = buffer.sampleRate;

    

    const tempAudioCtx = new (window.AudioContext || window.webkitAudioContext)({sampleRate});

    const analyser = tempAudioCtx.createAnalyser();

    analyser.fftSize = 2048;

    const tempSource = tempAudioCtx.createBufferSource();

    tempSource.buffer = buffer;


 

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const bufferLength = analyser.frequencyBinCount;

    

    ctx.fillStyle = '#0f0f23';

    ctx.fillRect(0, 0, width, height);


 

    const timeStep = buffer.duration / width;

    for(let i = 0; i < width; i++){

        const sliceBuffer = tempAudioCtx.createBuffer(1, analyser.fftSize, sampleRate);

        const sliceData = sliceBuffer.getChannelData(0);

        const startIdx = Math.floor(i * timeStep * sampleRate);

        const endIdx = startIdx + analyser.fftSize;

        if(endIdx < channelData.length){

            sliceData.set(channelData.subarray(startIdx, endIdx));

            analyser.getByteFrequencyData(dataArray);

            

            for(let j = 0; j < bufferLength; j++){

                const value = dataArray[j];

                const percent = value / 255;

                const hue = 262 - (percent * 100);

                const sat = '83%';

                const light = percent * 50 + 10;

                ctx.fillStyle = `hsl(${hue}, ${sat}, ${light}%)`;

                ctx.fillRect(i, height - (j * height / bufferLength), 1, height/bufferLength);

            }

        }

    }

    tempAudioCtx.close();

    return canvas.toDataURL('image/png');

}


 

const detectBPM = (buffer) => {

    const channelData = buffer.getChannelData(0);

    const sampleRate = buffer.sampleRate;

    const threshold = 0.9;

    let peaks = [];

    for (let i = 0; i < channelData.length; i++) {

        if (Math.abs(channelData[i]) > threshold) {

            peaks.push(i);

            i += sampleRate / 4; 

        }

    }

    if(peaks.length < 2) return "Could not detect BPM.";

    

    const intervals = [];

    for (let i = 1; i < peaks.length; i++) {

        intervals.push(peaks[i] - peaks[i - 1]);

    }


 

    const avgInterval = intervals.reduce((a, b) => a + b) / intervals.length;

    const bpm = (60 * sampleRate) / avgInterval;

    return `Estimated BPM: ${bpm.toFixed(2)}`;

}



 

export const applyEffect = async (audioBuffer, tool, options, onProgress) => {

    const buffer = await processWithContext(audioBuffer, tool, options, onProgress);

    return { type: 'audio', buffer };

}


 

export const applyTool = async (audioBuffer, tool, options, onProgress) => {

    switch (tool.name) {

        case 'Converter':

        case 'Downmixer': {

            const buffer = await processWithContext(audioBuffer, tool, options, onProgress);

            return { type: 'audio', buffer };

        }

        case 'Waveform Image':

            onProgress(0.5);

            const waveformUrl = drawWaveform(audioBuffer);

            onProgress(1);

            return { type: 'image', url: waveformUrl };

        case 'Spectrogram Image':

             onProgress(0.1);

             const spectrogramUrl = drawSpectrogram(audioBuffer);

             onProgress(1);

             return {type: 'image', url: spectrogramUrl };

        case 'BPM Detector':

            onProgress(0.5);

            const bpmMessage = detectBPM(audioBuffer);

            onProgress(1);

            return { type: 'info', message: bpmMessage };

        default:

            throw new Error('Unknown tool');

    }

} 