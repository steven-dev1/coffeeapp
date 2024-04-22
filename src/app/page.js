'use client'
import React from "react";
import { useState, useEffect } from "react";
import Aside from "../components/aside";
import Image from "next/image";
import DataTable from 'react-data-table-component';
import { dataHome, columsHome } from "@/utils/tables";
import { CalendarFold } from "lucide-react";
import Pies from "@/components/stats";

function Page() {
    const [products, setProducts] = useState([]);

    const paginationComponentOptions = {
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
    };

    useEffect(() => {
        fetch("http://localhost:3000/api/v1/products")
            .then(response => response.json())
            .then(data => setProducts(data.data));
    }, []);

    const date = new Date();

    return (
        <main className="flex flex-col md:flex-row overflow-y-hidden">
            {/* <Header title={"Inicio"} fecha={"29 Feb"} /> */}
            <Aside />
            <div className="w-full p-6 ml-0 md:ml-[150px] 2xl:ml-[200px] mt-[80px] md:mt-0">
                <div>
                    <div className="flex items-center justify-between px-4">
                        <h3 className="font-semibold text-xl">Inicio</h3>
                        <div className="flex items-center gap-2">
                            <CalendarFold size={20}/> {date.toLocaleDateString()}
                        </div>
                    </div>
                    <div className="my-4 w-full max-h-screen flex flex-col lg:flex-row justify-between gap-4 overflow-auto">
                        <div className="bg-gray-100 p-2 rounded-lg overflow-auto flex-1">
                            <h3 className="font-bold text-lg m-2">Ordenes recientes</h3>
                            <DataTable
                                columns={columsHome}
                                data={dataHome}
                                pagination
                                paginationComponentOptions={paginationComponentOptions}
                            />
                        </div>
                        <div className="flex flex-row lg:flex-col gap-2 justify-between">
                            <div className="bg-gray-100 p-2 rounded-lg overflow-auto lg:max-w-[350px]">
                                <h3 className="font-bold text-lg m-2">Estadísticas</h3>
                                <Pies />
                            </div>
                            <div className="bg-gray-100 p-2 rounded-lg overflow-auto lg:max-w-[350px]">
                                <h3 className="font-bold text-lg m-2">Populares hoy</h3>
                                <Pies />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Page;
