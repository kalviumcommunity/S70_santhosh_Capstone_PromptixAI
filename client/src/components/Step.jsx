import React from 'react'
import { stepsData } from '../assets/assets'
import{motion} from 'framer-motion'

function Step() {
    return (
      <motion.div className="flex flex-col items-center justify-center my-32"
      initial={{opacity:0.2,y:100}}
      whileInView={{opacity:1,y:0}}
      transition={{duration:1}}
      viewport={{once:true}}>
        <h1 className="text-3xl sm:text-4xl font-semibold mb-2">How it works?</h1>
        <p className="text-lg text-gray-600 mb-8">Transform words into Stunning Images</p>
  
        <div className="space-y-6 w-full max-w-3xl text-sm">
          {stepsData.map((item, index) => (
            <div 
              key={index} 
              className="flex items-center gap-4 p-6 bg-orange-50 shadow-md border border-gray-300 rounded-lg cursor-pointer 
              hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              <img width={40} src={item.icon} alt="" />
              <div>
                <h2 className="text-xl font-medium">{item.title}</h2>
                <p className="text-gray-500">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }
  
  export default Step;
  


