'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Bolt, EllipsisVertical, Home, ScanBarcode, Archive, CircleDollarSign, GalleryVerticalEnd, ShoppingCart, Truck, LogOut, CircleUserRound, TextSearch, QrCode } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

import { deleteCookie, getCookie } from "cookies-next";

function Aside() {
    const [menu, setMenu] = useState(true);
    const [menuUser, setMenuUser] = useState(false)
    const pathname = usePathname();
    const router = useRouter();

    const [dataUser, setDataUser] = useState({})

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
                    Authorization: 'Bearer ' + token
                }
            })
                .then(response => response.json())
                .then(response => {
                    setDataUser(response.data)
                })
        } catch (err) {
            console.log("Error: " + err)
        }
        // return console.log(JSON.parse(jsonPayload));
    }, [])


    const toggleMenu = () => {
        setMenu(!menu);
    };

    const toggleMenuUser = () => {
        setMenuUser(!menuUser);
    };

    const logout = async () => {
        try {
          const response = await fetch("http://localhost:3000/api/v1/user/logout", {
            method: "GET",
            headers: {
              Authorization: "Bearer " + token,
            },
          });
          const data = await response.json();
          if (data.code === 200) {
            deleteCookie("sessionToken");
            localStorage.removeItem("sessionToken");
            router.push("/auth");
          }
        } catch (error) {
          console.error("Logout error:", error);
        }
      };

    return (
        <aside className={`${menu ? "lg:h-screen lg:max-h-screen max-h-[90px] max-w-full w-full lg:max-w-[200px] lg:min-w-[200px] 2xl:min-w-[200px] 2xl:max-w-[200px]" : "max-w-full w-full lg:min-w-[90px] lg:max-w-[90px] h-auto max-h-[90px] lg:h-screen md:max-h-screen 2xl:max-w-[110px] 2xl:min-w-[110px]"} z-[100000] fixed left-0 bg-sky-500 lg:flex lg:flex-col flex-row justify-evenly lg:justify-between items-center py-2 transition-all duration-150`}>
            <div className="flex flex-row lg:flex-col justify-between lg:justify-center items-center w-full h-full">
                <div className="pr-6 py-2 pl-11 lg:p-4 cursor-pointer z-[100]" onClick={toggleMenu}>
                    <div className="p-1 bg-sky-600 rounded-full">{menu ? <X color="white" /> : <Menu color="white" />}</div>
                </div>
                <div className="pl-6 py-2 pr-11 lg:p-4 overflow-hidden whitespace-nowrap flex flex-col items-center z-[100]">
                    <Image
                        className="img-aside"
                        src="/logo-coffeesena.png"
                        alt="Logo coffee sena"
                        width={50}
                        height={50}
                    />
                </div>
                <div className="w-full h-full absolute lg:relative flex flex-col justify-between">
                    <nav className={`${menu ? "w-2/4 lg:w-full p-0" : "w-0 lg:w-full p-0"} flex flex-col justify-between absolute top-0 pt-[100px] z-50 left-0 lg:relative transition-all duration-150 bg-sky-500 mx-auto lg:block  lg:p-0 lg:bg-transparent h-screen lg:h-auto`}>
                        <ul className={`${menu ? "flex" : "hidden lg:flex"} flex-col gap-2 list-none w-4/5 mx-auto`}>
                            <li className="transition-all duration-150 cursor-pointer">
                                <a
                                    className={`flex ${menu ? 'justify-start' : 'justify-center'} transition-all duration-100 items-center gap-1 text-black no-underline rounded-lg py-3 px-2 text-sm ${pathname == "/" ? "bg-white hover:bg-white" : "hover:bg-sky-600 text-white"
                                        }`}
                                    href={"/"}
                                >
                                    <div><Home size={20} color={pathname == '/' ? "#0ea5e9" : 'white'} /></div><div className={menu ? "block font-semibold" : "hidden"}>Inicio</div>
                                </a>
                            </li>
                            <li className="rounded-lg transition-all duration-150 cursor-pointer">
                                <a
                                    className={`flex ${menu ? 'justify-start' : 'justify-center'} transition-all duration-100 items-center gap-1 text-black no-underline rounded-lg py-3 px-2 text-sm ${pathname == "/productos" ? "bg-white hover:bg-white" : "hover:bg-sky-600 text-white"
                                        }`}
                                    href={"/productos"}
                                >
                                    <div><ShoppingCart size={20} color={pathname == '/productos' ? "#0ea5e9" : 'white'} /></div><div className={menu ? "block font-semibold" : "hidden"}>Productos</div>
                                </a>
                            </li>
                            <li className="rounded-lg transition-all duration-150 cursor-pointer">
                                <a
                                    className={`flex ${menu ? 'justify-start' : 'justify-center'} transition-all duration-100 items-center gap-1 text-black no-underline rounded-lg py-3 px-2 text-sm ${pathname == "/proveedores" ? "bg-white hover:bg-white" : "hover:bg-sky-600 text-white"
                                        }`}
                                    href={"/proveedores"}
                                >
                                    <div><Truck size={20} color={pathname == '/proveedores' ? "#0ea5e9" : 'white'} /></div><div className={menu ? "block font-semibold" : "hidden"}>Proveedores</div>
                                </a>
                            </li>
                            <li className="li-nav-aside">
                                <a
                                    className={`flex ${menu ? 'justify-start' : 'justify-center'} transition-all duration-100 items-center gap-1 text-black no-underline rounded-lg py-3 px-2 text-sm ${pathname == "/inventario" ? "bg-white hover:bg-white" : "hover:bg-sky-600 text-white"
                                        }`}
                                    href={"/inventario"}
                                >
                                    <div><Archive size={20} color={pathname == '/inventario' ? "#0ea5e9" : 'white'} /></div><div className={menu ? "block font-semibold" : "hidden"}>Inventario</div>
                                </a>
                            </li>
                            <li className="li-nav-aside">
                                <a
                                    className={`flex ${menu ? 'justify-start' : 'justify-center'} transition-all duration-100 items-center gap-1 text-black no-underline rounded-lg py-3 px-2 text-sm ${pathname == "/lotes" ? "bg-white hover:bg-white" : "hover:bg-sky-600 text-white"
                                        }`}
                                    href={"/lotes"}
                                >
                                    <div><ScanBarcode size={20} color={pathname == '/lotes' ? "#0ea5e9" : 'white'} /></div><div className={menu ? "block font-semibold" : "hidden"}>Lotes</div>
                                </a>
                            </li>
                            <li className="line-clamp-1 w-full">
                                <a className={`flex ${menu ? 'justify-start' : 'justify-center'} w-full line-clamp-1 transition-all duration-100 items-center gap-1 text-black no-underline rounded-lg py-3 px-2 text-sm ${pathname == "/compras" ? "bg-white hover:bg-white" : "hover:bg-sky-600 text-white"
                                    }`}
                                    href={"/compras"}
                                >
                                    <div><QrCode size={20} color={pathname == '/compras' ? "#0ea5e9" : 'white'} /></div><div className={`${menu ? "block font-semibold" : "hidden"} line-clamp-1 w-full text-ellipsis overflow-hidden whitespace-nowrap`}>Compras / Ventas</div>
                                </a>
                            </li>
                            <li className="line-clamp-1">
                                <a
                                    className={`flex ${menu ? 'justify-start' : 'justify-center'} transition-all duration-100 items-center gap-1 text-black no-underline rounded-lg py-3 px-2 text-sm ${pathname == "/configuracion" ? "bg-white hover:bg-white" : "hover:bg-sky-600 text-white"
                                        }`}
                                    href={"/configuracion"}
                                >
                                    <div><Bolt size={20} color={pathname == '/configuracion' ? "#0ea5e9" : 'white'} /></div><div className={menu ? "block font-semibold" : "hidden"}>Configuración</div>
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <div className="hidden lg:flex flex-col justify-center items-start w-full px-6 pb-2 relative">
                        <div className="w-full absolute top-[-60px] left-0 flex flex-col items-center justify-center">
                            <button className={`${menuUser ? "scale-100" : "scale-0"} line-clamp-1 flex gap-2 items-center bg-red-600 text-sm p-3 rounded-xl text-white font-medium transition-all duration-150 hover:bg-red-700`} onClick={logout}>{menu ? "Cerrar sesión" : ''} <LogOut size={18} /></button>
                        </div>
                        <div className={`flex w-full flex-col items-center gap-4 ${menu ? 'justify-between' : 'justify-center'}`}>
                            <div className={`flex ${menu ? 'justify-between' : 'justify-center'} items-center gap-2 w-full`}>
                                <div className="flex gap-1 items-center relative">
                                    <div className="w-[35px] h-[35px] bg-transparent rounded-full object-cover">
                                        {menu ? <CircleUserRound size={35} color="white" /> : <button onClick={toggleMenuUser}><CircleUserRound size={35} color="white" /></button>}
                                    </div>
                                    <div className={` ${menu ? 'flex' : 'hidden'} flex-col leading-none line-clamp-1`}>
                                        <span className="font-semibold text-white line-clamp-1">{dataUser.Nom_User}</span>
                                        <span className="font-regular text-sm text-gray-100 line-clamp-1">Admin</span>
                                    </div>
                                </div>
                                <div className={` ${menu ? 'flex' : 'hidden'} flex-col`}>
                                    <button onClick={toggleMenuUser} className="p-2 rounded-full hover:bg-sky-600 transition-all duration-150"><EllipsisVertical size={18} color="white" className="cursor-pointer" /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </aside>
    );
}

export default Aside;
