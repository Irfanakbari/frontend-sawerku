import Head from "next/head";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import Error from "next/error";
import Image from "next/image";
import qrisImage from "../public/images/qris.png";
import linkajaImage from "../public/images/linkaja.png";
import danaImage from "../public/images/dana.png";
import spayImage from "../public/images/spay.png";
import { isMobile } from "react-device-detect";
import { useRouter } from "next/router";

const Sawer = (props) => {
    const [nominal, setNominal] = useState("");
    const [sawer, setSawer] = useState({});
    const router = useRouter();
    if (props.errorCode) {
        return <Error statusCode={props.errorCode} />;
    }
    new useEffect(() => {
        document.getElementsByClassName("btn")[0].addEventListener("click", (e) => {
            e.preventDefault();
            setNominal("10000");
        });
        document.getElementsByClassName("btn")[1].addEventListener("click", (e) => {
            e.preventDefault();
            setNominal("25000");
        });
        document.getElementsByClassName("btn")[2].addEventListener("click", (e) => {
            e.preventDefault();
            setNominal("50000");
        });
        document.getElementsByClassName("btn")[3].addEventListener("click", (e) => {
            e.preventDefault();
            setNominal("100000");
        });
    }, [nominal]);

    function formatRupiah(angka, prefix) {
        var number_string = angka.replace(/[^,\d]/g, "").toString(),
            split = number_string.split(","),
            sisa = split[0].length % 3,
            rupiah = split[0].substr(0, sisa),
            ribuan = split[0].substr(sisa).match(/\d{3}/gi);

        // tambahkan titik jika yang di input sudah menjadi angka ribuan
        if (ribuan) {
            var separator = sisa ? "." : "";
            rupiah += separator + ribuan.join(".");
        }

        rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
        return prefix == undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
    }

    const nominalHandler = (e) => {
        setNominal(e.target.value.replace("Rp. ", "").replace(/\./g, ""));
    };

    const inputHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setSawer({ ...sawer, [name]: value });
        console.log(sawer);
    };

    const submitHandler = async (e) => {
        if (nominal === "") {
            toast.error("Nominal tidak boleh kosong");
        } else if (sawer.jenis === "") {
            toast.error("Jenis tidak boleh kosong");
        } else if (sawer.dari === "") {
            toast.error("Dari tidak boleh kosong");
        } else if (sawer.email === "") {
            toast.error("Email tidak boleh kosong");
        } else if (sawer.pesan === "") {
            toast.error("Pesan tidak boleh kosong");
        }

        if (e == "qris") {
            const respon = await fetch(
                "https://backend-sawerku.herokuapp.com/v1/payments/xendit/qr/" +
                props.username,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: sawer.email,
                        nominal: parseInt(nominal),
                        from: sawer.dari,
                        pesan: sawer.pesan,
                        metode: e,
                    }),
                }
            );
            const datas = await respon.json();
            if (datas.status === "success") {
                const { external_id } = datas.data;
                router.push("/qris/" + external_id);
            } else {
                toast.error("Gagal membuat Pembayaran");
            }
        } else {
            const respon = await fetch(
                "https://backend-sawerku.herokuapp.com/v1/payments/xendit/" +
                props.username,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: sawer.email,
                        nominal: parseInt(nominal),
                        from: sawer.dari,
                        pesan: sawer.pesan,
                        metode: e,
                    }),
                }
            );
            const { data, status } = await respon.json();
            console.log(data)
            if (status === "success") {
                if (isMobile) {
                    const { actions } = data;
                    router.push(actions.mobile_web_checkout_url);
                } else {
                    const { actions } = data;
                    if (actions.desktop_web_checkout_url) {
                        router.push(actions.desktop_web_checkout_url);
                    } else {
                        router.push(actions.mobile_deeplink_checkout_url);
                    }
                }
            } else {
                toast.error("Gagal membuat Pembayaran");
            }
        }
    };

    return (
        <>
            <Head>
                <title>Dukungan {props.username} | Sawerku</title>
            </Head>
            <ToastContainer />
            <div className="flex items-center justify-center mb-10">
                <div className="container lg:w-3/5 border-4 border-black mt-5 rounded-lg text-center mx-5 overflow-hidden">
                    <div className="flex flex-col font-patrick text-2xl items-center justify-center border-b-4 p-2 text-white font-semibold border-black bg-[#BB6BD9]">
                        SAWERKU
                    </div>
                    <h1 className="mt-4 text-[40px] font-zillaSlabSemiBold">
                        Dukungan {props.username}
                    </h1>
                    <br />
                    <div className=" mx-auto font-inter p-4">
                        <form onSubmit={submitHandler}>
                            <label>
                                <span className="block mb-2 text-[#4A4154] font-zillaSlabMedium text-left after:content-['*'] after:ml-1 after:text-[red]">
                                    Username :
                                </span>
                                <input
                                    type="text"
                                    name="username"
                                    disabled
                                    required
                                    defaultValue={props.username}
                                    placeholder="jonikun"
                                    className="py-2 w-full block border-b-2 placeholder:text-[#CCD5DD] placeholder:font-medium placeholder:text-md focus:outline-none invalid:text-[red] invalid:border-[red]"
                                ></input>
                            </label>
                            <br />
                            <label>
                                <span className="block mb-2 text-[#4A4154] font-zillaSlabMedium text-left after:content-['*'] after:ml-1 after:text-[red]">
                                    Nominal :
                                </span>
                                <input
                                    type="text"
                                    name="nominal"
                                    id="nominal"
                                    onChange={nominalHandler}
                                    value={formatRupiah(nominal, "Rp. ")}
                                    placeholder="Ketik Jumlah Dukungan"
                                    className="py-2 w-full block border-b-2 placeholder:text-[#CCD5DD] placeholder:font-medium placeholder:text-md focus:outline-none invalid:text-[red] invalid:border-[red]"
                                ></input>
                                {nominal < 5000 ? (
                                    <span className="block text-left text-red-500 text-sm mt-2">
                                        Nominal minimum adalah Rp5.000
                                    </span>
                                ) : null}
                            </label>
                            <div className="container mt-4">
                                <div className="grid grid-cols-4 gap-2 w-full justify-center">
                                    <div className="col-span-1">
                                        <button className="w-full btn bg-orange-400 hover:bg-orange-500 border-2 border-black text-white font-semibold font-zillaSlabMedium text-xl py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                            10k
                                        </button>
                                    </div>
                                    <div className="col-span-1 ">
                                        <button className="bg-yellow-400 btn w-full hover:bg-yellow-500 border-2 border-black text-white font-semibold font-zillaSlabMedium text-xl py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                            25k
                                        </button>
                                    </div>
                                    <div className="col-span-1">
                                        <button className="bg-blue-400 btn w-full hover:bg-blue-500 border-2 border-black text-white font-semibold font-zillaSlabMedium text-xl py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                            50k
                                        </button>
                                    </div>
                                    <div className="col-span-1">
                                        <button className="bg-[#55A9B4] btn w-full hover:bg-[#196b76] border-2 border-black text-white font-semibold font-zillaSlabMedium text-xl py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                            100k
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <label>
                                <span className="block mb-2 text-[#4A4154] font-zillaSlabMedium text-left after:content-['*'] after:ml-1 after:text-[red]">
                                    Dari :
                                </span>
                                <input
                                    type="text"
                                    name="dari"
                                    onChange={inputHandler}
                                    placeholder="Budiman"
                                    className="py-2 w-full block border-b-2 placeholder:text-[#CCD5DD] placeholder:font-medium placeholder:text-md focus:outline-none invalid:text-[red] invalid:border-[red]"
                                ></input>
                                {!sawer.dari ? (
                                    <span className="block text-left text-red-500 text-sm mt-2">
                                        Nama tidak boleh kosong
                                    </span>
                                ) : null}
                            </label>
                            <br />
                            <label>
                                <span className="block mb-2 text-[#4A4154] font-zillaSlabMedium text-left after:content-['*'] after:ml-1 after:text-[red]">
                                    Email :
                                </span>
                                <input
                                    type="email"
                                    name="email"
                                    onChange={inputHandler}
                                    placeholder="emailku@email.com"
                                    className="py-2 w-full block border-b-2 placeholder:text-[#CCD5DD] placeholder:font-medium placeholder:text-md focus:outline-none invalid:text-[red] invalid:border-[red]"
                                ></input>
                                {!sawer.email ? (
                                    <span className="block text-left text-red-500 text-sm mt-2">
                                        Email tidak boleh kosong
                                    </span>
                                ) : null}
                            </label>
                            <br />
                            <label>
                                <span className="block mb-2 text-[#4A4154] font-zillaSlabMedium text-left after:content-['*'] after:ml-1 after:text-[red]">
                                    Pesan :
                                </span>
                                <input
                                    type="text"
                                    name="pesan"
                                    onChange={inputHandler}
                                    placeholder="Selamat ya"
                                    className="py-2 w-full block border-b-2 placeholder:text-[#CCD5DD] placeholder:font-medium placeholder:text-md focus:outline-none invalid:text-[red] invalid:border-[red]"
                                ></input>
                                {!sawer.pesan ? (
                                    <span className="block text-left text-red-500 text-sm mt-2">
                                        Pesan harus diisi
                                    </span>
                                ) : null}
                            </label>
                            <br />
                            <label>
                                <span className="block mb-2 text-[#4A4154] font-zillaSlabMedium text-left after:content-['*'] after:ml-1 after:text-[red]">
                                    Metode Pembayaran :
                                </span>
                            </label>
                            <br />
                            <div className="grid grid-cols-2 md:grid-cols-4 sm:grid-cols-4 gap-2 w-full justify-center ">
                                <div className="col-span-1 ">
                                    <div
                                        onClick={() => submitHandler("qris")}
                                        className="w-full h-full disabled:cursor-not-allowed bg-green-300 hover:bg-green-500 border-2 border-black text-white font-semibold font-zillaSlabMedium text-xl py-6 px-9 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        <Image src={qrisImage} className="" alt="qris" />
                                    </div>
                                </div>
                                <div className="col-span-1">
                                    <div
                                        onClick={() => submitHandler("ID_LINKAJA")}
                                        className="w-full h-full disabled:cursor-not-allowed bg-green-300 hover:bg-green-500 border-2 border-black text-white font-semibold font-zillaSlabMedium text-xl py-6 px-9 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        linkaja
                                    </div>
                                </div>
                                <div className="col-span-1">
                                    <div
                                        onClick={() => submitHandler("ID_DANA")}
                                        className="w-full  disabled:cursor-not-allowed h-full bg-green-300 hover:bg-green-500 border-2 border-black text-white font-semibold font-zillaSlabMedium text-xl py-6 px-9 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        <Image src={danaImage} className="" alt="qris" />
                                    </div>
                                </div>
                                <div className="col-span-1">
                                    <div
                                        onClick={() => submitHandler("ID_SHOPEEPAY")}
                                        className="w-full  h-full disabled:cursor-not-allowed bg-green-300 hover:bg-green-500 border-2 border-black text-white font-semibold font-zillaSlabMedium text-xl py-6 px-9 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        <Image src={spayImage} className="" alt="qris" />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export async function getServerSideProps(req) {
    const { username } = req.query;
    const res = await fetch(
        "https://backend-sawerku.herokuapp.com/v1/users/" + username
    );
    const errorCode = res.ok ? false : res.status;

    return {
        props: {
            errorCode,
            username,
        },
    };
}

export default Sawer;
