"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

function page() {
    const navigate = useRouter();
    const [data, setData] = useState({
        Nom_User: "",
        Ape_User: "",
        Ema_User: "",
        Pass_User: "",
        Dir_Ip: "192.168.0.5",
    });
    console.log(data);
    const handleChange = e => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const handleSubmit = async e => {
        e.preventDefault();

        try {
            fetch("http://localhost:3000/api/v1/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.code === 200) {
                        navigate.push("/auth/login");
                    }
                });
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <form
            className="m-4 w-2/4 min-h-[500px] rounded-xl flex flex-col items-center justify-around p-4 gap-3"
            onSubmit={handleSubmit}
        >
            <div className="flex flex-col items-center justify-center w-[90%]">
                <img src="#" alt="" />
                <h1 className="font-bold text-3xl">REGISTRO</h1>
                <p className="text-base font-medium">
                    Ingrese la información para registrarse
                </p>
            </div>
            <section className="flex flex-col items-center justify-center w-4/5 h-2/4 gap-3">
                <div className="flex flex-col items-start w-full justify-between">
                    <label>Nombre</label>
                    <input
                        type="text"
                        name="Nom_User"
                        required
                        className="w-full h-10 pl-2 p-2 border-1 border-gray-400 rounded-xl"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col items-start w-full justify-between">
                    <label>Apellido</label>
                    <input
                        type="text"
                        name="Ape_User"
                        required
                        className="w-full h-10 pl-2 p-2 border-1 border-gray-400 rounded-xl"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col items-start w-full justify-between">
                    <label>Correo</label>
                    <input
                        type="email"
                        name="Ema_User"
                        required
                        className="w-full h-10 pl-2 p-2 border-1 border-gray-400 rounded-xl"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col items-start w-full justify-between">
                    <label>Contraseña</label>
                    <input
                        type="password"
                        name="Pass_User"
                        className="w-full h-10 pl-2 p-2 border-1 border-gray-400 rounded-xl"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="footer-login__top">
                    <div className="flex items-center gap-3">
                        <p>¿Ya tienes cuenta?</p>
                        <button className="bg-green p-2 rounded-lg text-black">Iniciar sesión</button>
                    </div>
                </div>
            </section>
            <button type="submit" className="btn-r">
                Registrarse
            </button>
        </form>
    );
}

export default page;
