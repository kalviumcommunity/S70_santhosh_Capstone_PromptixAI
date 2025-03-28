import React from 'react'
import { assets } from '../assets/assets'

function Description() {
    return (
      <div className="flex flex-col items-center justify-center text-center md:text-left my-24 p-6 md:px-28">
        
        {/* Centered Title & Subtitle */}
        <div className="w-full md:w-3/4 text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-semibold">Create AI Images</h1>
          <p className="text-gray-500">Turn your imagination into visuals</p>
        </div>
  
        {/* Image & Text Container */}
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 w-full">
          
          {/* Left Side - Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img src={assets.sample_img_1} className="w-80 xl:w-96 rounded-lg shadow-lg" alt="AI-generated sample" />
          </div>
  
          {/* Right Side - Text */}
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-semibold mb-4">Introducing AI-powered Text-to-Image Generator</h2>
            <p className="text-gray-600 leading-relaxed">
              Easily bring your ideas to life with our free AI image generator. Whether you need stunning visuals or unique imagery, our tool transforms your text into eye-catching images with just a few clicks. Imagine it, describe it, and watch it come to life instantly.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              Simply type in a text prompt, and our cutting-edge AI will generate high-quality images in seconds. From product visuals to character designs and portraits, even concepts that don't yet exist can be visualized effortlessly. Powered by advanced AI technology, the creative possibilities are limitless!
            </p>
          </div>
  
        </div>
      </div>
    );
  }
  

export default Description
