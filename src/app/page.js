"use client";
import React from "react";
import { useState, useEffect } from "react";
import Aside from "../components/aside";
import Image from "next/image";
import DataTable from "react-data-table-component";
import { dataHome, columsHome, columsPopular } from "@/utils/tables";
import { CalendarFold, CircleUserRound } from "lucide-react";
import Pies from "@/components/stats";
import { getCookie } from "cookies-next";
import base64url from "base64url";

function Page() {
    const [lengthUsers, setLengthUsers] = useState(0);
    const [loading, setLoading] = useState(true);


    const paginationComponentOptions = {
        rowsPerPageText: "Filas por página",
        rangeSeparatorText: "de",
        selectAllRowsItem: true,
        selectAllRowsItemText: "Todos",
    };

    const token = getCookie('sessionToken')

    useEffect(() => {
        fetch('http://localhost:3000/api/v1/users', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(response => response.json())
            .then(response => {
                console.log(response.data)
                const data = response.data;
                const length = data.length;
                setLengthUsers(length);
                setLoading(false)
            });
    }, []);

    const date = new Date();

    function parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const data = JSON.parse(jsonPayload)
        return localStorage.setItem('name', JSON.stringify(data.user));
    }

    parseJwt(token)

    return (
        <main className="flex flex-col lg:flex-row overflow-y-hidden">
            <Aside />
            <div className="w-full p-6 ml-0 lg:ml-[200px] 2xl:ml-[200px] mt-[80px] lg:mt-0">
                <div>
                    <div className="flex items-center justify-between px-4">
                        <h3 className="font-semibold text-xl">Inicio</h3>
                        <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg">
                            <CalendarFold size={20} />{" "}
                            {date.toLocaleDateString()}
                        </div>
                    </div>
                    <div className="bg-gray-100 min-w-10 min-h-10 rounded-xl my-4 w-full max-h-screen flex flex-col lg:flex-row justify-between gap-4 overflow-auto">
                        <div className="w-full mx-auto flex items-center justify-between p-4 gap-4">
                            <div className="bg-white p-3 rounded-md min-h-[88px] w-full text-white flex items-center justify-center gap-2">
                                <CircleUserRound size={60} color="rgb(14, 165, 233)"/>
                                <div className="flex flex-col gap-1 justify-center">
                                {loading ? <div className="bg-gray-300 w-full min-h-5 rounded-lg"></div> : <p className="font-black text-4xl text-left text-black">{lengthUsers}</p>}
                                    <p className="text-sm text-black text-left">Usuarios registrados</p>
                                </div>
                            </div>
                            <div className="bg-white p-3 rounded-md min-h-[88px] w-full text-white flex items-center justify-center gap-2">
                                <CircleUserRound size={60} color="rgb(14, 165, 233)"/>
                                <div className="flex flex-col gap-1 justify-center">
                                {loading ? <div className="bg-gray-300 w-full min-h-5 rounded-lg"></div> : <p className="font-black text-4xl text-left text-black">{lengthUsers}</p>}
                                    <p className="text-sm text-black text-left">Usuarios registrados</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Page;
