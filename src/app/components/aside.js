'use client'
import {useState, } from "react";
import Link from "next/link";
import { Menu, X, ArrowRightFromLine, Home, Archive, CircleDollarSign, GalleryVerticalEnd } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";

function Aside() {
    const [menu, setMenu] = useState(true);
    const pathname = usePathname();

    const toggleMenu = () => {
        setMenu(!menu);
    };
    return (
        <aside className={`${menu ? "max-w-[250px] min-w-[250px]" : "max-w-[110px] min-w-[110px]"} flex flex-col justify-between h-screen p-4 transition-all duration-150`}>
            <div className="flex flex-col justify-center items-start">
                <div className="w-auto p-2 cursor-pointer" onClick={toggleMenu}>
                    {menu ? <X /> : <Menu />}
                </div>
                <div className="w-full p-4 overflow-hidden whitespace-nowrap">
                    <h1 className="line-clamp-1">Coffee Sena</h1>
                    <img
                        className="img-aside"
                        src="/logo-coffeesena.png"
                        alt="Logo coffee sena"
                        width={50}
                        height={50}
                    />
                </div>
                <nav className={"nav-aside"}>
                    <ul className="flex flex-col gap-4 list-none">
                        <li className="rounded-lg transition-all duration-150 cursor-pointer">
                            <Link
                                className={`flex justify-center items-center gap-1 text-black rounded-xl no-underline p-4 ${
                                    pathname == "/dashboard" ? "bg-[#eee]" : "bg-white"
                                }`}
                                href={"/dashboard"}
                            >
                                <Home size={20}/><span className={menu ? "block font-semibold" : "hidden"}>Inicio</span>
                            </Link>
                        </li>
                        <li className="li-nav-aside">
                            <Link
                                className={`flex justify-center items-start gap-1 text-black rounded-xl no-underline p-4 ${
                                    pathname == "/dashboard/inventario" ? "bg-[#eee]" : "bg-white"
                                }`}
                                href={"/dashboard/inventario"}
                            >
                                <Archive size={20}/><span className={menu ? "block font-semibold" : "hidden"}>Inventario</span>
                            </Link>
                        </li>
                        <li className="li-nav-aside">
                            <Link
                                className={`flex justify-center items-center gap-1 text-black rounded-xl no-underline p-4 ${
                                    pathname == "/dashboard/ventas" ? "bg-[#eee]" : "bg-white"
                                }`}
                                href={"/dashboard/ventas"}
                            >
                                <CircleDollarSign size={20}/><span className={menu ? "block font-semibold" : "hidden"}>Venta</span>
                            </Link>
                        </li>
                        <li className="li-nav-aside">
                            <Link className={`flex justify-center items-center gap-1 text-black rounded-xl no-underline p-4 ${
                                    pathname == "/dashboard/historial" ? "bg-[#eee]" : "bg-white"
                                }`}
                                href={"/dashboard/historial"}
                            >
                                <GalleryVerticalEnd size={20}/><span className={menu ? "block font-semibold" : "hidden"}>Historial</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="flex flex-col justify-center items-start">
                <div className="flex w-full flex-col items-center gap-4 justify-between">
                    <div className="flex flex-col justify-center items-center gap-1">
                        <div className="w-[50px] h-[50px] bg-[#dedede] rounded-full object-cover">
                            <Image
                                className="w-full object-cover"
                                src="/user.png"
                                alt="Logo coffee sena"
                                height={50}
                                width={50}
                            />
                        </div>
                        <span>Admin</span>
                    </div>
                    <div className="p-2 rounded-lg cursor-pointer transition-all duration-150 ml-1 text-center bg-red-500 text-white flex items-center justify-center gap-2 text-base font-semibold overflow-hidden whitespace-nowrap">
                        <a className="logout-span" href="/login"> <ArrowRightFromLine size={24} className={menu ? "hidden" : "block"}/>{menu ? 'Cerrar sesión' : ''}</a>
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default Aside;
