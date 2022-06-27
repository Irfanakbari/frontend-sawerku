import Head from "next/head";
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';


const Register = () => {
    const [loading, setLoading] = useState(false);
    const submitHandler = (e) => {
        e.preventDefault();
        setLoading(true);
        postAPI("https://backend1.irfans.my.id//v1/email", {
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
            <div className="flex items-center justify-center h-screen">
                <div className="container lg:w-2/5 sm:w-3/6 border-4 border-black mt-5 rounded-lg text-center mx-5 overflow-hidden">
                    <div className="flex flex-col font-patrick text-2xl items-center justify-center border-b-4 p-2 text-white font-semibold border-black bg-[#BB6BD9]">
                        SAWERKU
                    </div>
                    <h1 className="mt-4 text-[40px] font-zillaSlabSemiBold">REGISTER</h1>
                    <br />
                    <div className="max-w-lg mx-auto font-inter p-4">
                        <form onSubmit={submitHandler}>
                            <label>
                                <span className="block mb-2 text-[#4A4154] font-zillaSlabMedium text-left after:content-['*'] after:ml-1 after:text-[red]">
                                    Email :
                                </span>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="emailku@pribadi.com"
                                    className="py-2 w-full block border-b-2 placeholder:text-[#CCD5DD] placeholder:font-medium placeholder:text-md focus:outline-none invalid:text-[red] invalid:border-[red]"
                                ></input>
                            </label>
                            
                            <br />

                            <p className="mt-2 text-left mb-5">
                                Anda harus berusia 17 tahun ke atas untuk bergabung bersama sawerku dan dengan mendaftarkan diri, anda telah menyetujui syarat dan ketentuan.
                            </p>
                            <button className="bg-[#55A9B4] hover:bg-[#196b76] border-2 border-black text-white font-semibold font-zillaSlabMedium text-xl py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline">
                                {
                                    loading ? "Loading" : "Daftar"
                                }
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};


export default Register;
