'use client'
import Aside from "@/app/components/aside";
import React from "react";
import { useState, useEffect } from "react";

function page() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/v1/products")
            .then(response => response.json())
            .then(data => setProducts(data.data));
    }, []);

    return (
        <main className="flex">
            {/* <Header title={"Inicio"} fecha={"29 Feb"} /> */}
            <Aside />
            <div className="containIni">
                <div className="informe">
                    <div className="tituInfo">Ordenes Recientes</div>
                    <table className="table-inicio">
                        <thead className="thead-table-inicio">
                            <tr>
                                <th>ID</th>
                                <th>Producto</th>
                                <th>Precio</th>
                                <th>Orden</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody className="tbody-table-inicio">
                            {products.map(p => {
                                return (
                                    <tr key={p.PROD_ID}>
                                        <td>{p.PROD_ID}</td>
                                        <td>{p.PROD_NOM}</td>
                                        <td>{p.PROD_PREC}</td>
                                        <td>{p.PROD_COD}</td>
                                        <td>{p.PROD_COD}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="estadis">
                    <div className="datos">
                        <div className="tituInfo">Datos</div>
                        {/* <Pies /> */}
                    </div>

                    <div className="popular">
                        <div className="tituInfo">Populares hoy</div>
                        <div className="contePopu">
                            <div className="imgPopu">
                                <img
                                    src="#"
                                    alt="Producto"
                                    width="87px"
                                    height="77px"
                                />
                            </div>
                            <div className="infoPopu">
                                Subsidiado Sena opcion 2
                                <div id="star-rating">
                                    <span className="star" data-value="1">
                                        &#9733;
                                    </span>
                                    <span className="star" data-value="2">
                                        &#9733;
                                    </span>
                                    <span className="star" data-value="3">
                                        &#9733;
                                    </span>
                                    <span className="star" data-value="4">
                                        &#9733;
                                    </span>
                                    <span className="star" data-value="5">
                                        &#9733;
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="contePopu">
                            <div className="imgPopu">
                                <img
                                    src="#"
                                    alt="Producto"
                                    width="87px"
                                    height="77px"
                                />
                            </div>
                            <div className="infoPopu">
                                Empanada
                                <div id="star-rating">
                                    <span className="star" data-value="1">
                                        &#9733;
                                    </span>
                                    <span className="star" data-value="2">
                                        &#9733;
                                    </span>
                                    <span className="star" data-value="3">
                                        &#9733;
                                    </span>
                                    <span className="star" data-value="4">
                                        &#9733;
                                    </span>
                                    <span className="star" data-value="5">
                                        &#9733;
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default page;
