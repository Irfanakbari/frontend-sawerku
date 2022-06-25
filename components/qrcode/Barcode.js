import React, { useState, useEffect } from "react";
import { QRCode } from "react-qrcode-logo";
import { toast, ToastContainer } from "react-toastify";

const Barcode = (props) => {
    const [config, setConfig] = useState({
        bgColor: "ff0080",
        barcodecolor: "FFFFFF",
    });

    useEffect(() => {
        const data = localStorage.getItem("qrcode");
        if (data) {
            setConfig(JSON.parse(data));
        }
    }, []);

    const handleChange = (e) => {
        const value = e.target.value.replace("#", "");
        setConfig({ ...config, [e.target.name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem("qrcode", JSON.stringify(config));
        toast.success("QR Code berhasil disimpan", {
            position: "top-right",
            autoClose: 5000,
            theme: "colored",
        });
    };
    const clipBoardHandler = () => {
        const url = document.getElementById("url").value;
        navigator.clipboard.writeText(url);
        toast.success("URL berhasil disalin")
    };
    const newTabHandler = () => {
        const url = document.getElementById("url").value;
        window.open(url, "_blank");
    };
    return (
        <>
            <ToastContainer />
            <div className="w-11/12 mx-auto mt-5 border-2 border-black rounded-xl overflow-hidden">
                <div className="w-full bg-red-400 p-1 border-b-2 font-patrick text-3xl border-black text-white text-center">
                    QR Code
                </div>
                <div className="w-full p-4 text-left block font-zillaSlabLight">
                    QR yang menunjuk ke halaman sawerku
                </div>
                <center>
                    <div className='border-4 p-1 border-black w-fit' style={{
                        backgroundColor: "#"+config.bgColor,
                    }}>
                        <div className="flex mx-auto justify-center">
                            <div className="row">
                                <QRCode value={process.env.BASE_URL + props.user} bgColor="transparent" size={250} qrStyle={"dots"} eyeRadius={10} fgColor={
                                    "#"+config.barcodecolor
                                } />
                            </div>
                        </div>
                    </div>
                </center>
                <div className="w-full px-4 text-left block text-2xl font-semibold font-zillaSlabSemiBold">
                    Pengaturan :
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-3 gap-4 w-full px-4 text-left mt-3 mb-3">
                        <div className="w-full text-left">
                            <label className="text-left font-zillaSlabLight">
                                Warna Background:
                            </label>
                            <input
                                className="w-full h-8 block border-b-[1px] border-black focus:outline-none"
                                type="color"
                                onChange={handleChange}
                                value={"#"+config.bgColor}
                                name="bgColor"
                                placeholder="#8a90b6"
                            />
                        </div>
                        <div className="w-full text-left">
                            <label className="text-left font-zillaSlabLight">
                                Warna Barcode:
                            </label>
                            <input
                                className="w-full h-8 block border-b-[1px] border-black focus:outline-none"
                                type="color"
                                onChange={handleChange}
                                value={"#"+config.barcodecolor}
                                name="barcodecolor"
                                placeholder="#FFFFFF"
                            />
                        </div>
                    </div>

                    <div className="w-full px-4 text-left block mb-4">
                        <button
                            type="submit"
                            className="border-[3px] rounded-xl border-black bg-green-300 py-2 px-5 hover:cursor-pointer hover:bg-green-500 text-xl font-semibold font-patrick text-white"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
                <div className="w-full px-4 text-left block text-2xl font-semibold font-zillaSlabSemiBold">
                    URL:
                </div>
                <div className="w-full p-4 text-left block font-zillaSlabLight">
                    Klik tombol Copy dan pastekan URL di Browser Module OBS.
                </div>
                <div className="w-full px-4 text-left block mb-4">
                    <input
                        id="url"
                        type="text"
                        value={`${props.baseurl}modules/BarcodeModule?key=${props.keys}&bgColor=${config.bgColor}&barcodecolor=${config.barcodecolor}&user=${props.user}`}
                        className="w-full py-2  border-b-[1px] font-zillaSlabLight border-black focus:outline-none"
                        disabled
                    />
                </div>
                <div className="w-full px-4 text-left block mb-4">
                    <button onClick={clipBoardHandler} className="border-[3px] rounded-xl border-black bg-blue-400 py-2 px-5 hover:cursor-pointer hover:bg-blue-600 text-xl font-semibold font-patrick text-white">
                        Copy to Clipboard
                    </button>
                    <button onClick={newTabHandler} className="border-[3px] ml-3 rounded-xl border-black bg-yellow-400 py-2 px-5 hover:cursor-pointer hover:bg-yellow-600 text-xl font-semibold font-patrick text-white">
                        Open in New Tab
                    </button>
                </div>
            </div>
        </>
    );
};

export default Barcode;
