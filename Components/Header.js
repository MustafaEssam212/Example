import {useState} from 'react'
import Link from 'next/link'
import { signIn, signOut } from "next-auth/react"

const Header = () => {

  const [registerBtn, setRegisterBtn] = useState(false);
  const [loginBtn, setLoginBtn] = useState(false)
  const [Data, setData] = useState({
    email: '',
    password: ''
  })

  const checkPassword = (str) => {
    return /[A-Z]/.test(str)
  } 


  const handleRegister = async () => {


    if(Data.password.length < 8){
      alert('Password must be at least 8 chars')
    }else if(!checkPassword(Data.password)){
      alert('Password must be contain an Uppercase letter')
    }else{
      const res = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify(Data),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await res.json()

      console.log(data.message)
    }

      

  }


  const handleLogin = async () => {
    const res = await signIn("credential", {
      email: Data.loginEmail,
      password: Data.loginPassword,
      redirect: true,
      callbackUrl: `http://localhost:3000/products`
    })

    res.error ? console.log(res.error) : console.log('Done')
  }


  



  return (
    <header>
       <Link href="/">Home</Link>
       <Link href="/about">About</Link>
       <Link href="/products">Products</Link>
       <button onClick={() => setRegisterBtn(true)}>Sign up</button>
       <button onClick={()=> setLoginBtn(true)}>Sign in</button>
       <button onClick={()=> signOut({callbackUrl: `http://localhost:3000/`})}>Sign Out</button>
       <button onClick={()=> signIn('discord')}>Discord</button>


      {
        registerBtn ?        <div className='RegisterModal'>
        <span onClick={()=> setRegisterBtn(false)}>x</span>
          <div className='InnerRegister'>
            <input type='text' placeholder='Email' onChange={(s)=> setData(pre => ({...pre, email: s.target.value}))} ></input>
            <input type='password' placeholder='Password' onChange={(s)=> setData(pre => ({...pre, password: s.target.value}))} ></input>
            <button onClick={handleRegister}>Sign up</button>

          </div>
       </div> : <></>
      }


      {
        loginBtn ? <div className='LoginModal'>
        <span onClick={()=> setLoginBtn(false)}>x</span>
          <div className='InnerLogin'>
            <input type='text' placeholder='Email' ></input>
            <input type='password' placeholder='Password' ></input>
            <button onClick={handleLogin}>Sign in</button>
          </div>
       </div> : <></>
      }
    </header>
  )
}

export default Header
