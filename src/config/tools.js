 import {

  Volume2,

  Headphones,

  Mic,

  Radio,

  Sliders,

  RotateCcw,

  Scissors,

  TrendingUp,

  Activity,

  BarChart3,

  FileAudio,

  Zap,

  Music,

  Download,

} from 'lucide-react';


 

export const effects = [

  { name: '3D Audio', type: 'effect', icon: Headphones, description: 'Enhance the stereo sound by adding a 3D effect to it', color: 'from-pink-500 to-rose-500' },

  { name: 'Auto Panner', type: 'effect', icon: Radio, description: 'Make the audio alternate from left to right', color: 'from-orange-500 to-amber-500', options: [

      { id: 'speed', label: 'Panning Speed', type: 'slider', min: 0.1, max: 5, step: 0.1, defaultValue: 0.5, unit: ' Hz' }

  ]},

  { name: 'Bass Booster', type: 'effect', icon: Volume2, description: 'Boost the bass of a song making it more bass heavy', color: 'from-yellow-500 to-orange-500', options: [

      { id: 'gain', label: 'Bass Gain', type: 'slider', min: 0, max: 30, step: 1, defaultValue: 15, unit: ' dB' }

  ]},

  { name: 'Equalizer', type: 'effect', icon: Sliders, description: 'Adjust the frequencies of your audio', color: 'from-green-500 to-emerald-500', options: [

      { id: 'bands', type: 'equalizer', bands: [

          { freq: 60, label: '60 Hz (Sub Bass)' },

          { freq: 250, label: '250 Hz (Bass)' },

          { freq: 1000, label: '1 kHz (Midrange)' },

          { freq: 4000, label: '4 kHz (Upper Mids)' },

          { freq: 16000, label: '16 kHz (Treble)' },

      ], defaultValue: {} }

  ]},

  { name: 'Noise Reducer', type: 'effect', icon: Zap, description: 'Reduce background noise from recordings', color: 'from-blue-500 to-cyan-500' },

  { name: 'Pitch Shifter', type: 'effect', icon: Music, description: 'Change the pitch of your audio', color: 'from-indigo-500 to-purple-500', options: [

      { id: 'pitch', label: 'Pitch Shift', type: 'slider', min: 0.5, max: 2, step: 0.05, defaultValue: 1.2, unit: 'x' }

  ]},

  { name: 'Reverse Audio', type: 'effect', icon: RotateCcw, description: 'Reverse an audio file and make it play backwards', color: 'from-purple-500 to-pink-500' },

  { name: 'Stereo Panner', type: 'effect', icon: Headphones, description: 'Pan the audio to left or right', color: 'from-pink-500 to-purple-500', options: [

      { id: 'pan', label: 'Pan (Left <-> Right)', type: 'slider', min: -1, max: 1, step: 0.1, defaultValue: 0.5, unit: '' }

  ]},

  { name: 'Tempo Changer', type: 'effect', icon: TrendingUp, description: 'Make an audio file play faster or slower', color: 'from-red-500 to-pink-500', options: [

      { id: 'tempo', label: 'Tempo', type: 'slider', min: 0.5, max: 2, step: 0.05, defaultValue: 1.5, unit: 'x' }

  ]},

  { name: 'Trimmer / Cutter', type: 'effect', icon: Scissors, description: 'Cut out a part of your audio file', color: 'from-orange-500 to-red-500', options: [

      { id: 'trim', label: 'Trim Range (seconds)', type: 'range', defaultValue: [0, 10] }

  ]},

  { name: 'Vocal Remover', type: 'effect', icon: Mic, description: 'Remove the vocals from a song leaving only the instrumental', color: 'from-yellow-500 to-orange-500' },

  { name: 'Volume Changer', type: 'effect', icon: Volume2, description: 'Make your audio louder or quieter', color: 'from-green-500 to-teal-500', options: [

      { id: 'volume', label: 'Volume', type: 'slider', min: 0, max: 2, step: 0.1, defaultValue: 1.5, unit: 'x' }

  ]},

];


 

export const otherTools = [

  { name: 'Converter', type: 'tool', icon: FileAudio, description: 'Convert any audio file to another file format', color: 'from-blue-500 to-indigo-500', options: [

      { id: 'format', label: 'Output Format', type: 'select', defaultValue: 'mp3', placeholder: 'Select format', items: [

          { value: 'mp3', label: 'MP3' },

          { value: 'wav', label: 'WAV' },

      ]}

  ]},

  { name: 'Downmixer', type: 'tool', icon: Download, description: 'Reduce the amount of audio channels to mono', color: 'from-cyan-500 to-blue-500' },

  { name: 'BPM Detector', type: 'tool', icon: Activity, description: 'Detect the tempo in beats per minute of any song', color: 'from-teal-500 to-cyan-500' },

  { name: 'Spectrogram Image', type: 'tool', icon: BarChart3, description: 'Create a spectrogram image from an audio file', color: 'from-purple-500 to-indigo-500' },

  { name: 'Waveform Image', type: 'tool', icon: Activity, description: 'Create a waveform image from an audio file', color: 'from-pink-500 to-red-500' }

];


 

export const presets = [

  { name: '8D Audio', type: 'preset', description: '"8D Audio" is an effect that you can apply to your songs to make it sound like the audio is moving around your head in circles', color: 'from-purple-500 to-pink-500' },

  { name: 'Slowed and Reverb', type: 'preset', description: 'Add a slowed and reverb effect to a song', color: 'from-blue-500 to-purple-500' },

  { name: '440 Hz to 432 Hz Converter', type: 'preset', description: 'Convert a track from 440 Hz to 432 Hz. 432 Hz is an alternative pitch that some people believe sounds more harmonious', color: 'from-green-500 to-blue-500' },

  { name: 'Very Light Bass Boost', type: 'preset', description: 'Bass booster preset with very light intensity', color: 'from-yellow-500 to-green-500' },

  { name: 'Light Bass Boost', type: 'preset', description: 'Bass booster preset with light intensity', color: 'from-orange-500 to-yellow-500' },

  { name: 'Moderate Bass Boost', type: 'preset', description: 'Bass booster preset with moderate intensity', color: 'from-red-500 to-orange-500' },

  { name: 'Heavy Bass Boost', type: 'preset', description: 'Bass booster preset with heavy intensity', color: 'from-pink-500 to-red-500' },

  { name: 'Extreme Bass Boost', type: 'preset', description: 'Bass booster preset with extreme intensity', color: 'from-purple-500 to-pink-500' },

  { name: 'Vocal Reverb', type: 'preset', description: 'Reverb preset for vocal tracks', color: 'from-indigo-500 to-purple-500' },

  { name: 'Bathroom Reverb', type: 'preset', description: 'Reverb preset to replicate audio being played in a bathroom', color: 'from-blue-500 to-indigo-500' },

  { name: 'Small Room Reverb', type: 'preset', description: 'Reverb preset to replicate audio being played in a small room', color: 'from-cyan-500 to-blue-500' },

  { name: 'Medium Room Reverb', type: 'preset', description: 'Reverb preset to replicate audio being played in a medium sized room', color: 'from-teal-500 to-cyan-500' },

  { name: 'Large Room Reverb', type: 'preset', description: 'Reverb preset to replicate audio being played in a large room', color: 'from-green-500 to-teal-500' },

  { name: 'Church Hall Reverb', type: 'preset', description: 'Reverb preset to replicate audio being played in a church hall', color: 'from-emerald-500 to-green-500' },

  { name: 'Cathedral Reverb', type: 'preset', description: 'Reverb preset to replicate audio being played in a cathedral', color: 'from-lime-500 to-emerald-500' }

]; 
 