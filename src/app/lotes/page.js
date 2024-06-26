"use client";
import Aside from "@/components/aside";
import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { columsLotes } from "@/utils/tables";
import { getCookie } from "cookies-next";
import {
    CirclePlus,
    Hash,
    ShoppingCart,
    GanttChart,
    Layers3,
    DollarSign,
    X,
    Trash2,
    Truck,
    QrCode,
    CalendarPlus,
    CalendarOff,
} from "lucide-react";
import Spinner from "@/components/Spinner/Spinner";

export default function Page() {
    const [firstData, setFirstData] = useState([]);
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addProduct, setAddProduct] = useState(false);
    const [editProduct, setEditProduct] = useState(false);
    const [formEdit, setFormEdit] = useState([]);

    const token = getCookie('sessionToken')

    const [categories, setCategories] = useState([]);

    const eliminarProducto = e => {
        const confirmar = confirm('¿Estás seguro que quieres eliminar este producto?')
        if (confirmar) {
            try {
                fetch(
                    `http://localhost:3000/api/v1/lotes/delete/${e.target.value}`,
                    {
                        method: "DELETE",
                        headers: {
                            Authorization:
                                "Bearer " + token,
                        },
                    }
                );
                // location.reload()
            } catch (e) {
                console.log(e);
            }
        } else {
            alert('Cancelaste la accion')
        }
    };

    const fetchEditar = e => {
        try {
            fetch(`http://localhost:3000/api/v1/lotes/${e.target.value}`,{
                method: 'GET',
                headers: {
                    Authorization: 'Bearer '+ token
                }
            })
                .then(response => response.json())
                .then(response => {
                    console.log(response.data);
                    setFormEdit(response.data);
                });
            setEditProduct(true);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        setLoading(true)
        fetch("http://localhost:3000/api/v1/lotes", {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.data);
                const productos = data.data.map(lote => ({
                    codigo: lote.COD_LOTE,
                    fecha_reci: lote.FEC_REC,
                    fecha_venc: lote.FEC_VENC,
                    editar: (
                        <div className="p-2">
                            <button
                                key={lote.ID_LOTE}
                                value={lote.ID_LOTE}
                                className="bg-sky-500 p-2 rounded-lg text-white"
                                onClick={fetchEditar}
                            >
                                Editar
                            </button>
                        </div>
                    ),
                    eliminar: (
                        <div className="p-2">
                            <button
                                key={lote.ID_LOTE}
                                value={lote.ID_LOTE}
                                className="bg-red-500 p-2 rounded-lg text-white"
                                onClick={eliminarProducto}
                            >
                                Eliminar
                            </button>
                        </div>
                    ),
                }));
                setRecords(productos);
                setFirstData(productos);
                setLoading(false);
            });
    }, []);

    const paginationComponentOptions = {
        rowsPerPageText: "Filas por página",
        rangeSeparatorText: "de",
        selectAllRowsItem: true,
        selectAllRowsItemText: "Todos",
    };

    const showFormAddProduct = () => {
        setAddProduct(true);
    };
    const removeFormAddProduct = () => {
        setAddProduct(false);
    };

    const showFormEditProduct = () => {
        setEditProduct(true);
    };
    const removeFormEditProduct = () => {
        setEditProduct(false);
    };

    const fetchAddLote = e => {
        e.preventDefault();
        fetch("http://localhost:3000/api/v1/lotes/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization:
                    "Bearer " + token,
            },
            body: JSON.stringify({
                COD_LOTE: document.getElementById("COD_LOTE").value,
                FEC_REC: document.getElementById("FEC_REC").value,
                FEC_VENC: document.getElementById("FEC_VENC").value,
            }),
        })
            .then(response => response.json())
            .then(response => {
                if (response.type === "success") {
                    setAddProduct(false);
                    location.reload();
                }
            });
    };

    const fetchEditLote = e => {
        e.preventDefault();
        fetch(
            `http://localhost:3000/api/v1/lotes/update/${e.target.value}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization:
                        "Bearer " + token,
                },
                body: JSON.stringify({
                    FEC_REC: document.getElementById("FEC_REC_edit").value,
                    FEC_VENC: document.getElementById("FEC_VENC_edit").value,
                }),
            }
        )
            .then(response => response.json())
            .then(response => {
                if (response.type === "success") {
                    location.reload()
                    setEditProduct(false);
                }
            });
    };

    const handleChange = (e) => {
        const filteredRecords = firstData.filter(record => {
            return record.codigo.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setRecords(filteredRecords)
    }

    return (
        <main className="flex flex-col lg:flex-row overflow-y-hidden">
            <Aside />
            {/* FORM AGREGAR */}
            <div
                className={`flex ${addProduct ? "scale-100 opacity-1" : "scale-0 opacity-0"
                    } transition-all duration-150 justify-center items-center w-screen h-screen absolute z-[1000000000000000] bg-gray-500 bg-opacity-50 backdrop-blur-sm`}
            >
                <form
                    onSubmit={fetchAddLote}
                    className="w-[450px] bg-white h-[450px] rounded-xl p-3 flex flex-col items-center relative"
                >
                    <div
                        onClick={removeFormAddProduct}
                        className="cursor-pointer absolute top-3 right-5 bg-red-500 rounded-full p-1"
                    >
                        <X size={20} color="white" />
                    </div>
                    <h6 className="text-center text-lg font-black uppercase">
                        Crear lote
                    </h6>
                    <div className="w-full flex flex-col items-center gap-3 justify-center h-full">
                        <div className="flex flex-col justify-center w-4/5">
                            <label className="text-sm font-semibold flex items-center gap-1">
                                <QrCode size={16} /> Código del lote
                            </label>
                            <input
                                id="COD_LOTE"
                                name="COD_LOTE"
                                placeholder="5FG5HF"
                                type="text"
                                className=" rounded-md py-1 px-2 border border-1 border-gray-500"
                            />
                        </div>
                        <div className="flex flex-col justify-center w-4/5">
                            <label className="text-sm font-semibold flex items-center gap-1">
                                <CalendarPlus size={16} />
                                Fecha de recibimiento
                            </label>
                            <input
                                id="FEC_REC"
                                name="FEC_REC"
                                type="date"
                                className=" rounded-md py-1 px-2 border border-1 border-gray-500"
                            />
                        </div>
                        <div className="flex flex-col justify-center w-4/5">
                            <label className="text-sm font-semibold flex items-center gap-1">
                                <CalendarOff size={16} />
                                Fecha de vencimiento
                            </label>
                            <input
                                id="FEC_VENC"
                                name="FEC_VENC"
                                type="date"
                                className=" rounded-md py-1 px-2 border border-1 border-gray-500"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="bg-transparent py-2 px-3 rounded-xl text-black font-semibold border-2 border-black transition-all duration-150 hover:text-white hover:bg-black text-sm"
                    >
                        Aceptar
                    </button>
                </form>
            </div>
            {/* FORM EDITAR */}
            <div
                className={`flex ${editProduct ? "scale-100 opacity-1" : "scale-0 opacity-0"
                    } transition-all duration-150 justify-center items-center w-screen h-screen absolute z-[1000000000000000] bg-gray-500 bg-opacity-50 backdrop-blur-sm`}
            >
                <form className="w-[450px] bg-white h-[450px] rounded-xl p-3 flex flex-col items-center relative">
                    <div
                        onClick={removeFormEditProduct}
                        className="cursor-pointer absolute top-3 right-5 bg-red-500 rounded-full p-1"
                    >
                        <X size={20} color="white" />
                    </div>
                    <h6 className="text-center text-lg font-black uppercase">
                        Editar lote
                    </h6>
                    <div className="w-full flex flex-col items-center gap-3 justify-center h-full">
                        <div className="flex flex-col justify-center w-4/5">
                            <label className="text-sm font-semibold flex items-center gap-1">
                                <CalendarPlus size={16} />
                                Fecha de recibimiento
                            </label>
                            <input
                                id="FEC_REC_edit"
                                name="FEC_REC_edit"
                                type="date"
                                className=" rounded-md py-1 px-2 border border-1 border-gray-500"
                                defaultValue={formEdit.FEC_REC}
                            />
                        </div>
                        <div className="flex flex-col justify-center w-4/5">
                            <label className="text-sm font-semibold flex items-center gap-1">
                                <CalendarOff size={16} />
                                Fecha de vencimiento
                            </label>
                            <input
                                id="FEC_VENC_edit"
                                name="FEC_VENC_edit"
                                type="date"
                                className=" rounded-md py-1 px-2 border border-1 border-gray-500"
                                defaultValue={formEdit.FEC_VENC}
                            />
                        </div>
                    </div>
                    <button
                        value={formEdit.ID_LOTE}
                        type="submit"
                        className="bg-transparent py-2 px-3 rounded-xl text-black font-semibold border-2 border-black transition-all duration-150 hover:text-white hover:bg-black text-sm"
                        onClick={fetchEditLote}
                    >
                        Aceptar
                    </button>
                </form>
            </div>
            <div className="w-full p-6 ml-0 lg:ml-[200px] 2xl:ml-[200px] mt-[80px] lg:mt-0">
                <div className="overflow-auto">
                    <div className="flex items-center justify-between w-full flex-col sm:flex-row gap-4">
                        <h3 className="font-bold text-xl">Lotes</h3>
                        <button
                            onClick={showFormAddProduct}
                            className="bg-sky-500 text-white p-2 rounded-md flex items-center gap-2 text-sm"
                        >
                            <CirclePlus /> Crear lote
                        </button>
                    </div>
                    <hr className="mt-4" />
                    <div className="my-4 w-full max-h-screen flex flex-col justify-between gap-4 overflow-auto">
                        <div className="w-full bg-gray-100 rounded-lg p-2 px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
                            <div className="flex gap-2 items-center">
                                <label className="text-sm">Buscar:</label>
                                <input
                                    type="text"
                                    placeholder="5FGH67"
                                    className="text-sm border border-1 border-gray-300 rounded-lg p-2"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <p className="text-sm">
                                    Resultados encontrados: {records.length}
                                </p>
                            </div>
                        </div>
                        <div className="bg-gray-100 p-2 rounded-lg overflow-auto flex flex-col justify-center items-center w-full">
                            {/* <h3 className="font-bold text-lg m-2">Productos</h3> */}
                            <DataTable
                                columns={columsLotes}
                                data={records}
                                pagination
                                paginationComponentOptions={
                                    paginationComponentOptions
                                }
                                noDataComponent={<div className="text-red-700 font-semibold py-3">No se encontraron resultados</div>}
                                progressPending={loading}
                                progressComponent={<Spinner />}
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