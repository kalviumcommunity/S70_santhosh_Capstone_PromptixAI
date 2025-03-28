import React from 'react'
import {assets} from '../assets/assets'
import {  useNavigate } from 'react-router-dom'
function Header() {
  const navigate=useNavigate();
  return (
    <div className='flex flex-col items-center justify-center my-20'>   
      <div className='text-stone-500 text-center inline-flex gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500'>
        <p>
            Best Text to Image Generator
        </p>
        <img src={assets.star_icon} alt=''/>
      </div>
      <div >
   
     
      <h1 className="text-4xl sm:text-7xl mx-auto mt-10 text-center max-w-[725px] leading-none">
  Turn text to <br />
  <span className="text-blue-600 -mt-3 inline-block">image</span>, in seconds.
      </h1>
      <p className='text-center max-w-xl mx-auto mt-5'>Unleash your creativity with AI.turn your imagination into visual art in seconds - just type and watch the magic happen.</p>
      <button onClick={()=>navigate('/result')} className="sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full hover:scale-105 transition-all duration-700 mx-auto">
       Generate Images
      <img className="h-6" src={assets.star_group} alt="" />
       </button>
       <div className='flex flex-wrap justify-center gap-3 mt-16'>
        {Array(6).fill().map((item,index)=>( <img className='rounded hover:scale-105 transition-all duaration-300  cursor-pointer max-sm:w-10' src={index%2==0? assets.sample_img_2:assets.sample_img_1} alt='' key={index} width={70}/>))}
       
       </div>

        <p className='mt-2 text-neutral-600 text-center'>Generated images from Promptrix</p>
      </div>
    

                                                                                                                                                                                                                  

 


    </div>
  )
}

export default Header
