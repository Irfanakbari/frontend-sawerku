import Head from "next/head";
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';


const Email = () => {
    const [loading, setLoading] = useState(false);
    const submitHandler = (e) => {
        e.preventDefault();
        setLoading(true);
        postAPI("https://backend-sawerku.herokuapp.com/v1/email", {
            email: e.target.email.value,
        }).then((res) => {
            if (res.status === "failed") {
                setLoading(false);
                toast.error(res.message, {
                    position: "top-right",
                    autoClose: 2000,
                    theme: "colored",
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            } else {
                toast.success("Silahkan Cek Email Aktivasi Anda", {
                    position: "top-right",
                    autoClose: 2000,
                    theme: "colored",
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                setLoading(false);
            }
        });
    };
    const postAPI = async (url, data) => {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return response.json();
    };

    return (
        <>
            <Head>
                <title>Register | Sawerku</title>
            </Head>
            <ToastContainer />
            <div className="flex h-screen">
                <div className="container border-4 border-black  rounded-lg text-center mx-5 overflow-hidden bg-[orange]">
                    <div className="flex flex-col font-patrick text-2xl border-b-4 p-2 text-white font-semibold border-black bg-[#BB6BD9]">
                        SAWERKU
                    </div>
                    <h1 className="mt-4 text-[40px] font-zillaSlabSemiBold text-white">Selamat Datang</h1>
                    <br />
                    <div className="font-inter p-4 text-white">
                        <p className="mt-2 text-left mb-5">
                            <p className="mt-2 text-left mb-5 text-xl">
                                Silahkan klik tombol dibawah ini untuk melanjutkan proses pendaftaran akun kamu.
                            </p>
                            <p className="mt-2 text-left mb-5 text-xl">
                                Link berlaku selama 24 jam.
                            </p>
                            <center>
                                <a href="#">
                                    <div className="text-center flex justify-center border-[1px] border-white bg-[purple] py-3 rounded font-semibold text-lg w-3/6">
                                        Verifikasi
                                    </div>
                                </a>
                            </center>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};


export default Email;
