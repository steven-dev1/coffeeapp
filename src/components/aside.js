'use client'
import { useState, } from "react";
import Link from "next/link";
import { Menu, X, Bolt, Home, ScanBarcode, Archive, CircleDollarSign, GalleryVerticalEnd, ShoppingCart, Truck } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";

function Aside() {
    const [menu, setMenu] = useState(true);
    const pathname = usePathname();

    const toggleMenu = () => {
        setMenu(!menu);
    };
    return (
        <aside className={`${menu ? "h-auto lg:h-screen lg:max-h-screen max-h-[100px] max-w-full w-full lg:max-w-[200px] lg:min-w-[200px] 2xl:min-w-[200px] 2xl:max-w-[200px]" : "max-w-full w-full lg:min-w-[90px] lg:max-w-[90px] h-auto max-h-[100px] lg:h-screen md:max-h-screen 2xl:max-w-[110px] 2xl:min-w-[110px]"} z-[100000] fixed left-0 bg-sky-500 lg:flex lg:flex-col flex-row justify-evenly md:justify-between items-center py-2 transition-all duration-150`}>
            <div className="flex flex-row lg:flex-col justify-between lg:justify-center items-center w-full">
                <div className="p-2 cursor-pointer z-[100]" onClick={toggleMenu}>
                    <div className="p-1 bg-sky-600 rounded-full">{menu ? <X color="white" /> : <Menu color="white" />}</div>
                </div>
                <div className="px-4 py-1 lg:p-4 overflow-hidden whitespace-nowrap flex flex-col items-center z-[100]">
                    <Image
                        className="img-aside"
                        src="/logo-coffeesena.png"
                        alt="Logo coffee sena"
                        width={50}
                        height={50}
                    />
                </div>
                <nav className={`${menu ? "w-2/4 lg:w-full p-0" : "w-0 lg:w-full p-0"} flex flex-col justify-between absolute top-0 pt-[96px] z-50 left-0 lg:relative transition-all duration-150 bg-sky-500 mx-auto lg:block  lg:p-0 lg:bg-transparent h-screen lg:h-auto`}>
                    <ul className={`${menu ? "flex" : "hidden lg:flex"} flex-col gap-2 list-none w-full justify-between h-full`}>
                        <li className="transition-all duration-150 cursor-pointer">
                            <a
                                className={`flex ${menu ? 'justify-start' : 'justify-center'} transition-all duration-100 items-center gap-1 text-black no-underline py-3 px-6 text-sm 2xl:text-base ${pathname == "/" ? "bg-white hover:bg-white" : "hover:bg-sky-600 text-white"
                                    }`}
                                href={"/"}
                            >
                                <div><Home size={20} color={pathname == '/' ? "#0ea5e9" : 'white'} /></div><div className={menu ? "block font-semibold" : "hidden"}>Inicio</div>
                            </a>
                        </li>
                        <li className="rounded-lg transition-all duration-150 cursor-pointer">
                            <a
                                className={`flex ${menu ? 'justify-start' : 'justify-center'} transition-all duration-100 items-center gap-1 text-black no-underline py-3 px-6 text-sm 2xl:text-base ${pathname == "/productos" ? "bg-white hover:bg-white" : "hover:bg-sky-600 text-white"
                                    }`}
                                href={"/productos"}
                            >
                                <div><ShoppingCart size={20} color={pathname == '/productos' ? "#0ea5e9" : 'white'} /></div><div className={menu ? "block font-semibold" : "hidden"}>Productos</div>
                            </a>
                        </li>
                        <li className="rounded-lg transition-all duration-150 cursor-pointer">
                            <a
                                className={`flex ${menu ? 'justify-start' : 'justify-center'} transition-all duration-100 items-center gap-1 text-black no-underline py-3 px-6 text-sm 2xl:text-base ${pathname == "/proveedores" ? "bg-white hover:bg-white" : "hover:bg-sky-600 text-white"
                                    }`}
                                href={"/proveedores"}
                            >
                                <div><Truck size={20} color={pathname == '/proveedores' ? "#0ea5e9" : 'white'} /></div><div className={menu ? "block font-semibold" : "hidden"}>Proveedores</div>
                            </a>
                        </li>
                        <li className="li-nav-aside">
                            <a
                                className={`flex ${menu ? 'justify-start' : 'justify-center'} transition-all duration-100 items-start gap-1 text-black no-underline py-3 px-6 text-sm 2xl:text-base ${pathname == "/inventario" ? "bg-white hover:bg-white" : "hover:bg-sky-600 text-white"
                                    }`}
                                href={"/inventario"}
                            >
                                <div><Archive size={20} color={pathname == '/inventario' ? "#0ea5e9" : 'white'} /></div><div className={menu ? "block font-semibold" : "hidden"}>Inventario</div>
                            </a>
                        </li>
                        <li className="li-nav-aside">
                            <a className={`flex ${menu ? 'justify-start' : 'justify-center'} transition-all duration-100 items-center gap-1 text-black no-underline py-3 px-6 text-sm 2xl:text-base ${pathname == "/historial" ? "bg-white hover:bg-white" : "hover:bg-sky-600 text-white"
                                }`}
                                href={"/historial"}
                            >
                                <div><ScanBarcode size={20} color={pathname == '/historial' ? "#0ea5e9" : 'white'} /></div><div className={menu ? "block font-semibold" : "hidden"}>Compras</div>
                            </a>
                        </li>
                        <li className="li-nav-aside">
                            <a
                                className={`flex ${menu ? 'justify-start' : 'justify-center'} transition-all duration-100 items-center gap-1 text-black no-underline py-3 px-6 text-sm 2xl:text-base ${pathname == "/ventas" ? "bg-white hover:bg-white" : "hover:bg-sky-600 text-white"
                                    }`}
                                href={"/ventas"}
                            >
                                <div><CircleDollarSign size={20} color={pathname == '/ventas' ? "#0ea5e9" : 'white'} /></div><div className={menu ? "block font-semibold" : "hidden"}>Venta</div>
                            </a>
                        </li>
                        <li className="li-nav-aside">
                            <a
                                className={`flex ${menu ? 'justify-start' : 'justify-center'} transition-all duration-100 items-center gap-1 text-black no-underline py-3 px-6 text-sm 2xl:text-base ${pathname == "/ventas" ? "bg-white hover:bg-white" : "hover:bg-sky-600 text-white"
                                    }`}
                                href={"/ventas"}
                            >
                                <div><Bolt size={20} color={pathname == '/ventas' ? "#0ea5e9" : 'white'} /></div><div className={menu ? "block font-semibold" : "hidden"}>Configuración</div>
                            </a>
                        </li>
                    </ul>
                    <div>
                        <div>Admin</div>
                    </div>
                </nav>
            </div>
        </aside>
    );
}

export default Aside;
