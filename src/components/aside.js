'use client'
import { useState, } from "react";
import Link from "next/link";
import { Menu, X, ArrowRightFromLine, Home, Archive, CircleDollarSign, GalleryVerticalEnd, ShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";

function Aside() {
    const [menu, setMenu] = useState(true);
    const pathname = usePathname();

    const toggleMenu = () => {
        setMenu(!menu);
    };
    return (
        <aside className={`${menu ? "h-auto md:h-screen md:max-h-screen max-h-[100px] max-w-full w-full md:max-w-[150px] md:min-w-[150px] 2xl:min-w-[200px] 2xl:max-w-[200px]" : "max-w-full w-full md:min-w-[90px] md:max-w-[90px] h-auto max-h-[100px] md:h-screen md:max-h-screen 2xl:max-w-[110px] 2xl:min-w-[110px]"} bg-gray-100 md:flex md:flex-col flex-row justify-evenly md:justify-between items-center p-2 transition-all duration-150`}>
            <div className="flex flex-row md:flex-col justify-between md:justify-center items-center">
                <div className="p-2 cursor-pointer z-[100]" onClick={toggleMenu}>
                    {menu ? <X /> : <Menu />}
                </div>
                <div className="px-4 py-1 md:p-4 overflow-hidden whitespace-nowrap flex flex-col items-center z-[100]">
                    <Image
                        className="img-aside"
                        src="/logo-coffeesena.png"
                        alt="Logo coffee sena"
                        width={50}
                        height={50}
                    />
                </div>
                <nav className={`${menu ? "w-2/4 md:w-full p-0" : "w-0 md:w-full p-0"} md:w-full flex flex-col justify-between absolute top-0 pt-[96px] z-50 left-0 md:relative transition-all duration-150 backdrop-blur-xl mx-auto md:block  md:p-0 md:bg-transparent h-screen md:h-auto`}>
                    <ul className={`${menu ? "flex" : "hidden md:flex"} flex-col gap-4 list-none md:w-full`}>
                        <li className="rounded-lg transition-all duration-150 cursor-pointer">
                            <a
                                className={`flex ${menu ? 'justify-start' : 'justify-center'} hover:bg-gray-200 items-center gap-1 text-black rounded-xl no-underline p-3 text-sm 2xl:text-base ${pathname == "/" ? "bg-white hover:bg-white" : "bg-transparent text-gray-500"
                                    }`}
                                href={"/"}
                            >
                                <div><Home size={20} color={pathname == '/' ? "#00BF9C" : '#6B7280'} /></div><div className={menu ? "block font-semibold" : "hidden"}>Inicio</div>
                            </a>
                        </li>
                        <li className="rounded-lg transition-all duration-150 cursor-pointer">
                            <a
                                className={`flex ${menu ? 'justify-start' : 'justify-center'} hover:bg-gray-200 items-center gap-1 text-black rounded-xl no-underline p-3 text-sm 2xl:text-base ${pathname == "/productos" ? "bg-white hover:bg-white" : "bg-transparent text-gray-500"
                                    }`}
                                href={"/productos"}
                            >
                                <div><ShoppingCart size={20} color={pathname == '/productos' ? "#00BF9C" : '#6B7280'} /></div><div className={menu ? "block font-semibold" : "hidden"}>Productos</div>
                            </a>
                        </li>
                        <li className="li-nav-aside">
                            <a
                                className={`flex ${menu ? 'justify-start' : 'justify-center'} hover:bg-gray-200 items-start gap-1 text-black rounded-xl no-underline p-3 text-sm 2xl:text-base ${pathname == "/inventario" ? "bg-white hover:bg-white" : "bg-transparent text-gray-500"
                                    }`}
                                href={"/inventario"}
                            >
                                <div><Archive size={20} color={pathname == '/inventario' ? "#00BF9C" : '#6B7280'} /></div><div className={menu ? "block font-semibold" : "hidden"}>Inventario</div>
                            </a>
                        </li>
                        <li className="li-nav-aside">
                            <a
                                className={`flex ${menu ? 'justify-start' : 'justify-center'} hover:bg-gray-200 items-center gap-1 text-black rounded-xl no-underline p-3 text-sm 2xl:text-base ${pathname == "/ventas" ? "bg-white hover:bg-white" : "bg-transparent text-gray-500"
                                    }`}
                                href={"/ventas"}
                            >
                                <div><CircleDollarSign size={20} color={pathname == '/ventas' ? "#00BF9C" : '#6B7280'} /></div><div className={menu ? "block font-semibold" : "hidden"}>Venta</div>
                            </a>
                        </li>
                        <li className="li-nav-aside">
                            <a className={`flex ${menu ? 'justify-start' : 'justify-center'} hover:bg-gray-200 items-center gap-1 text-black rounded-xl no-underline p-3 text-sm 2xl:text-base ${pathname == "/historial" ? "bg-white hover:bg-white" : "bg-transparent text-gray-500"
                                }`}
                                href={"/historial"}
                            >
                                <div><GalleryVerticalEnd size={20} color={pathname == '/historial' ? "#00BF9C" : '#6B7280'} /></div><div className={menu ? "block font-semibold" : "hidden"}>Historial</div>
                            </a>
                        </li>
                    </ul>
                    <div className={`${menu ? "flex" : "hidden"} flex md:hidden flex-col justify-center items-start py-4`}>
                        <div className="flex w-full flex-col items-center gap-4 justify-between">
                            <div className="flex flex-col justify-center items-center gap-1">
                                <div className="w-[40px] h-[40px] bg-[#dedede] rounded-full object-cover">
                                    <Image
                                        className="w-full object-cover"
                                        src="/user.png"
                                        alt="Logo coffee sena"
                                        height={40}
                                        width={40}
                                    />
                                </div>
                                <div className="font-semibold">Admin</div>
                            </div>
                            <div className="p-2 rounded-lg cursor-pointer transition-all duration-150 ml-1 text-center bg-red-500 text-white flex items-center justify-center gap-2 text-sm font-semibold overflow-hidden whitespace-nowrap">
                                <a className="logout-span" href="/auth"> <ArrowRightFromLine size={24}/></a>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            <div className="hidden md:flex flex-col justify-center items-start">
                <div className="flex w-full flex-col items-center gap-4 justify-between">
                    <div className="flex flex-col justify-center items-center gap-1">
                        <div className="w-[40px] h-[40px] bg-[#dedede] rounded-full object-cover">
                            <Image
                                className="w-full object-cover"
                                src="/user.png"
                                alt="Logo coffee sena"
                                height={40}
                                width={40}
                            />
                        </div>
                        <div className="font-semibold">Admin</div>
                    </div>
                    <div className="p-2 rounded-lg cursor-pointer transition-all duration-150 ml-1 text-center bg-red-500 text-white flex items-center justify-center gap-2 text-sm font-semibold overflow-hidden whitespace-nowrap">
                        <a className="logout-span" href="/auth"> <ArrowRightFromLine size={24} className={menu ? "hidden" : "block"} />{menu ? 'Cerrar sesión' : ''}</a>
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default Aside;
