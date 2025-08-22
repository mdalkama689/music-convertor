import lamejs from 'lamejs';


 

export function bufferToWave(abuffer, len) {

  var numOfChan = abuffer.numberOfChannels,

      length = len * numOfChan * 2 + 44,

      buffer = new ArrayBuffer(length),

      view = new DataView(buffer),

      channels = [], i, sample,

      offset = 0,

      pos = 0;


 

  setUint32(0x46464952);                         // "RIFF"

  setUint32(length - 8);                         // file length - 8

  setUint32(0x45564157);                         // "WAVE"


 

  setUint32(0x20746d66);                         // "fmt " chunk

  setUint32(16);                                 // length = 16

  setUint16(1);                                  // PCM (uncompressed)

  setUint16(numOfChan);

  setUint32(abuffer.sampleRate);

  setUint32(abuffer.sampleRate * 2 * numOfChan); // avg. bytes/sec

  setUint16(numOfChan * 2);                      // block-align

  setUint16(16);                                 // 16-bit


 

  setUint32(0x61746164);                         // "data" - chunk

  setUint32(length - pos - 4);                   // chunk length


 

  for (i = 0; i < abuffer.numberOfChannels; i++)

    channels.push(abuffer.getChannelData(i));


 

  while (pos < length) {

    for (i = 0; i < numOfChan; i++) {             // interleave channels

      sample = Math.max(-1, Math.min(1, channels[i][offset])); // clamp

      sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0; // scale to 16-bit signed int

      view.setInt16(pos, sample, true);          // write 16-bit sample

      pos += 2;

    }

    offset++                                     // next source sample

  }


 

  function setUint16(data) {

    view.setUint16(pos, data, true);

    pos += 2;

  }


 

  function setUint32(data) {

    view.setUint32(pos, data, true);

    pos += 4;

  }


 

  return new Blob([view], { type: 'audio/wav' });

}


 

export async function bufferToMp3(audioBuffer) {

  const mp3encoder = new lamejs.Mp3Encoder(audioBuffer.numberOfChannels, audioBuffer.sampleRate, 128);

  const mp3Data = [];


 

  const samples = new Int16Array(4096);

  let remaining = audioBuffer.length;

  let offset = 0;


 

  for (let i = 0; i < audioBuffer.numberOfChannels; i++) {

      const channelData = audioBuffer.getChannelData(i);

      let sampleIndex = 0;

      while(remaining > 0) {

          const bufferSize = Math.min(remaining, samples.length);

          for(let j=0; j < bufferSize; j++) {

              let sample = channelData[offset + j];

              sample = sample < 0 ? sample * 32768 : sample * 32767;

              samples[j] = sample;

          }


 

          const mp3buf = mp3encoder.encodeBuffer(samples.subarray(0, bufferSize));

          if (mp3buf.length > 0) {

              mp3Data.push(mp3buf);

          }

          remaining -= bufferSize;

          offset += bufferSize;

      }

  }


 

  const mp3buf = mp3encoder.flush();

  if (mp3buf.length > 0) {

      mp3Data.push(mp3buf);

  }


 

  return new Blob(mp3Data, { type: 'audio/mp3' });

 } 