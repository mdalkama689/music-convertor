import React from 'react';

import { motion } from 'framer-motion';


 

const Header = () => (

  <motion.header

    initial={{ opacity: 0, y: -50 }}

    animate={{ opacity: 1, y: 0 }}

    transition={{ duration: 0.8 }}

    className="text-center py-16 px-4"

  >

    <h1 className="text-5xl md:text-7xl font-bold mb-6 section-header">

      Your online audio toolkit

    </h1>

    <p className="text-xl text-gray-300 max-w-2xl mx-auto">

      A collection of easy-to-use web tools for all your audio files

    </p>

  </motion.header>

);


 

export default Header;
 