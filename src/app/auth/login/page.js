'use client'
import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

function page() {

  const navigate = useRouter()
  const [data, setData] = useState({
    "Ema_User": "",
    "Pass_User": "",
    "Dir_Ip": "192.168.0.5"
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const authLogin = (e) => {
    e.preventDefault();
    try {
        fetch('http://localhost:3000/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then((response) => response.json())
      .then((data) => {
        if(data.code === 200) {
          navigate.push('/inicio')
        }
      })
    } catch(e) {
      console.log(e);
    }
  }


  return (
    <form className='m-4 w-2/4 min-h-[500px] rounded-xl flex flex-col items-center justify-around p-4 gap-3' onSubmit={authLogin}>
      <div className='flex flex-col items-center justify-center w-[90%]'>
        <img src="#" alt="" />
        <h1 className='font-bold text-3xl'>LOGIN</h1>
        <p className='text-base font-medium'>Ingrese la información para registrarse</p>
      </div>
      <section className="flex flex-col items-center justify-center w-4/5 h-2/4 gap-3">
        <div className="flex flex-col items-start w-full justify-between">
          <label>Correo</label>
          <input type="email" name='Ema_User' required className='w-full h-10 pl-2 p-2 border-1 border-gray-400 rounded-xl' onChange={handleChange}/>
        </div>
        <div className="flex flex-col items-start w-full justify-between">
          <label>Contraseña</label>
          <input type="password" name='Pass_User' className="w-full h-10 pl-2 p-2 border-1 border-gray-400 rounded-xl" onChange={handleChange}  required/>
        </div>
        <div className="footer-login__top">
            <a href="register">¿Olvidaste la contraseña?</a>
          <div>
            <p>¿No tienes cuenta?</p>
            <a href='/auth/register'>Registrarse</a>
          </div>
        </div>
      </section>
      <button type="submit" className="bg-black p-2 rounded-lg text-white">Iniciar sesión</button>
    </form>
  )
}

export default page