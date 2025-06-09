import React, { useContext, useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../contexts/AppContext'
import { motion } from 'framer-motion'
import axios from 'axios'
import { toast } from 'react-toastify'

// Utility to safely join base URL and path
function buildUrl(base, path) {
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

const Login = () => {
  const [state, setState] = useState('Login')
  const { setShowLogin, backurl, setToken, setUser } = useContext(AppContext)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      if (state === 'Login') {
        const url = buildUrl(backurl, '/api/user/login')
        const { data } = await axios.post(url, { email, password })
        if (data.success) {
          setToken(data.token)
          setUser(data.user)
          localStorage.setItem('token', data.token)
          setShowLogin(false)
        } else {
          toast.error(data.message)
        }
      } else {
        const url = buildUrl(backurl, '/api/user/register')
        const { data } = await axios.post(url, { name, email, password })
        if (data.success) {
          setToken(data.token)
          setUser(data.user)
          localStorage.setItem('token', data.token)
          setShowLogin(false)
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <div className='absolute fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
      <motion.form
        onSubmit={onSubmitHandler}
        className='relative bg-white p-10 rounded-xl text-slate-500 shadow-lg flex flex-col gap-4 w-full sm:w-[400px]'
        initial={{ opacity: 0.2, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
      >
        <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>
        <p className='text-sm'>{state === 'Login' ? 'Welcome back! Please sign in to continue' : 'Create your account'}</p>

        {state !== 'Login' && (
          <div className='border px-2 py-2 rounded-full mt-5 flex items-center gap-2'>
            <input
              onChange={e => setName(e.target.value)}
              value={name}
              type="text"
              className='outline-none text-sm'
              placeholder='Username'
              required
            />
          </div>
        )}

        <div className='border px-2 py-2 rounded-full mt-5 flex items-center gap-2'>
          <img src={assets.email_icon} alt="" />
          <input
            onChange={e => setEmail(e.target.value)}
            value={email}
            type="email"
            className='outline-none text-sm'
            placeholder='Email'
            required
          />
        </div>

        <div className='border px-2 py-2 rounded-full mt-5 flex items-center gap-2'>
          <img src={assets.lock_icon} alt="" />
          <input
            onChange={e => setPassword(e.target.value)}
            value={password}
            type="password"
            className='outline-none text-sm'
            placeholder='Password'
            required
          />
        </div>

        <p className='text-blue-600 text-sm cursor-pointer my-4'>Forgot Password?</p>

        <button className='rounded-full bg-teal-300 w-full cursor-pointer text-white py-2' type="submit">
          {state === 'Login' ? 'Login' : 'Create Account'}
        </button>

        {state === 'Login' ? (
          <p className='mt-5 text-center' onClick={() => setState('sign up')}>
            Don't have an account?<span className='text-blue-600 cursor-pointer'> Sign Up</span>
          </p>
        ) : (
          <p className='mt-5 text-center' onClick={() => setState('Login')}>
            Already have an account?<span className='text-blue-600 cursor-pointer'> Log in</span>
          </p>
        )}

        <img
          onClick={() => setShowLogin(false)}
          src={assets.cross_icon}
          alt=""
          className='absolute top-5 right-5 cursor-pointer'
        />
      </motion.form>
    </div>
  )
}

export default Login
