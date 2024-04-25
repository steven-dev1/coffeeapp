"use client";
import React from "react";
import { useState, useEffect } from "react";
import Aside from "../components/aside";
import Image from "next/image";
import DataTable from "react-data-table-component";
import { dataHome, columsHome, columsPopular } from "@/utils/tables";
import { CalendarFold } from "lucide-react";
import Pies from "@/components/stats";
import { getCookie } from "cookies-next";
import base64url from "base64url";

function Page() {
    const [products, setProducts] = useState([]);
    const [dataPopular, setDataPopular] = useState([]);


    const paginationComponentOptions = {
        rowsPerPageText: "Filas por página",
        rangeSeparatorText: "de",
        selectAllRowsItem: true,
        selectAllRowsItemText: "Todos",
    };

    const token = getCookie('sessionToken')
    useEffect(() => {
        fetch("http://localhost:3000/api/v1/headers/type/1", {
            headers: {
                Authorization:
                    "Bearer " +
                    token,
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.data);
                const encabezados = data.data.map(enc => ({
                    nombre: enc.Usuario.Nom_User + " " + enc.Usuario.Ape_User,
                    metodo: enc.MET_PAGO == 1 ? "Efectivo" : "PSE",
                    tipo:   enc.TIPO_ENCABE == 1 ? "Compra" : "Venta",
                    fecha: enc.FECH_ENC,
                    total: enc.TOTAL,
                }));
                
                
                setProducts(encabezados);
            });
        fetch("http://localhost:3000/api/v1/details", {
            headers: {
                Authorization:
                    "Bearer " +
                    token,
            },
        })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                const popularData = response.data.map(deta => ({
                    product: deta.Producto.PROD_NOM,
                    price: `$ ${parseFloat(deta.Producto.PROD_PREC).toFixed(2)}`,
                }));
                setDataPopular(popularData);
            });
    }, []);

    const date = new Date();

    function parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return console.log(JSON.parse(jsonPayload));
    }

    return (
        <main className="flex flex-col lg:flex-row overflow-y-hidden">
            <Aside />
            <div className="w-full p-6 ml-0 lg:ml-[200px] 2xl:ml-[200px] mt-[80px] lg:mt-0">
                <div>
                    <div className="flex items-center justify-between px-4">
                        <h3 className="font-semibold text-xl">Inicio</h3>
                        <div className="flex items-center gap-2">
                            <CalendarFold size={20} />{" "}
                            {date.toLocaleDateString()}
                            <button onClick={parseJwt(token)}>Prueba</button>
                        </div>
                    </div>
                    <div className="my-4 w-full max-h-screen flex flex-col lg:flex-row justify-between gap-4 overflow-auto">
                        <div className="bg-gray-100 p-2 rounded-lg overflow-auto flex-1">
                            <h3 className="font-bold text-lg m-2">
                                Ordenes recientes
                            </h3>
                            <DataTable
                                columns={columsHome}
                                data={products}
                                pagination
                                paginationComponentOptions={
                                    paginationComponentOptions
                                }
                            />
                        </div>
                        <div className="flex flex-row lg:flex-col gap-2 justify-between">
                            <div className="bg-gray-100 p-2 rounded-lg overflow-auto lg:max-w-[350px]">
                                <h3 className="font-bold text-lg m-2">
                                    Estadísticas
                                </h3>
                                <Pies />
                            </div>
                            <div className="bg-gray-100 p-2 rounded-lg overflow-auto lg:max-w-[350px] flex flex-col justify-center items-center">
                                <h3 className="font-bold text-lg m-2">
                                    Populares hoy
                                </h3>
                                <DataTable
                                    columns={columsPopular}
                                    data={dataPopular}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Page;
