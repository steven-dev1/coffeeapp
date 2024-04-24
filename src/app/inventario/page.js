'use client'
import Aside from "@/components/aside";
import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";
import DataTable from 'react-data-table-component';
import { dataInventory, columsInventory } from "@/utils/tables";
import { CirclePlus } from "lucide-react";
import Pies from "@/components/stats";
import Spinner from "@/components/Spinner/Spinner";

function Page() {
    const [loading, setLoading] = useState(false);

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

    const handleChange = (e) => {
        const filteredRecords = firstData.filter(record => {
            return record.names.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setRecords(filteredRecords)
    }

    return (
        <main className="flex flex-col md:flex-row overflow-y-hidden">
            {/* <Header title={"Inicio"} fecha={"29 Feb"} /> */}
            <Aside />
            <div className="w-full p-6 ml-0 md:ml-[200px] 2xl:ml-[200px] mt-[80px] md:mt-0">
                <div className="overflow-auto">
                    <div className="flex items-center justify-between w-full flex-col sm:flex-row gap-4">
                        <h3 className="font-semibold text-xl">Inventario</h3>
                        <div className="flex items-center gap-2 w-full justify-between sm:justify-end">
                            {/* <button className="bg-[#00BF9C] text-white p-2 rounded-md flex items-center gap-2 text-sm"><CirclePlus /> Agregar producto</button> */}
                            <input type="date" />
                        </div>
                    </div>
                    <hr className="mt-4" />
                    <div className="my-4 w-full max-h-screen flex flex-col justify-between gap-4 overflow-auto">
                        <div className="w-full bg-gray-100 rounded-lg p-2 px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
                            <div className="flex gap-2 items-center">
                                <label className="text-sm">Buscar:</label>
                                <input type="text" placeholder="Coca-cola 400ml" className="text-sm border border-1 border-gray-300 rounded-lg p-2" onChange={handleChange}/>
                            </div>
                            <div>
                                <p className="text-sm">Resultados encontrados: {dataInventory.length}</p>
                            </div>
                        </div>
                        <div className="bg-gray-100 p-2 rounded-lg overflow-auto flex flex-col justify-center items-center">
                            {/* <h3 className="font-bold text-lg m-2">Productos</h3> */}
                            <DataTable
                                columns={columsInventory}
                                data={dataInventory}
                                pagination
                                paginationComponentOptions={paginationComponentOptions}
                                progressPending={loading}
                                progressComponent={<Spinner/>}
                                customStyles={{
                                    headCells: {
                                        style: {
                                            backgroundColor: "#0EA5E9",
                                            color: "#fff",
                                        },
                                    },
                                    cells: {
                                        style: {
                                            width: "100%",
                                        },
                                    },
                                    pagination: {
                                        style: {
                                            color: "#000",
                                            backgroundColor: "#f3f4f6",
                                            borderTopStyle: 'solid',
                                            borderTopWidth: '0px',
                                            borderTopColor: "green",
                                        },
                                        pageButtonsStyle: {
                                            color: "#0ea5e9",
                                            fill: "#0ea5e9",
                                            '&:disabled': {
                                                cursor: 'unset',
                                                color: "#D4D4D4",
                                                fill: "#D4D4D4",
                                            },
                                            '&:hover:not(:disabled)': {
                                                backgroundColor: "#B4B4B4",
                                            },
                                            '&:focus': {
                                                outline: 'none',
                                                backgroundColor: "#0ea5e9",
                                            },
                                        }
                                    }
                                }
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Page;
