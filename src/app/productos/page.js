'use client'
import Aside from "@/components/aside";
import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";
import DataTable from 'react-data-table-component';
import { dataInventory, columsProducts } from "@/utils/tables";
import { CirclePlus, Hash, ShoppingCart, GanttChart, Layers3, DollarSign, X } from "lucide-react";

export default function Page() {
    const [firstData, setFirstData] = useState([]);
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addProduct, setAddProduct] = useState(false)

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/v1/products")
            .then(response => response.json())
            .then(data => {
                console.log(data.data);
                const productos = data.data.map(producto => ({
                    'codigo': producto.PROD_COD,
                    'nombre': producto.PROD_NOM,
                    'desc': producto.PROD_DESC,
                    'categoria': producto.Categoria.Nom_Cat,
                    'precio': producto.PROD_PREC,
                    'acciones': <div className="p-2">
                        <a key={producto.PROD_ID} className="bg-sky-500 p-2 rounded-lg text-white" href={`/productos/${producto.Id_Cur}`}>Editar</a>
                    </div>
                }));
                setRecords(productos)
                setFirstData(productos)
                setLoading(false)
            });

        fetch('http://localhost:3000/api/v1/categories')
            .then(response => response.json())
            .then(response => {
                setCategories(response.data)
            })
    }, []);

    const paginationComponentOptions = {
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
    };

    const showFormAddProduct = () => {
        setAddProduct(true);
    }
    const removeFormAddProduct = () => {
        setAddProduct(false);
    }


    const fetchAddProduct = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/api/v1/products/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiI2c3NheWNsdjhodzJpbiIsIk5vbV9Vc2VyIjoiU3RldmVuIiwiQXBlX1VzZXIiOiJHb256YWxleiIsIkVtYV9Vc2VyIjoic3RldmVuQGdtYWlsLmNvbSIsIklkX1JvbF9GSyI6MX0sImlhdCI6MTcxMzc3MzE3MCwiZXhwIjoxNzEzODU5NTcwfQ.8-SG7iin46K7NHUYcNoPrrvz73109AoF0bc_MIF27RQ'
            },
            body: JSON.stringify({
                'PROD_COD': document.getElementById('PROD_COD').value,
                'PROD_NOM': document.getElementById('PROD_NOM').value,
                'PROD_DESC': document.getElementById('PROD_DESC').value,
                'CAT_ID_FK': document.getElementById('CAT_ID_FK').value,
                'PROD_PREC': document.getElementById('PROD_PREC').value
            })
        })
            .then(response => response.json())
            .then(response => {
                if (response.type === 'success') {
                    setAddProduct(false);
                }
            })
    }

    return (
        <main className='flex flex-col md:flex-row overflow-y-hidden'>
            <Aside />
            <div className={`flex ${addProduct ? 'scale-100 opacity-1' : 'scale-0 opacity-0'} transition-all duration-150 justify-center items-center w-screen h-screen absolute z-[1000000000000000] bg-gray-500 bg-opacity-50 backdrop-blur-sm`}>
                <form onSubmit={fetchAddProduct} className="w-[450px] bg-white h-[450px] rounded-xl p-3 flex flex-col items-center relative">
                    <div onClick={removeFormAddProduct} className="cursor-pointer absolute top-3 right-5 bg-red-500 rounded-full p-1"><X size={20} color="white" /></div>
                    <h6 className="text-center text-lg font-black uppercase">Agregar producto</h6>
                    <div className="w-full flex flex-col items-center gap-3 justify-center h-full">
                        <div className="flex flex-col justify-center w-4/5">
                            <label className="text-sm font-semibold flex items-center gap-1"><Hash size={16} /> Código del producto</label>
                            <input id="PROD_COD" name="PROD_COD" placeholder="26GY7L" type="text" className=" rounded-md py-1 px-2 border border-1 border-gray-500" />
                        </div>
                        <div className="flex flex-col justify-center w-4/5">
                            <label className="text-sm font-semibold flex items-center gap-1"><ShoppingCart size={16} />Nombre del producto</label>
                            <input id="PROD_NOM" name="PROD_NOM" placeholder="Coca-cola" type="text" className=" rounded-md py-1 px-2 border border-1 border-gray-500" />
                        </div>
                        <div className="flex flex-col justify-center w-4/5">
                            <label className="text-sm font-semibold flex items-center gap-1"><GanttChart size={16} />Descripción del producto</label>
                            <input id="PROD_DESC" name="PROD_DESC" placeholder="250ml sin azucar" type="text" className="rounded-md py-1 px-2 border border-1 border-gray-500" />
                        </div>
                        <div className="flex flex-col justify-center w-4/5">
                            <label className="text-sm font-semibold flex items-center gap-1"><DollarSign size={16} /> Precio del producto</label>
                            <input id="PROD_PREC" name="PROD_PREC" placeholder="$ 2.500" type="number" className="rounded-md py-1 px-2 border border-1 border-gray-500" />
                        </div>
                        <div className="flex flex-col justify-center w-4/5">
                            <label className="text-sm font-semibold flex items-center gap-1"><Layers3 size={16} />Categoría del producto</label>
                            <select id="CAT_ID_FK" name="CAT_ID_FK" className="rounded-md py-1 px-2 border border-1 border-gray-500">
                                {categories.map(category => {
                                    return <option key={category.Id_Cat} value={category.Id_Cat}>{category.Nom_Cat}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="bg-transparent py-2 px-3 rounded-xl text-black font-semibold border-2 border-black transition-all duration-150 hover:text-white hover:bg-black text-sm">Aceptar</button>
                </form>
            </div>
            <div className="w-full p-6 ml-0 md:ml-[150px] 2xl:ml-[200px] mt-[80px] md:mt-0">
                <div className="overflow-auto">
                    <div className="flex items-center justify-between w-full flex-col sm:flex-row gap-4">
                        <h3 className="font-semibold text-xl">Productos</h3>
                        <button onClick={showFormAddProduct} className="bg-[#00BF9C] text-white p-2 rounded-md flex items-center gap-2 text-sm"><CirclePlus /> Agregar producto</button>
                    </div>
                    <hr className="mt-4" />
                    <div className="my-4 w-full max-h-screen flex flex-col justify-between gap-4 overflow-auto">
                        <div className="w-full bg-gray-100 rounded-lg p-2 px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
                            <div className="flex gap-2 items-center">
                                <label className="text-sm">Buscar:</label>
                                <input type="text" placeholder="Coca-cola 400ml" className="text-sm border border-1 border-gray-300 rounded-lg p-2" />
                            </div>
                            <div>
                                <p className="text-sm">Resultados encontrados: {records.length}</p>
                            </div>
                        </div>
                        <div className="bg-gray-100 p-2 rounded-lg overflow-auto flex-1">
                            {/* <h3 className="font-bold text-lg m-2">Productos</h3> */}
                            <DataTable
                                columns={columsProducts}
                                data={records}
                                pagination
                                paginationComponentOptions={paginationComponentOptions}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
