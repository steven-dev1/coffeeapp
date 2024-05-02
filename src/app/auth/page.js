'use client'
import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Asterisk, Lock, UserRound, CircleUserRound, CircleX, CircleCheck } from 'lucide-react';
import Image from 'next/image';
import { setCookie } from 'cookies-next';
import Spinner from '@/components/SpinnerAuth/Spinner'

function Page() {
  const [form, setForm] = useState(true)
  const [loading, setLoading] = useState(false)
  // const cookies = cookies();
  const navigate = useRouter()
  const [data, setData] = useState({
    "Ema_User": "",
    "Pass_User": "",
    "Dir_Ip": "192.168.0.5"
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError(false);
  };
  const authLogin = (e) => {
    e.preventDefault();
    try {
      fetch('http://localhost:3000/api/v1/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.code === 200) {
            setLoading(true);
            localStorage.setItem('sessionToken', data.data);
            setCookie('sessionToken', data.data);
            navigate.push('/')
          } else if (data.code === 403) {
            setMsgError('Contraseña inválida, debe tener mínimo 8 caracteres.')
            setError(true)
          } else if (data.code === 103) {
            setMsgError('Contraseña incorrecta, intenta nuevamente.')
            setError(true)
          }
        })
    } catch (e) {
      console.log(e);
    }
  }


  // REGISTRO
  const [dataR, setDataR] = useState({
    Nom_User: "",
    Ape_User: "",
    Ema_User: "",
    Pass_User: "",
    Dir_Ip: "192.168.0.5",
  });

  const handleChangeR = e => {
    setDataR({ ...dataR, [e.target.name]: e.target.value });
    setError(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      fetch("http://localhost:3000/api/v1/register", {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataR),
      })
        .then(response => response.json())
        .then(data => {
          if (data.code === 200) {
            setDataR({
              Nom_User: "",
              Ape_User: "",
              Ema_User: "",
              Pass_User: "",
              Dir_Ip: "192.168.0.5",
            })
            setForm(1);
            setSuccessMsg({ status: true, msg: "Te has registrado correctamente" })
            setTimeout(() => {
              setSuccessMsg({ ...successMsg, status: false})
            }, 3000)
          } else if (data.code === 409) {
            setMsgError('Ese correo ya está registrado')
            setError(true)
          } else if (data.code === 403) {
            setMsgError('Todos los campos son requeridos')
            setError(true)
          }
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const showRegister = () => {
    setForm(false);
  }
  const showLogin = () => {
    setForm(true);
  }

  const [error, setError] = useState(false);
  const [successMsg, setSuccessMsg] = useState({ status: false, msg: '' });
  const [msgError, setMsgError] = useState('');

  return (
    <main className='w-screen h-screen p-0 m-0 flex justify-center items-center bg-gray-200 overflow-hidden'>
      <div className={`bg-green-100 p-3 rounded-lg absolute ${successMsg.status ? "scale-100" : "scale-0"} transition-all duration-150 top-10 right-10 border border-1 border-green-300 text-green-600 mb-1 font-medium flex items-center justify-center gap-1 text-center`}>
        <CircleCheck size={20} /> {successMsg.msg}
      </div>
      <div className='w-[400px] h-[400px] rounded-full bg-sky-500 fixed bottom-[-9em] right-[-7em]'></div>
      <div className='w-[400px] h-[400px] rounded-full bg-sky-500 scale fixed top-[-9em] left-[-7em]'></div>
      <form className={`absolute m-4 ${form ? "w-auto p-4 z-10" : "min-w-0 w-0 p-0 z-0"} transition-all duration-500 min-w-[550px] min-h-[550px] overflow-hidden bg-gray-100 rounded-xl flex flex-col items-center justify-around gap-5 mx-auto`} onSubmit={authLogin}>
        <div className={`${form ? "opacity-1" : "opacity-0"} flex flex-col items-center justify-center w-[90%]`}>
          <h1 className='font-bold text-3xl'>LOGIN</h1>
          <hr className='w-full border-gray-300 my-2' />
          <p className='text-base font-medium'>Ingrese las credenciales para iniciar sesión.</p>
        </div>
        <section className={` ${form ? "opacity-1" : "opacity-0"} flex flex-col items-center justify-center w-4/5 h-2/4 gap-3`}>
          <div className="flex flex-col items-start w-full justify-between gap-1 text-sm">
            <label className='ml-1 flex items-center gap-1'><Mail size={18} /> Correo</label>
            <input type="email" name='Ema_User' placeholder='email@gmail.com' required className='outline-none focus:border-sky-500 w-full h-10 pl-2 p-2 border border-1 border-gray-300 rounded-xl' onChange={handleChange} />
          </div>
          <div className="flex flex-col items-start w-full justify-between gap-1 text-sm">
            <label className='ml-1 flex items-center gap-1'><Lock size={18} /> Contraseña</label>
            <input type="password" name='Pass_User' placeholder='*******' className="outline-none focus:border-sky-500 w-full h-10 pl-2 p-2 border border-1 border-gray-300 rounded-xl" onChange={handleChange} required />
          </div>
          <div className="flex items-center justify-between w-full text-sm">
            <a href="/auth/register" className='underline'>¿Olvidaste la contraseña?</a>
            <div className='flex gap-1'>
              <p>¿No tienes cuenta?</p>
              <a className='text-sky-500 underline font-semibold cursor-pointer' onClick={showRegister}>Registrate</a>
            </div>
          </div>
          <div className={`bg-red-100 p-3 rounded-lg text-red-600 mt-1 font-medium ${error ? "flex" : "hidden"} text-sm items-center justify-center gap-1 text-center`}>
            <CircleX size={20} /> {msgError}
          </div>
        </section>
        <button type="submit" className={`${form ? "opacity-1" : "opacity-0"} flex font-semibold transition-all duration-150 bg-sky-500 hover:bg-sky-600 text-white py-2 px-4 rounded-full`}>{loading ? <Spinner /> : "Iniciar sesión"}</button>
      </form>

      {/* REGISTRO */}

      <form
        className={`absolute m-4 ${form ? "min-w-0 w-0 p-0 z-0" : "w-auto p-4 z-10"} transition-all duration-500 min-w-[550px] min-h-[550px] overflow-hidden bg-gray-100 rounded-xl flex flex-col items-center justify-around gap-3 mx-auto`}
        onSubmit={handleSubmit}
      >
        <div className={`${form ? "opacity-0" : "opacity-1"} flex flex-col items-center justify-center w-[90%]`}>
          <h1 className="font-bold text-3xl">REGISTRO</h1>
          <hr className='w-full border-gray-300 my-2' />
          <p className="text-base font-medium">
            Ingrese la información para registrarse.
          </p>
        </div>
        <section className={`${form ? "opacity-0" : "opacity-1"} flex flex-col items-center justify-center w-4/5 h-2/4 gap-3 `}>
          <div className="flex flex-col items-start w-full justify-between text-sm gap-1">
            <label className='ml-2 flex items-center gap-1'><CircleUserRound size={18} /> Nombre</label>
            <input
              type="text"
              name="Nom_User"
              required
              className="w-full h-10 pl-2 p-2 border border-1 border-gray-300 rounded-xl outline-none focus:border-sky-500 "
              onChange={handleChangeR}
              placeholder='Andres'
            />
          </div>
          <div className="flex flex-col items-start w-full justify-between text-sm gap-1">
            <label className='ml-2 flex items-center gap-1'><CircleUserRound size={18} /> Apellido</label>
            <input
              type="text"
              name="Ape_User"
              required
              className="w-full h-10 pl-2 p-2 border border-1 border-gray-300 rounded-xl outline-none focus:border-sky-500 "
              onChange={handleChangeR}
              placeholder='Cavadía'
            />
          </div>
          <div className="flex flex-col items-start w-full justify-between text-sm gap-1">
            <label className='ml-2 flex items-center gap-1'><Mail size={18} /> Correo</label>
            <input
              type="email"
              name="Ema_User"
              required
              className="w-full h-10 pl-2 p-2 border border-1 border-gray-300 rounded-xl outline-none focus:border-sky-500 "
              onChange={handleChangeR}
              placeholder='andres@gmail.com'
            />
          </div>
          <div className="flex flex-col items-start w-full justify-between text-sm gap-1">
            <label className='ml-2 flex items-center gap-1'><Lock size={18} /> Contraseña</label>
            <input
              type="password"
              name="Pass_User"
              className="w-full h-10 pl-2 p-2 border border-1 border-gray-300 rounded-xl outline-none focus:border-sky-500 "
              onChange={handleChangeR}
              required
              placeholder='********'
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-1 mt-2 text-sm">
            <div className={`bg-red-100 p-3 rounded-lg text-red-600 mb-1 font-medium ${error ? "flex" : "hidden"} text-sm items-center justify-center gap-1 text-center`}>
              <CircleX size={20} /> {msgError}
            </div>
            <div className='flex items-center gap-1'>
              <p>¿Ya tienes cuenta?</p>
              <a className='text-sky-500 underline font-semibold cursor-pointer' onClick={showLogin}>Iniciar sesión</a></div>
          </div>
        </section>
        <button type="submit" className={`${form ? "opacity-0" : "opacity-1"} flex font-semibold transition-all duration-150 bg-sky-500 hover:bg-sky-600 text-white py-2 px-4 rounded-full`}>
          Registrarse
        </button>
      </form>
    </main>
  )
}

export default Page