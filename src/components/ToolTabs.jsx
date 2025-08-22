import React, { useState } from 'react';

import { motion } from 'framer-motion';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import {

  Settings,

  Wand2,

  Music,

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

  Sparkles,

} from 'lucide-react';

import { effects, presets, otherTools } from '@/config/tools';


 

const ToolCard = ({ tool, index, onClick }) => (

  <motion.div

    initial={{ opacity: 0, y: 20 }}

    animate={{ opacity: 1, y: 0 }}

    transition={{ duration: 0.5, delay: index * 0.05 }}

    className="tool-card glass-effect rounded-xl p-6 cursor-pointer group"

    onClick={() => onClick(tool)}

  >

    <div className="flex items-start space-x-4">

      <div className={`p-3 rounded-lg bg-gradient-to-r ${tool.color} group-hover:scale-110 transition-transform duration-300`}>

        <tool.icon className="w-6 h-6 text-white" />

      </div>

      <div className="flex-1">

        <h3 className="font-semibold text-lg mb-2 group-hover:text-purple-300 transition-colors">

          {tool.name}

        </h3>

        <p className="text-gray-400 text-sm leading-relaxed">

          {tool.description}

        </p>

      </div>

    </div>

  </motion.div>

);


 

const PresetCard = ({ preset, index, onClick }) => (

  <motion.div

    initial={{ opacity: 0, y: 20 }}

    animate={{ opacity: 1, y: 0 }}

    transition={{ duration: 0.5, delay: index * 0.05 }}

    className="tool-card glass-effect rounded-xl p-6 cursor-pointer group"

    onClick={() => onClick(preset)}

  >

    <div className="flex items-start space-x-4">

      <div className={`p-3 rounded-lg bg-gradient-to-r ${preset.color} group-hover:scale-110 transition-transform duration-300`}>

        <Sparkles className="w-6 h-6 text-white" />

      </div>

      <div className="flex-1">

        <h3 className="font-semibold text-lg mb-2 group-hover:text-purple-300 transition-colors">

          {preset.name}

        </h3>

        <p className="text-gray-400 text-sm leading-relaxed">

          {preset.description}

        </p>

      </div>

    </div>

  </motion.div>

);


 

const ToolTabs = ({ onToolClick }) => {

  const [activeTab, setActiveTab] = useState('effects');


 

  return (

    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">

      <motion.div

        initial={{ opacity: 0, y: 20 }}

        animate={{ opacity: 1, y: 0 }}

        transition={{ duration: 0.6, delay: 0.5 }}

      >

        <TabsList className="grid w-full grid-cols-3 glass-effect rounded-xl p-2 mb-12">

          <TabsTrigger value="effects" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-lg transition-all duration-300">

            <Settings className="w-4 h-4 mr-2" />

            EFFECTS

          </TabsTrigger>

          <TabsTrigger value="presets" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-lg transition-all duration-300">

            <Wand2 className="w-4 h-4 mr-2" />

            PRESETS

          </TabsTrigger>

          <TabsTrigger value="tools" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-lg transition-all duration-300">

            <Music className="w-4 h-4 mr-2" />

            OTHER TOOLS

          </TabsTrigger>

        </TabsList>

      </motion.div>


 

      <TabsContent value="effects">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {effects.map((effect, index) => (

            <ToolCard key={effect.name} tool={effect} index={index} onClick={onToolClick} />

          ))}

        </div>

      </TabsContent>


 

      <TabsContent value="presets">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {presets.map((preset, index) => (

            <PresetCard key={preset.name} preset={preset} index={index} onClick={onToolClick} />

          ))}

        </div>

      </TabsContent>


 

      <TabsContent value="tools">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {otherTools.map((tool, index) => (

            <ToolCard key={tool.name} tool={tool} index={index} onClick={onToolClick} />

          ))}

        </div>

      </TabsContent>

    </Tabs>

  );

};


 

export default ToolTabs;
