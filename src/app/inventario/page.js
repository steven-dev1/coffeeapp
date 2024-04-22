'use client'
import Aside from "@/components/aside";
import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";
import DataTable from 'react-data-table-component';
import { dataInventory, columsInventory } from "@/utils/tables";
import { CirclePlus } from "lucide-react";
import Pies from "@/components/stats";

function Page() {
    const [products, setProducts] = useState([]);

    // useEffect(() => {
    //     fetch("http://localhost:3000/api/v1/products")
    //         .then(response => response.json())
    //         .then(data => setProducts(data.data));
    // }, []);

    const paginationComponentOptions = {
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
    };

    return (
        <main className="flex flex-col md:flex-row overflow-y-hidden">
            {/* <Header title={"Inicio"} fecha={"29 Feb"} /> */}
            <Aside />
            <div className="w-full p-6 ml-0 md:ml-[150px] 2xl:ml-[200px] mt-[80px] md:mt-0">
                <div className="overflow-auto">
                    <div className="flex items-center justify-between w-full flex-col sm:flex-row gap-4">
                        <h3 className="font-semibold text-xl">Inventario</h3>
                        <div className="flex items-center gap-2 w-full justify-between sm:justify-end">
                            <button className="bg-[#00BF9C] text-white p-2 rounded-md flex items-center gap-2 text-sm"><CirclePlus /> Agregar producto</button>
                            <input type="date" />
                        </div>
                    </div>
                    <hr className="mt-4" />
                    <div className="my-4 w-full max-h-screen flex flex-col justify-between gap-4 overflow-auto">
                        <div className="w-full bg-gray-100 rounded-lg p-2 px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
                            <div className="flex gap-2 items-center">
                                <label className="text-sm">Buscar:</label>
                                <input type="text" placeholder="Coca-cola 400ml" className="text-sm border border-1 border-gray-300 rounded-lg p-2" />
                            </div>
                            <div>
                                <p className="text-sm">Resultados encontrados: {dataInventory.length}</p>
                            </div>
                        </div>
                        <div className="bg-gray-100 p-2 rounded-lg overflow-auto flex-1">
                            {/* <h3 className="font-bold text-lg m-2">Productos</h3> */}
                            <DataTable
                                columns={columsInventory}
                                data={dataInventory}
                                pagination
                                paginationComponentOptions={paginationComponentOptions}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Page;
