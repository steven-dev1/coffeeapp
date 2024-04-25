'use client'
import Aside from '@/components/aside'
import { useRouter } from 'next/navigation'
import { Lock, Mail, Phone, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getCookie } from 'cookies-next'
import React from 'react'

export default function Page() {
    const [firstDataUser, setFirstDataUser] = useState({})
    const [dataUser, setDataUser] = useState({})
    const router = useRouter()

    const token = getCookie('sessionToken')

    useEffect(() => {
        try {
            let base64Url = token.split('.')[1];
            let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
    
            const response = JSON.parse(jsonPayload)

            fetch(`http://localhost:3000/api/v1/users/${response.user.Id_User}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer '+ token
                }
            })
            .then(response => response.json())
            .then(response => {
                setFirstDataUser(response.data)
            })
        } catch (err){
            console.log("Error: " + err)
        }
        // return console.log(JSON.parse(jsonPayload));
    }, [])

    const handleChangeName = (e) => {
        setDataUser(prevState => ({
            ...prevState,  // Mantener las propiedades existentes
            Nom_User: e.target.value
        }))
    }

    const handleChangeApellido = (e) => {
        setDataUser(prevState => ({
            ...prevState,  // Mantener las propiedades existentes
            Ape_User: e.target.value
        }))
    }

    const handleChangeEmail = (e) => {
        setDataUser(prevState => ({
            ...prevState,  // Mantener las propiedades existentes
            Ema_User: e.target.value
        }))
    }

    const handleChangePass = (e) => {
        setDataUser(prevState => ({
            ...prevState,  // Mantener las propiedades existentes
            Pass_User: e.target.value
        }))
    }
    


    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            fetch(`http://localhost:3000/api/v1/users/update/${firstDataUser.Id_User}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                },
                body: JSON.stringify(dataUser)
            })
            setDataUser({})
            router.refresh()
        } catch (e) {
            console.log("Error: " + e);
        }
    }

    return (
        <main className="flex flex-col lg:flex-row overflow-y-hidden">
            <Aside />
            <div className="w-full h-full p-6 ml-0 lg:ml-[200px] 2xl:ml-[200px] mt-[80px] lg:mt-0">
                <div>
                    <h3 className='font-bold text-xl'>Editar perfil</h3>
                </div>
                <hr className="my-4" />
                <div className=' bg-gray-100  rounded-xl py-6 w-full h-full'>
                    <form className='w-full flex flex-col gap-3 justify-center p-6' onSubmit={handleSubmit}>
                        <div className='flex flex-col gap-1 items-start w-full'>
                            <label className='ml-1 font-semibold flex items-center gap-1'><User size={18} /> Nombre:</label>
                            <input onChange={handleChangeName} type="text" defaultValue={firstDataUser.Nom_User} className='w-full border border-1 border-gray-300 px-3 py-2 rounded-xl' />
                        </div>
                        <div className='flex flex-col gap-1 items-start w-full'>
                            <label className='ml-1 font-semibold flex items-center gap-1'><User size={18} /> Apellido:</label>
                            <input onChange={handleChangeApellido} type="text" defaultValue={firstDataUser.Ape_User} className='w-full border border-1 border-gray-300 px-3 py-2 rounded-xl' />
                        </div>
                        <div className='flex flex-col gap-1 items-start w-full'>
                            <label className='ml-1 font-semibold flex items-center gap-1'><Mail size={18} /> E-mail:</label>
                            <input onChange={handleChangeEmail} type="text" defaultValue={firstDataUser.Ema_User} className='w-full border border-1 border-gray-300 px-3 py-2 rounded-xl' />
                        </div>
                        <div className='flex flex-col gap-1 items-start w-full'>
                            <label className='ml-1 font-semibold flex items-center gap-1'><Lock size={18} /> Contraseña:</label>
                            <input onChange={handleChangePass} type="password" placeholder={"********"} className='w-full border border-1 border-gray-300 px-3 py-2 rounded-xl' />
                        </div>
                        <div className='w-full flex justify-center'>
                            <button type='submit' className='p-2 bg-sky-500 text-base font-medium rounded-lg mt-3 text-white hover:bg-sky-600 transition-all duration-150'>Actualizar</button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}
