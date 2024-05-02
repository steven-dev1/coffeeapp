'use client'
import Aside from "@/components/aside";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import DataTable from 'react-data-table-component';
import { columsBuysSells } from "@/utils/tables";
import { Dropdown } from 'primereact/dropdown';
import { getCookie } from "cookies-next";
import { Select } from 'antd';
import { ChevronDown, CirclePlus, CreditCard, DollarSign, GanttChart, Hash, Key, Layers3, ShoppingCart, Trash, Trash2, UserRound, X } from "lucide-react";

function Page() {

  const token = getCookie('sessionToken');
  const router = useRouter();
  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };


  const [productos, setProductos] = useState(JSON.parse(localStorage.getItem('productos')) || []);
  const [cart, setCarrito] = useState(JSON.parse(localStorage.getItem('carrito')))
  const [lotes, setLotes] = useState([])

  useEffect(() => {
    if (productos.length > 0 || cart.length > 0) {
      return
    } else {
      fetch("http://localhost:3000/api/v1/inventories/exists/all", {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
        .then(response => response.json())
        .then(response => {
          console.log(response.data)
          localStorage.setItem("productos", JSON.stringify(response.data))
        });
    }
  }, [])

  useEffect(() => {
    try {
      fetch('http://localhost:3000/api/v1/lotes')
        .then(response => response.json())
        .then(response => {
          console.log(response.data)
          setLotes(response.data)
        });
    } catch (err) {
      console.log("Error: " + err);
    }
  }, []);


  const handleClick = (event) => {
    const findProduct = productos.find(p => p.producto.PROD_ID === event.target.value);
    setTotal(total + parseInt(findProduct.producto.PROD_PREC))
    localStorage.setItem("total", JSON.stringify(total + parseInt(findProduct.producto.PROD_PREC)))

    if (findProduct) {
      // Eliminar el producto de la lista de productos disponibles
      const newProductos = productos.filter(p => p.producto.PROD_ID !== event.target.value);
      setProductos(newProductos);
      localStorage.setItem("productos", JSON.stringify(newProductos));

      // Agregar el producto al carrito
      setCarrito([...cart, findProduct]);
      localStorage.setItem("carrito", JSON.stringify([...cart, findProduct]));
    } else {
      alert("El producto no existe");
    }
  }

  const deleteItemCart = (event) => {
    const findProduct = cart.find(p => p.producto.PROD_ID === event.target.value);
    const newCart = cart.filter(p => p.producto.PROD_ID !== event.target.value);
    setCarrito(newCart);
    localStorage.setItem("carrito", JSON.stringify(newCart));

    if (findProduct) {
      // Encontrar la posición del producto en la lista de productos disponibles
      const index = productos.findIndex(p => p.producto.PROD_ID === findProduct.producto.PROD_ID);

      // Insertar el producto devuelto en la misma posición en la lista de productos disponibles
      const newProductos = [...productos.slice(0, index), findProduct, ...productos.slice(index)];
      setProductos(newProductos);
      localStorage.setItem("productos", JSON.stringify(newProductos));

      // Calcular el nuevo total restando el precio del producto eliminado
      const newTotal = total - parseInt(findProduct.producto.PROD_PREC);
      setTotal(newTotal);
      localStorage.setItem("total", JSON.stringify(newTotal));
    }
  }

  const [tipoOrden, setTipoOrden] = useState(1)

  const handleTipoOrden = (event) => {
    setTipoOrden(event.target.value);
  }

  // useEffect(() => {
  //   cart.map(producto => {
  //     const totalData = total + parseInt(producto.producto.PROD_PREC)
  //     setTotal(total + parseInt(producto.producto.PROD_PREC))
  //     localStorage.setItem("total", JSON.stringify(totalData))
  //   })
  // },[cart])

  const [total, setTotal] = useState(JSON.parse(localStorage.getItem('total')))

  // CREAR ORDEN
  const handleCreate = () => {
    try {
      const item = JSON.parse(localStorage.getItem('name'))
      const user = item.Id_User
      const cartLS = JSON.parse(localStorage.getItem('carrito'))
      console.log(cartLS)
      let cartBody = []
      if (cartLS.length > 0) {
          cartBody = cartLS.map(producto => {
          return {
            "ID_PROD": producto.PRO_ID_FK,
            "CANTIDAD": document.getElementById(`input_cant${producto.producto.PROD_ID}`).value,
            "PRECIO_U": producto.producto.PROD_PREC
          }
        })
      } else {
        return
      }
      console.log(cartBody)
      fetch('http://localhost:3000/api/v1/buy/sales/create', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "MET_PAGO": document.getElementById('MET_PAGO').value,
          "TOTAL": total,
          "ID_USER": user,
          "TIPO_ENCABE": document.getElementById('TIPO_ENC').value,
          "LOTE_ID": document.getElementById('select_lote').value,
          "LISTA_PROD": [cartBody]
        })
      })
    } catch (err) {
      console.log("Error: " + err);
    }
  }

  return (
    <main className="flex flex-col md:flex-row overflow-y-hidden">
      <Aside />
      <div className="w-full p-6 ml-0 lg:ml-[200px] 2xl:ml-[200px] mt-[80px] lg:mt-0">
        <div className="overflow-auto">
          <div className="flex items-center justify-between w-full flex-col sm:flex-row gap-4">
            <h3 className="font-bold text-xl w-full">Compras / Ventas</h3>
          </div>
          <hr className="mt-4" />
          <div className="mt-4 flex">
            <div className="w-full bg-gray-100 min-h-[300px] h-auto rounded-xl p-2">
              <button className="text-gray-800 font-semibold flex items-center gap-1"><ChevronDown size={18} /> Generar nueva orden</button>
              <hr className="my-2" />
              <div className="h-full flex flex-col md:flex-row gap-4 w-full">
                {/* CARRITO */}
                <div className="bg-white md:min-w-[400px] overflow-y-auto w-auto overflow-x-auto md:overflow-x-hidden md:w-[500px] h-[350px] p-2 rounded-md border-1 border-sky-500 border relative">
                  <div className="mx-auto">
                    <h4 className="text-center font-bold text-lg bg-white rounded-md px-2 py-1">Productos</h4>
                    <div className="w-full h-full flex flex-col gap-1 items-center my-3 overflow-y-auto overflow-x-hidden">
                      {cart.length > 0 ? cart.map(p => {
                        return (
                          <div key={p.producto.PROD_ID} className="flex flex-col items-center justify-between w-full bg-gray-100 py-1 px-2 rounded-lg">
                            <div className="flex items-center justify-between w-full">
                              <div className="flex flex-col">
                                <h4 className="font-bold text-ellipsis text-nowrap overflow-hidden">{p.producto.PROD_NOM}</h4>
                                <span className="text-sm font-medium">${p.producto.PROD_PREC}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <input id={`input_cant${p.producto.PROD_ID}`} type="number" min={0} max={tipoOrden == 2 ? p.CANT_PROD : 50} defaultValue={0} />
                                <button onClick={deleteItemCart} value={p.producto.PROD_ID} className="bg-red-500 p-1 rounded-full hover:bg-red-600 transition-all duration-200 text-white text-sm font-semibold">Eliminar</button>
                              </div>
                            </div>
                            {tipoOrden == 2 ? <span className="text-red-500 bg-red-100 p-1 rounded-lg text-xs font-semibold my-1">{p.CANT_PROD > 0 ? `El máximo para venta de este producto es: ${p.CANT_PROD}` : "No hay stock"}</span> : ''}
                          </div>
                        )
                      }) : 'Agrega productos al carrito'}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-auto-fit-50 gap-5 w-full items-start">
                  <div className="flex flex-col gap-1 items-start">
                    <label className="ml-1 text-sm font-semibold">Método de pago:</label>
                    <select id="MET_PAGO" className="outline-none border border-1 border-sky-500 p-2 rounded-xl cursor-pointer">
                      <option className="cursor-pointer" value="1">Efectivo</option>
                      <option className="cursor-pointer" value="2">PSE</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1 items-start">
                    <label className="ml-1 text-sm font-semibold">Tipo de orden:</label>
                    <select id="TIPO_ENC" className="outline-none border border-1 border-sky-500 p-2 rounded-xl cursor-pointer" onChange={handleTipoOrden}>
                      <option className="cursor-pointer" value="1">Compra</option>
                      <option className="cursor-pointer" value="2">Venta</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1 items-start">
                    <label className="ml-1 text-sm font-semibold">Lote:</label>
                    <select id="select_lote" className="outline-none border border-1 border-sky-500 p-2 rounded-xl cursor-pointer" onChange={handleTipoOrden}>
                      {lotes.map(lote => {
                        return (
                          <option key={lote.ID_LOTE} className="cursor-pointer" value={lote.ID_LOTE}>{lote.COD_LOTE}</option>
                        )
                      })}
                    </select>
                  </div>
                  <div className="flex gap-1 items-start">
                    <div className="flex flex-col gap-1 items-start">
                      <label className="ml-1 text-sm font-semibold">Total:</label>
                      <span className="ml-1 font-medium bg-green-100 text-green-700 p-2 rounded-md">${total}</span>
                    </div>
                    <div className="h-full w-full flex items-center justify-center">
                      <button onClick={handleCreate} className="bg-sky-500 hover:bg-sky-600 transition-all duration-200 text-white p-2 rounded-lg m-2">Crear orden</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className="mt-3" />
          <section className="flex flex-col gap-2 mt-3">
            <h1 className="mx-auto text-center font-bold text-lg">Productos disponibles</h1>
            <div className="grid grid-cols-auto-fit-100 gap-3">
              {productos.length > 0 ? productos.map(producto => {
                return (
                  <article key={producto.producto.PROD_ID} className="bg-gray-100 text-gray-900 p-2 rounded-lg flex flex-col items-center justify-between w-full gap-1">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex flex-col">
                        <h4 className="font-bold text-ellipsis text-nowrap overflow-hidden">{producto.producto.PROD_NOM}</h4>
                        <span className="text-sm font-medium">${producto.producto.PROD_PREC}</span>
                      </div>
                      <div>
                        <span>Stock: {producto.CANT_PROD}</span>
                      </div>
                    </div>
                    <button onClick={handleClick} value={producto.producto.PROD_ID} className="bg-sky-500 hover:bg-sky-600 transition-all duration-150 text-white p-1 rounded-lg w-full">Agregar</button>
                  </article>
                )
              }) : 'No hay productos disponibles'}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Page;
