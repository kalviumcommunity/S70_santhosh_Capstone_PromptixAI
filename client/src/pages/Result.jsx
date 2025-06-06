import React from 'react'
import { assets } from '../assets/assets'
import { useState } from 'react'
import {motion} from 'framer-motion'

function Result() {
  const [image,setImage]=useState(assets.sample_img_1)
  const [isImageLoaded,setIsImageLoaded]=useState(true)
  const [isLoading,setIsLoading]=useState(false)
  const [input,setInput]=useState("")
  const onSubmitHandler=async(e)=>{

  }
  return (
    <motion.form  onSubmit={onSubmitHandler}className='flex flex-col items-center justify-center min-h-[90vh]'
    initial={{opacity:0.2,y:100}}
    whileInView={{opacity:1,y:0}}
    transition={{duration:1}}
    viewport={{once:true}}
    >
    <div>
      <div className='relative'>
        <img src={assets.sample_img_1} alt='' className='max-w-sm rounded'/>
        <span className={` absolute bottom-0 left-0 h-1 bg-blue-500 ${isLoading?' w-full transition-all duration-[10s]':" "} `} />
      </div>
      <p className={!isLoading?"hidden":" "}>Loading...</p>                                      
    </div>
    {!isImageLoaded && 
    <div className='flex w-full max-w-xl bg-neutral-500 text-white rounded-full p-0.5 text:sm mt-10'>
      <input onChange={e=>setInput(e.target.value)} value={input}
      type='text' placeholder='Enter your prompt' className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-color'/>
      <button type='submit' className='bg-zinc-900 px-10 sm:px-16 py-3 rounded-full'>Generate</button>
    </div>
}
{isImageLoaded && 
    <div className='flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full'>
      <p onClick={()=>setIsImageLoaded(false)}
      className='bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer'>Generate Another</p>
      <a href={image} download className='bg-zinc-900 px-10 py-3 rounded-full cursor-pointer'>Download</a>
    </div>
}
    </motion.form>
  )
}
                        
export default Result
