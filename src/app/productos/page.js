"use client";
import Aside from "@/components/aside";
import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { dataInventory, columsProducts } from "@/utils/tables";
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
} from "lucide-react";
import Spinner from "@/components/Spinner/Spinner";
import toast from "react-hot-toast";

export default function Page() {
    const [firstData, setFirstData] = useState([]);
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addProduct, setAddProduct] = useState(false);
    const [editProduct, setEditProduct] = useState(false);
    const [formEdit, setFormEdit] = useState([]);

    const [categories, setCategories] = useState([]);

    const token = getCookie('sessionToken')

    const eliminarProducto = e => {
        const confirmar = confirm('¿Estás seguro que quieres eliminar este producto?')
        if (confirmar) {
            try {
                fetch(
                    `http://localhost:3000/api/v1/products/delete/${e.target.value}`,
                    {
                        method: "DELETE",
                        headers: {
                            Authorization:
                                "Bearer " +
                                token,
                        },
                    }
                )
                    .then(response => response.json())
                    .then(response => {
                        if (response.code === 403) {
                            toast.error("No puedes eliminar este producto porque tiene proveedores asociados")
                        }
                    })
            } catch (e) {
                console.log(e);
            }
        } else {
            alert('Cancelaste la accion')
        }
    };

    const fetchEditar = e => {
        try {
            fetch(`http://localhost:3000/api/v1/products/${e.target.value}`)
                .then(response => response.json())
                .then(response => {
                    setFormEdit(response.data);
                });
            setEditProduct(true);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        setLoading(true)
        fetch("http://localhost:3000/api/v1/products")
            .then(response => response.json())
            .then(data => {
                const productos = data.data.map(producto => ({
                    codigo: producto.PROD_COD,
                    nombre: producto.PROD_NOM,
                    desc: producto.PROD_DESC,
                    categoria: producto.categoria.Nom_Cat,
                    precio: `$${producto.PROD_PREC}`,
                    editar: (
                        <div className="p-2">
                            <button
                                key={producto.PROD_ID}
                                value={producto.PROD_ID}
                                className="bg-sky-500 p-2 rounded-lg font-semibold text-white hover:bg-sky-600 transition-all duration-200"
                                href={`/productos/${producto.Id_Cur}`}
                                onClick={fetchEditar}
                            >
                                Editar
                            </button>
                        </div>
                    ),
                    eliminar: (
                        <div className="p-2">
                            <button
                                key={producto.PROD_ID}
                                value={producto.PROD_ID}
                                className="bg-red-500 font-semibold p-2 rounded-lg text-white hover:bg-red-600 transition-all duration-200"
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

        fetch("http://localhost:3000/api/v1/categories")
            .then(response => response.json())
            .then(response => {
                setCategories(response.data);
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

    const fetchAddProduct = e => {
        fetch("http://localhost:3000/api/v1/products/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization:
                    "Bearer " + token,
            },
            body: JSON.stringify({
                PROD_COD: document.getElementById("PROD_COD").value,
                PROD_NOM: document.getElementById("PROD_NOM").value,
                PROD_DESC: document.getElementById("PROD_DESC").value,
                CAT_ID_FK: document.getElementById("CAT_ID_FK").value,
                PROD_PREC: document.getElementById("PROD_PREC").value,
                ID_LOTE: document.getElementById("ID_LOTE").value,
                ID_PROV: document.getElementById("ID_PROV").value,
                INV_ID: document.getElementById("INV_ID").value
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

    const fetchEditProduct = e => {
        e.preventDefault();
        fetch(
            `http://localhost:3000/api/v1/products/update/${e.target.value}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization:
                        "Bearer " +
                        token,
                },
                body: JSON.stringify({
                    PROD_COD: document.getElementById("PROD_COD_edit").value,
                    PROD_NOM: document.getElementById("PROD_NOM_edit").value,
                    PROD_DESC: document.getElementById("PROD_DESC_edit").value,
                    CAT_ID_FK: document.getElementById("CAT_ID_FK_edit").value,
                    PROD_PREC: document.getElementById("PROD_PREC_edit").value,
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


    const [lotes, setLotes] = useState([])
    const [inventories, setInventories] = useState([])
    const [proveedores, setProveedores] = useState([])
    useEffect(() => {
        fetch("http://localhost:3000/api/v1/lotes", {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(response => response.json())
            .then(response => {
                setLotes(response.data)
            })

        fetch('http://localhost:3000/api/v1/inventories', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(response => response.json())
            .then(response => {
                setInventories(response.data)
            })

        fetch('http://localhost:3000/api/v1/providers', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(response => response.json())
            .then(response => {
                console.log(response.data)
                setProveedores(response.data)
            })
    }, [])

    // EVENTOS EDITAR
    const [dataEditProduct, setDataEditProduct] = useState({
    })
    const handleChangeCodProducto = (e) => {
        dataEditProduct(prevState => ({
            ...prevState,  // Mantener las propiedades existentes
            PROD_COD: e.target.value
        }))
    }
    const handleChangeNomProducto = (e) => {
        dataEditProduct(prevState => ({
            ...prevState,  // Mantener las propiedades existentes
            PROD_NOM: e.target.value
        }))
    }
    const handleChangeDescProducto = (e) => {
        dataEditProduct(prevState => ({
            ...prevState,  // Mantener las propiedades existentes
            PROD_DESC: e.target.value
        }))
    }
    const handleChangePrecProducto = (e) => {
        dataEditProduct(prevState => ({
            ...prevState,  // Mantener las propiedades existentes
            PROD_PREC: e.target.value
        }))
    }
    const handleChangeCatProducto = (e) => {
        dataEditProduct(prevState => ({
            ...prevState,  // Mantener las propiedades existentes
            CAT_ID_FK: e.target.value
        }))
    }
    const handleChangeLoteProducto = (e) => {
        dataEditProduct(prevState => ({
            ...prevState,  // Mantener las propiedades existentes
            ID_LOTE: e.target.value
        }))
    }
    const handleChangeInvProducto = (e) => {
        dataEditProduct(prevState => ({
            ...prevState,  // Mantener las propiedades existentes
            INV_ID: e.target.value
        }))
    }
    const handleChangeProvProducto = (e) => {
        dataEditProduct(prevState => ({
            ...prevState,  // Mantener las propiedades existentes
            ID_PROV: e.target.value
        }))
    }


    const handleChange = (e) => {
        const filteredRecords = firstData.filter(record => {
            return record.nombre.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setRecords(filteredRecords)
    }

    return (
        <main className="flex flex-col lg:flex-row overflow-y-hidden">
            <Aside />
            {/* FORM AGREGAR */}
            <div
                className={`flex ${addProduct ? "scale-100 opacity-1" : "scale-0 opacity-0"
                    } transition-all duration-150 justify-center items-center w-screen h-screen absolute z-[1000000000000000] bg-gray-900 bg-opacity-50 backdrop-blur-3xl`}
            >
                <form
                    onSubmit={fetchAddProduct}
                    className="min-w-[450px] bg-white min-h-[450px] rounded-xl p-3 flex flex-col items-center justify-between relative"
                >
                    <div
                        onClick={removeFormAddProduct}
                        className="cursor-pointer absolute top-3 right-5 bg-red-500 rounded-full p-1"
                    >
                        <X size={20} color="white" />
                    </div>
                    <h6 className="text-center text-lg font-black uppercase">
                        Agregar producto
                    </h6>
                    <div className="w-full grid grid-cols-2 justify-items-center items-center gap-3 justify-center h-full">
                        <div className="flex flex-col justify-center w-4/5">
                            <label className="text-sm font-semibold flex items-center gap-1">
                                <Hash size={16} /> Código del producto
                            </label>
                            <input
                                id="PROD_COD"
                                name="PROD_COD"
                                placeholder="26GY7L"
                                type="text"
                                className=" rounded-md py-1 px-2 border border-1 border-gray-500"
                            />
                        </div>
                        <div className="flex flex-col justify-center w-4/5">
                            <label className="text-sm font-semibold flex items-center gap-1">
                                <ShoppingCart size={16} />
                                Nombre del producto
                            </label>
                            <input
                                id="PROD_NOM"
                                name="PROD_NOM"
                                placeholder="Coca-cola"
                                type="text"
                                className=" rounded-md py-1 px-2 border border-1 border-gray-500"
                            />
                        </div>
                        <div className="flex flex-col justify-center w-4/5">
                            <label className="text-sm font-semibold flex items-center gap-1">
                                <GanttChart size={16} />
                                Descripción del producto
                            </label>
                            <input
                                id="PROD_DESC"
                                name="PROD_DESC"
                                placeholder="250ml sin azucar"
                                type="text"
                                className="rounded-md py-1 px-2 border border-1 border-gray-500"
                            />
                        </div>
                        <div className="flex flex-col justify-center w-4/5">
                            <label className="text-sm font-semibold flex items-center gap-1">
                                <DollarSign size={16} /> Precio del producto
                            </label>
                            <input
                                id="PROD_PREC"
                                name="PROD_PREC"
                                placeholder="$ 2.500"
                                type="number"
                                className="rounded-md py-1 px-2 border border-1 border-gray-500"
                            />
                        </div>
                        <div className="flex flex-col justify-center w-4/5">
                            <label className="text-sm font-semibold flex items-center gap-1">
                                <Layers3 size={16} />
                                Categoría del producto
                            </label>
                            <select
                                id="CAT_ID_FK"
                                name="CAT_ID_FK"
                                className="rounded-md py-1 px-2 border border-1 border-gray-500"
                            >
                                {categories.map(category => {
                                    return (
                                        <option
                                            key={category.Id_Cat}
                                            value={category.Id_Cat}
                                        >
                                            {category.Nom_Cat}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="flex flex-col justify-center w-4/5">
                            <label className="text-sm font-semibold flex items-center gap-1">
                                <Layers3 size={16} />
                                Lote
                            </label>
                            <select
                                id="ID_LOTE"
                                name="ID_LOTE"
                                className="rounded-md py-1 px-2 border border-1 border-gray-500"
                            >
                                {lotes.map(lote => {
                                    return (
                                        <option
                                            key={lote.ID_LOTE}
                                            value={lote.ID_LOTE}
                                        >
                                            Código: {lote.COD_LOTE}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="flex flex-col justify-center w-4/5">
                            <label className="text-sm font-semibold flex items-center gap-1">
                                <Layers3 size={16} />
                                Inventario
                            </label>
                            <select
                                id="INV_ID"
                                name="INV_ID"
                                className="rounded-md py-1 px-2 border border-1 border-gray-500"
                            >
                                {inventories.map(inventory => {
                                    return (
                                        <option
                                            key={inventory.INV_ID}
                                            value={inventory.INV_ID}
                                        >
                                            Inventario: {inventory.INV_ID}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="flex flex-col justify-center w-4/5">
                            <label className="text-sm font-semibold flex items-center gap-1">
                                <Layers3 size={16} />
                                Proveedor
                            </label>
                            <select
                                id="ID_PROV"
                                name="ID_PROV"
                                className="rounded-md py-1 px-2 border border-1 border-gray-500"
                            >
                                {proveedores.map(proveedor => {
                                    return (
                                        <option
                                            key={proveedor.PROV_ID}
                                            value={proveedor.PROV_ID}
                                        >
                                            {proveedor.PROV_NOM}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="bg-transparent py-2 px-3 rounded-xl text-black font-semibold border-2 border-black transition-all duration-150 my-2 hover:text-white hover:bg-black text-sm"
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
                <form className="min-w-[450px] bg-white min-h-[450px] rounded-xl p-3 flex flex-col justify-between items-center relative">
                    <div
                        onClick={removeFormEditProduct}
                        className="cursor-pointer absolute top-3 right-5 bg-red-500 rounded-full p-1"
                    >
                        <X size={20} color="white" />
                    </div>
                    <h6 className="text-center text-lg font-black uppercase">
                        Editar producto
                    </h6>
                    <div className="w-full grid grid-cols-2 justify-items-center items-center gap-3 justify-center h-full">
                        <div className="flex flex-col justify-center w-4/5">
                            <label className="text-sm font-semibold flex items-center gap-1">
                                <Hash size={16} /> Código del producto
                            </label>
                            <input
                                id="PROD_COD_edit"
                                name="PROD_COD"
                                placeholder="26GY7L"
                                type="text"
                                className=" rounded-md py-1 px-2 border border-1 border-gray-500"
                                defaultValue={formEdit.PROD_COD}
                                onChange={handleChangeCodProducto}
                            />
                        </div>
                        <div className="flex flex-col justify-center w-4/5">
                            <label className="text-sm font-semibold flex items-center gap-1">
                                <ShoppingCart size={16} />
                                Nombre del producto
                            </label>
                            <input
                                id="PROD_NOM_edit"
                                name="PROD_NOM"
                                placeholder="Coca-cola"
                                type="text"
                                className=" rounded-md py-1 px-2 border border-1 border-gray-500"
                                defaultValue={formEdit.PROD_NOM}
                                onChange={handleChangeNomProducto}
                            />
                        </div>
                        <div className="flex flex-col justify-center w-4/5">
                            <label className="text-sm font-semibold flex items-center gap-1">
                                <GanttChart size={16} />
                                Descripción del producto
                            </label>
                            <input
                                id="PROD_DESC_edit"
                                name="PROD_DESC"
                                placeholder="250ml sin azucar"
                                type="text"
                                className="rounded-md py-1 px-2 border border-1 border-gray-500"
                                defaultValue={formEdit.PROD_DESC}
                                onChange={handleChangeDescProducto}
                            />
                        </div>
                        <div className="flex flex-col justify-center w-4/5">
                            <label className="text-sm font-semibold flex items-center gap-1">
                                <DollarSign size={16} /> Precio del producto
                            </label>
                            <input
                                id="PROD_PREC_edit"
                                name="PROD_PREC"
                                placeholder="$ 2.500"
                                type="number"
                                className="rounded-md py-1 px-2 border border-1 border-gray-500"
                                defaultValue={formEdit.PROD_PREC}
                                onChange={handleChangePrecProducto}
                            />
                        </div>
                        <div className="flex flex-col justify-center w-4/5">
                            <label className="text-sm font-semibold flex items-center gap-1">
                                <Layers3 size={16} />
                                Categoría del producto
                            </label>
                            <select
                                id="CAT_ID_FK_edit"
                                name="CAT_ID_FK"
                                className="rounded-md py-1 px-2 border border-1 border-gray-500"
                                onChange={handleChangeCatProducto}
                            // defaultValue={formEdit.CAT_ID_FK}
                            >
                                {categories.map(category => {
                                    return (
                                        <option
                                            key={category.Id_Cat}
                                            value={category.Id_Cat}
                                        >
                                            {category.Nom_Cat}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="flex flex-col justify-center w-4/5">
                            <label className="text-sm font-semibold flex items-center gap-1">
                                <Layers3 size={16} />
                                Lote
                            </label>
                            <select
                                id="ID_LOTE"
                                name="ID_LOTE"
                                className="rounded-md py-1 px-2 border border-1 border-gray-500"
                                onChange={handleChangeLoteProducto}
                            >
                                {lotes.map(lote => {
                                    return (
                                        <option
                                            key={lote.ID_LOTE}
                                            value={lote.ID_LOTE}
                                        >
                                            Código: {lote.COD_LOTE}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="flex flex-col justify-center w-4/5">
                            <label className="text-sm font-semibold flex items-center gap-1">
                                <Layers3 size={16} />
                                Inventario
                            </label>
                            <select
                                id="INV_ID"
                                name="INV_ID"
                                className="rounded-md py-1 px-2 border border-1 border-gray-500"
                                onChange={handleChangeInvProducto}
                            >
                                {inventories.map(inventory => {
                                    return (
                                        <option
                                            key={inventory.INV_ID}
                                            value={inventory.INV_ID}
                                        >
                                            Inventario: {inventory.INV_ID}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="flex flex-col justify-center w-4/5">
                            <label className="text-sm font-semibold flex items-center gap-1">
                                <Layers3 size={16} />
                                Proveedor
                            </label>
                            <select
                                id="ID_PROV"
                                name="ID_PROV"
                                className="rounded-md py-1 px-2 border border-1 border-gray-500"
                                onChange={handleChangeProvProducto}
                            >
                                {proveedores.map(proveedor => {
                                    return (
                                        <option
                                            key={proveedor.PROV_ID}
                                            value={proveedor.PROV_ID}
                                        >
                                            {proveedor.PROV_NOM}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                    <button
                        value={formEdit.PROD_ID}
                        type="submit"
                        className="bg-transparent py-2 px-3 rounded-xl text-black font-semibold border-2 border-black transition-all duration-150 hover:text-white hover:bg-black text-sm"
                        onClick={fetchEditProduct}
                    >
                        Aceptar
                    </button>
                </form>
            </div>
            <div className="w-full p-6 ml-0 lg:ml-[200px] 2xl:ml-[200px] mt-[80px] lg:mt-0">
                <div className="overflow-auto">
                    <div className="flex items-center justify-between w-full flex-col sm:flex-row gap-4">
                        <h3 className="font-bold text-xl">Productos</h3>
                        <button
                            onClick={showFormAddProduct}
                            className="bg-sky-500 hover:bg-sky-600 transition-all duration-200 text-white p-2 rounded-md flex items-center gap-2 text-sm"
                        >
                            <CirclePlus /> Agregar producto
                        </button>
                    </div>
                    <hr className="mt-4" />
                    <div className="my-4 w-full max-h-screen flex flex-col justify-between gap-4 overflow-auto">
                        <div className="w-full bg-gray-100 rounded-lg p-2 px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
                            <div className="flex gap-2 items-center">
                                <label className="text-sm">Buscar:</label>
                                <input
                                    type="text"
                                    placeholder="Coca-cola 400ml"
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
                                columns={columsProducts}
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
