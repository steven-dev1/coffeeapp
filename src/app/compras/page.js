'use client'
import Aside from "@/components/aside";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import DataTable from 'react-data-table-component';
import { columsExistencias } from "@/utils/tables";
import Spinner from "@/components/Spinner/Spinner";
import { getCookie } from "cookies-next";
import { CirclePlus, CreditCard, DollarSign, GanttChart, Hash, Layers3, ShoppingCart, UserRound, X } from "lucide-react";

function Page() {
  const [loading, setLoading] = useState(true);
  const [firstData, setFirstData] = useState([]);
  const [records, setRecords] = useState([]);

  const token = getCookie('sessionToken')
  const router = useRouter()

  useEffect(() => {
    // setLoading(true)
    fetch("http://localhost:3000/api/v1/inventories/exists/all", {
      method: 'GET',
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.data)
        const existencias = data.data.map((existencia) => ({
          producto: existencia.producto.PROD_NOM,
          precio: existencia.producto.PROD_PREC,
          cantidad: existencia.CANT_PROD,
          lote: existencia.lote.COD_LOTE,
          fecha_venc: existencia.lote.FEC_VENC
        }))
        setRecords(existencias)
        setFirstData(existencias)
        setLoading(false)
      });
  }, []);

  const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  };

  const handleChange = (e) => {
    const filteredRecords = firstData.filter(record => {
      return record.producto.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setRecords(filteredRecords)
  }


  const [formCreateInvoices, setFormCreateInvoices] = useState(false);

  const showFormCreateInvoices = () => {
    setFormCreateInvoices(!formCreateInvoices);
  }

  const [lotes, setLotes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [admins, setAdmins] = useState([]);
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
      });

    fetch('http://localhost:3000/api/v1/products', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    .then(response => response.json())
    .then(response => {
       setProductos(response.data)
     });

     fetch('http://localhost:3000/api/v1/users', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    .then(response => response.json())
    .then(response => {
      response.data.map(user => {
        console.log(user)
        if(user.Id_Rol_FK === 1) {
          setAdmins(...admins, user)
        }
      })
       setUsuarios(response.data)
     });

  }, [])

  const newOrder = (e) => {
    e.preventDefault()
    try {
      fetch('http://localhost:3000/api/v1/buy/sales/create', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer '+ token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "MET_PAGO": document.getElementById('MET_PAGO').value,
          "LOTE_ID": document.getElementById('LOTE_ID').value,
          "TIPO_ENCABE": document.getElementById('TIPO_ENCABE').value,
          "ID_USER": document.getElementById('ID_USER').value,
          "CANTIDAD": document.getElementById('CANTIDAD').value,
          "PRECIO_U": document.getElementById('PRECIO_U').value,
          "TOTAL": document.getElementById('TOTAL').value,
          "ID_PROD": document.getElementById('ID_PROD').value
        })
      })
      .then(response => response.json())
      .then(response => {
        if(response.type === "success") {
          location.reload();
        }
      })
    } catch(e) {
      console.log("Error: "+e)
    }
  }


  return (
    <main className="flex flex-col md:flex-row overflow-y-hidden">
      {/* <Header title={"Inicio"} fecha={"29 Feb"} /> */}
      <Aside />
      {/* FORM AGREGAR */}
      <div
        className={`flex ${formCreateInvoices ? "scale-100 opacity-1" : "scale-0 opacity-0"
          } transition-all duration-150 justify-center items-center w-screen h-screen absolute z-[1000000000000000] bg-gray-900 bg-opacity-50 backdrop-blur-3xl`}
      >
        <form
          onSubmit={newOrder}
          className="min-w-[450px] bg-white min-h-[450px] rounded-xl p-3 flex flex-col items-center justify-between relative"
        >
          <div
            onClick={showFormCreateInvoices}
            className="cursor-pointer absolute top-3 right-5 bg-red-500 rounded-full p-1"
          >
            <X size={20} color="white" />
          </div>
          <h6 className="text-center text-lg font-black uppercase">
            Nueva orden
          </h6>
          <div className="w-full grid grid-cols-2 justify-items-center items-center gap-3 justify-center h-full">
            <div className="flex flex-col justify-center w-4/5">
              <label className="text-sm font-semibold flex items-center gap-1">
                <CreditCard size={16} /> Método de pago
              </label>
              <select name="MET_PAGO" id="MET_PAGO" className="rounded-md py-1 px-2 border border-1 border-gray-500">
                <option value="1" key="1">Efectivo</option>
                <option value="2" key="2">PSE</option>
              </select>
            </div>
            <div className="flex flex-col justify-center w-4/5">
              <label className="text-sm font-semibold flex items-center gap-1">
                <CreditCard size={16} /> Tipo de transacción
              </label>
              <select name="TIPO_ENCABE" id="TIPO_ENCABE" className="rounded-md py-1 px-2 border border-1 border-gray-500">
                <option value="1" key="1">Compra</option>
                <option value="2" key="2">Venta</option>
              </select>
            </div>
            <div className="flex flex-col justify-center w-4/5">
              <label className="text-sm font-semibold flex items-center gap-1">
                <ShoppingCart size={16} /> Producto
              </label>
              <select id="ID_PROD" name="ID_PROD" className="rounded-md py-1 px-2 border border-1 border-gray-500">
                {
                  productos.map((producto) => (
                    <option value={producto.PROD_ID} key={producto.PROD_ID}>
                      {producto.PROD_NOM}
                    </option>
                  ))
                }
              </select>
            </div>
            <div className="flex flex-col justify-center w-4/5">
              <label className="text-sm font-semibold flex items-center gap-1">
                <UserRound size={16} />
                Usuario
              </label>
              <select id="ID_USER" name="ID_USER" className="rounded-md py-1 px-2 border border-1 border-gray-500">
                {
                  usuarios.map((usuario) => (
                    <option value={usuario.Id_User} key={usuario.Id_User}>
                      {usuario.Id_Rol_FK == 1 ? "Admin ": ''}{usuario.Nom_User}
                    </option>
                  ))
                }
              </select>
            </div>
            <div className="flex flex-col justify-center w-4/5">
              <label className="text-sm font-semibold flex items-center gap-1">
                <Hash size={16} /> Cantidad
              </label>
              <input
                id="CANTIDAD"
                name="CANTIDAD"
                placeholder="10"
                type="number"
                className="rounded-md py-1 px-2 border border-1 border-gray-500"
              />
            </div>
            <div className="flex flex-col justify-center w-4/5">
              <label className="text-sm font-semibold flex items-center gap-1">
                <DollarSign size={16} />
                Precio unitario
              </label>
              <input
                id="PRECIO_U"
                name="PRECIO_U"
                placeholder="$ 1.500"
                type="number"
                className="rounded-md py-1 px-2 border border-1 border-gray-500"
              />
            </div>
            <div className="flex flex-col justify-center w-4/5">
              <label className="text-sm font-semibold flex items-center gap-1">
                <Layers3 size={16} />
                Lote
              </label>
              <select name="LOTE_ID" id="LOTE_ID" className="rounded-md py-1 px-2 border border-1 border-gray-500">
                {
                  lotes.map((lote) => (
                    <option value={lote.ID_LOTE} key={lote.ID_LOTE}>
                      Código: {lote.COD_LOTE}
                    </option>
                  ))
                }
              </select>
            </div>
            <div className="flex flex-col justify-center w-4/5">
              <label className="text-sm font-semibold flex items-center gap-1">
                <DollarSign size={16} />
                Total
              </label>
              <input
                id="TOTAL"
                name="TOTAL"
                placeholder="$ 14.500"
                type="number"
                className="rounded-md py-1 px-2 border border-1 border-gray-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-transparent py-2 px-3 rounded-xl text-black font-semibold border-2 border-black transition-all duration-150 my-2 hover:text-white hover:bg-black text-sm"
                onClick={newOrder}
          >
            Aceptar
          </button>
        </form>
      </div>
      <div className="w-full p-6 ml-0 md:ml-[200px] 2xl:ml-[200px] mt-[80px] md:mt-0">
        <div className="overflow-auto">
          <div className="flex items-center justify-between w-full flex-col sm:flex-row gap-4">
            <h3 className="font-bold text-xl w-full">Compras / Ventas</h3>
            <div className="flex items-center gap-2 w-full justify-between sm:justify-end">
              <button
                onClick={showFormCreateInvoices}
                className="bg-sky-500 text-white p-2 rounded-md flex items-center gap-2 text-sm"
              >
                <CirclePlus /> Nueva orden
              </button>
            </div>
          </div>
          <hr className="mt-4" />
          <div className="my-4 w-full max-h-screen flex flex-col justify-between gap-4 overflow-auto">
            <div className="w-full bg-gray-100 rounded-lg p-2 px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
              <div className="flex gap-2 items-center">
                <label className="text-sm">Buscar:</label>
                <input type="text" placeholder="Coca-cola 400ml" className="text-sm border border-1 border-gray-300 rounded-lg p-2" onChange={handleChange} />
              </div>
              <div>
                <p className="text-sm">Resultados encontrados: {records.length}</p>
              </div>
            </div>
            <div className="bg-gray-100 p-2 rounded-lg overflow-auto flex flex-col justify-center items-center">
              {/* <h3 className="font-bold text-lg m-2">Productos</h3> */}
              <DataTable
                columns={columsExistencias}
                data={records}
                noDataComponent={<div className="text-red-700 font-semibold py-3">No se encontraron resultados</div>}
                pagination
                paginationComponentOptions={paginationComponentOptions}
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

export default Page;
