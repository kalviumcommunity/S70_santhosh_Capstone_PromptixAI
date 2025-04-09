import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useState ,useEffect} from 'react'
import { AppContext } from '../contexts/AppContext'
import {motion} from 'framer-motion'

const  Login=()=>{
  const [state,setState]=useState('Login')
  const {setShowLogin}=useContext(AppContext)
  useEffect(()=>{
    document.body.style.overflow='hidden'
    return () => {  
      document.body.style.overflow='unset'
    }
  },[])         
  return (
    <div className='absolute fixed top-0 left-0 right-0  bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
      <motion.form className='relative bg-white p-10 rounded-xl text-slate-500 shadow-lg flex flex-col gap-4 w-full sm:w-[400px]'
          initial={{opacity:0.2,y:50}}
          whileInView={{opacity:1,y:0}}
          transition={{duration:0.4}}
          viewport={{once:true}}>
        <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>
        <p className='text-sm'>Welcome back! Please sign in to continue</p>
        {state!=='Login' &&  <div className='  border px-2 py-2  rounded-full mt-5 flex items-center gap-2'>
            {/* <img src={assets.profile_icon} alt=""/>    */}
            <input type="text" className='outline-none text-sm' placeholder='Username' required/>
        </div>}
        <div className='border px-2 py-2  rounded-full mt-5 flex items-center gap-2'>
            <img src={assets.email_icon} alt=""/>   
            <input type="text" className='outline-none text-sm' placeholder='Email' required/>
        </div>
        <div className='border px-2 py-2  rounded-full mt-5 flex items-center gap-2'>
            <img src={assets.lock_icon} alt=""/>   
            <input type="text" className='outline-none text-sm' placeholder='Password' required/>
        </div>
        <p className='text-blue-600 text-sm cursor-pointer my-4'>Forgot Password?</p>
        <button className='rounded-full bg-teal-300 w-full  cursor-pointer text-white py-2'>{state=='Login'?'Login':'Create Account'}</button>
        { state=='Login' ?<p className='mt-5 text-center'onClick={()=>setState('sign up')}>Don't have an account?<span className='text-blue-600 cursor-pointer'>Sign Up</span></p>
        :
        <p className='mt-5 text-center 'onClick={()=>setState('Login')}>Already have an account?<span className='text-blue-600 cursor-pointer'>Log in</span></p>}
      <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" className='absolute top-5 right-5 cursor-pointer ' />
       
        
        
      </motion.form>
    </div>
  )
}

export default Login
