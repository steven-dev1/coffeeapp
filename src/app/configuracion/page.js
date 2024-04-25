"use client";
import Aside from "@/components/aside";
import { useRouter } from "next/navigation";
import { Hash, Lock, Mail, MailX, Phone, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import React from "react";
import Spinner from "@/components/SpinnerAuth/Spinner";
import Swal from 'sweetalert2'

export default function Page() {
    const [firstDataUser, setFirstDataUser] = useState({});
    const [dataUser, setDataUser] = useState({});
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const token = getCookie("sessionToken");

    useEffect(() => {
        try {
            let base64Url = token.split(".")[1];
            let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            let jsonPayload = decodeURIComponent(
                window
                    .atob(base64)
                    .split("")
                    .map(function (c) {
                        return (
                            "%" +
                            ("00" + c.charCodeAt(0).toString(16)).slice(-2)
                        );
                    })
                    .join("")
            );

            const response = JSON.parse(jsonPayload);

            fetch(
                `http://localhost:3000/api/v1/users/${response.user.Id_User}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                }
            )
                .then(response => response.json())
                .then(response => {
                    setFirstDataUser(response.data);
                    setLoading(false);
                });
        } catch (err) {
            console.log("Error: " + err);
        }
        // return console.log(JSON.parse(jsonPayload));
    }, []);

    const handleChangeName = e => {
        setDataUser(prevState => ({
            ...prevState, // Mantener las propiedades existentes
            Nom_User: e.target.value,
        }));
    };

    const handleChangeApellido = e => {
        setDataUser(prevState => ({
            ...prevState, // Mantener las propiedades existentes
            Ape_User: e.target.value,
        }));
    };

    const handleChangeEmail = e => {
        setDataUser(prevState => ({
            ...prevState, // Mantener las propiedades existentes
            Ema_User: e.target.value,
        }));
    };

    const handleChangePass = e => {
        setDataUser(prevState => ({
            ...prevState, // Mantener las propiedades existentes
            Pass_User: e.target.value,
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        try {
            fetch(
                `http://localhost:3000/api/v1/users/update/${firstDataUser.Id_User}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                    body: JSON.stringify(dataUser),
                }
            );
            setDataUser({});
            router.refresh();
        } catch (e) {
            console.log("Error: " + e);
        }
    };

    const [modalVerifyCode, setModalVerifyCode] = useState(false)

    const showVerifyCode = () => {
        setModalVerifyCode(!modalVerifyCode)
    }

    const getVerifyEmail = async () => {
        try {
            await fetch("http://localhost:3000/api/v1/tokens/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token,
                },
                body: JSON.stringify({
                    "Id_User": firstDataUser.Id_User,
                    "Tipo_token": "2",
                })
            })
            .then(response => response.json())
            .then(response => {
                if(response.type == "success"){
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Se envió el código al correo",
                        showConfirmButton: false,
                        timer: 3500
                      });
                    showVerifyCode()
                }
            })
        } catch (e) {
            console.log("Error: "+e)
        }
    };

    const postVerifyEmail = async () => {
        try {
            await fetch("http://localhost:3000/api/v1/email_validate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token,
                },
                body: JSON.stringify({
                    "Id_User": firstDataUser.Id_User,
                    "codigo": document.getElementById('codigo').value,
                })
            })
            .then(response => response.json())
            .then(response => {
                if(response.type == "success"){
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Correo verificado",
                        showConfirmButton: false,
                        timer: 3500
                      });
                }
            })
        } catch (e) {
            console.log("Error: "+e)
        }
    }

    return (
        <main className="flex flex-col lg:flex-row overflow-y-hidden">
            <Aside />
            <div
                className={`flex ${modalVerifyCode ? "scale-100 opacity-1" : "scale-0 opacity-0"
                    } transition-all duration-150 justify-center items-center w-screen h-screen absolute z-[10000000000000] bg-gray-900 bg-opacity-50 backdrop-blur-3xl`}
            >
                <form
                    onSubmit={postVerifyEmail}
                    className="min-w-[450px] bg-white min-h-[450px] rounded-xl p-3 flex flex-col items-center justify-between relative"
                >
                    <div
                        onClick={showVerifyCode}
                        className="cursor-pointer absolute top-3 right-5 bg-red-500 rounded-full p-1"
                    >
                        <X size={20} color="white" />
                    </div>
                    <h6 className="text-center text-lg font-black uppercase">
                        Verificar Email
                    </h6>
                    <div className="w-full grid grid-cols-2 justify-items-center items-center gap-3 justify-center h-full">
                        <div className="flex flex-col justify-center w-4/5">
                            <label className="text-sm font-semibold flex items-center gap-1">
                                <Hash size={16} /> Código
                            </label>
                            <input
                                id="codigo"
                                name="codigo"
                                placeholder="263234"
                                type="text"
                                className=" rounded-md py-1 px-2 border border-1 border-gray-500"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="bg-transparent py-2 px-3 rounded-xl text-black font-semibold border-2 border-black transition-all duration-150 my-2 hover:text-white hover:bg-black text-sm"
                    >
                        Aceptar
                    </button>
                </form>
            </div>
            <div className="w-full h-full p-6 ml-0 lg:ml-[200px] 2xl:ml-[200px] mt-[80px] lg:mt-0">
                <div>
                    <h3 className="font-bold text-xl">Editar perfil</h3>
                </div>
                <hr className="my-4" />
                <div className=" bg-gray-100  rounded-xl py-6 w-full h-full">
                    <form
                        className="w-full flex flex-col gap-3 justify-center p-6"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex flex-col gap-1 items-start w-full">
                            <label className="ml-1 font-semibold flex items-center gap-1">
                                <User size={18} /> Nombre:
                            </label>
                            <input
                                onChange={handleChangeName}
                                type="text"
                                defaultValue={firstDataUser.Nom_User}
                                className="w-full border border-1 border-gray-300 px-3 py-2 rounded-xl"
                            />
                        </div>
                        <div className="flex flex-col gap-1 items-start w-full">
                            <label className="ml-1 font-semibold flex items-center gap-1">
                                <User size={18} /> Apellido:
                            </label>
                            <input
                                onChange={handleChangeApellido}
                                type="text"
                                defaultValue={firstDataUser.Ape_User}
                                className="w-full border border-1 border-gray-300 px-3 py-2 rounded-xl"
                            />
                        </div>
                        <div className="flex flex-col gap-1 items-start w-full">
                            <label className="ml-1 font-semibold flex items-center gap-1">
                                <Mail size={18} /> E-mail:
                            </label>
                            <input
                                onChange={handleChangeEmail}
                                type="text"
                                defaultValue={firstDataUser.Ema_User}
                                className="w-full border border-1 border-gray-300 px-3 py-2 rounded-xl"
                            />
                        </div>
                        <div className="flex flex-col gap-1 items-start w-full">
                            <label className="ml-1 font-semibold flex items-center gap-1">
                                <Lock size={18} /> Contraseña:
                            </label>
                            <input
                                onChange={handleChangePass}
                                type="password"
                                placeholder={"********"}
                                className="w-full border border-1 border-gray-300 px-3 py-2 rounded-xl"
                            />
                        </div>
                        <div className="w-full flex justify-center">
                            <button
                                type="submit"
                                className="p-2 bg-sky-500 text-base font-medium rounded-lg mt-3 text-white hover:bg-sky-600 transition-all duration-150"
                            >
                                Actualizar
                            </button>
                        </div>
                    </form>
                </div>
                {firstDataUser.Est_Email_User == 0 ? (
                    <div className="bg-red-100 text-red-500 p-3 rounded-lg my-3 lg:w-3/4 xl:w-2/4 mx-auto">
                        {loading ? <Spinner /> : ""}
                        <div className="w-full flex flex-col sm:flex-row justify-between items-center">
                            <p className="flex gap-2 items-center">
                                <MailX size={24} />
                                El correo electrónico no ha sido verificado
                            </p>
                            <button onClick={getVerifyEmail} className="bg-red-500 text-white p-2 rounded-lg mt-2 sm:mt-0 hover:bg-red-600 transition-all duration-150 font-semibold">
                                Verificar
                            </button>
                        </div>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </main>
    );
}
