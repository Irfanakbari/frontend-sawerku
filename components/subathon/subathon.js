import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

const Subathon = (props) => {
  const [data, setData] = useState({
    jamawal: "5",
    menitawal: "30",
    detikawal: "30",
    bgcolor: "8a90b6",
    txtcolor: "FFFFFF",
    fontweight: "400",
    waktu: [],
  });
  const [tabel, setTabel] = useState([
    {
      gross: "",
      jamplus: "",
      minplus: "",
      secplus: "",
    },
  ]);

  useEffect(() => {
    const datas = localStorage.getItem("subathon");
    const data2 = localStorage.getItem("subathon-tabel");
    const keys = props.keys
    if (datas) {
      setData(JSON.parse(datas));
    }
    if (data2){
      setTabel(JSON.parse(data2));
    }
    if (keys){
      setData({...data, keys: keys})
    }
  }, [props]);

  function handleInputChange(e) {
    const target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    value = value.replace("#", "");
    setData({ ...data, [name]: value });
  }

  function clipBoardHandler() {
    const url = document.getElementById("url").value;
    navigator.clipboard.writeText(url);
    toast.success("URL berhasil disalin");
  }

  function handleSubmit(event) {
    event.preventDefault();
    localStorage.setItem("subathon", JSON.stringify(data));
    localStorage.setItem("subathon-tabel", JSON.stringify(tabel));
    toast.success("Konfigurasi berhasil disimpan", {
      position: "top-right",
      autoClose: 5000,
      theme: "colored",
    });
  }

  const newTabHandler = () => {
    const url = document.getElementById("url").value;
    window.open(url, "_blank");
  };

  const handleChange = (event, i) => {
    let newData = [...tabel];
    const target = event.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    newData[i][name] = value;
    setTabel(newData);
  };

  let addFormFields = () => {
    setTabel([...tabel, { gross: "", jamplus: "", minplus: "", secplus: "" }]);
  };

  let removeFormFields = (i) => {
    let newData = [...tabel];
    newData.splice(i, 1);
    setTabel(newData);
  };

  return (
    <>
      <ToastContainer />
      <div className="w-11/12 mx-auto mt-5 border-2 border-black rounded-xl overflow-hidden">
        <div className="w-full bg-red-400 p-1 border-b-2 font-patrick text-3xl border-black text-white text-center">
          Subathon
        </div>
        <div className="w-full p-4 text-left block font-zillaSlabLight">
          Tampilkan waktu yang tersisa pada Subathon dan tambahkan waktu secara
          otomatis saat ada dukungan yang masuk.
        </div>
        <div className="w-full px-4 text-left block text-2xl font-semibold font-zillaSlabSemiBold">
          Aturan Pertambahan Waktu:
        </div>
        <form onSubmit={handleSubmit}>
          <table className="w-full p-4 text-left block">
            <thead>
              <tr>
                <th className="text-center w-1/4">
                  <div className="text-left block font-zillaSlabLight mb-2">
                    Besar Dukungan
                  </div>
                </th>
                <th className="text-center ">
                  <div className="w-full text-left block font-zillaSlabLight mb-2">
                    Jam
                  </div>
                </th>
                <th className="text-center ">
                  <div className="w-full text-left block font-zillaSlabLight mb-2">
                    Menit
                  </div>
                </th>
                <th className="text-center ">
                  <div className="w-full text-left block font-zillaSlabLight mb-2">
                    Detik
                  </div>
                </th>
                <th className="text-center ">
                  <div className="w-full text-left block font-zillaSlabLight mb-2">
                    Action
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {tabel.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="w-auto text-left">
                      <input
                        className="py-2 border-b-[1px] border-black focus:outline-none"
                        type="number"
                        onChange={(e) => handleChange(e, index)}
                        value={item.gross}
                        name="gross"
                        placeholder="10000"
                      />
                      <span className="text-2xl font-zillaSlabBold m-4">=</span>
                    </td>
                    <td className="w-auto text-left">
                      <input
                        className=" py-2 block border-b-[1px] border-black focus:outline-none"
                        type="number"
                        onChange={(e) => handleChange(e, index)}
                        value={item.jamplus}
                        name="jamplus"
                        placeholder="10000"
                      />
                    </td>
                    <td className="w-auto text-left">
                      <input
                        className=" py-2 block border-b-[1px] border-black focus:outline-none"
                        type="number"
                        onChange={(e) => handleChange(e, index)}
                        value={item.minplus}
                        name="minplus"
                        placeholder="10000"
                      />
                    </td>
                    <td className="w-auto text-left">
                      <input
                        className=" py-2 block border-b-[1px] border-black focus:outline-none"
                        type="number"
                        onChange={(e) => handleChange(e, index)}
                        value={item.secplus}
                        name="secplus"
                        placeholder="10000"
                      />
                    </td>
                    <td className="w-auto text-left">
                      <button type="button"
                        className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
                        onClick={() => removeFormFields(index)}
                      >Hapus
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button type="button"   className="w-full bg-red-400 p-2 text-white text-center font-zillaSlabBold" onClick={addFormFields}>Add</button>
          <div className="grid grid-cols-3 gap-4 w-full px-4 text-left mt-3 mb-3">
            <div className="w-full text-left">
              <label className="text-left font-zillaSlabLight">
                Durasi awal (jam):
              </label>
              <input
                className="w-full py-2 block border-b-[1px] border-black focus:outline-none"
                type="number"
                name="jamawal"
                value={data.jamawal}
                onChange={handleInputChange}
                placeholder="5"
              />
            </div>
            <div className="w-full text-left">
              <label className="text-left font-zillaSlabLight">
                Durasi awal (menit):
              </label>
              <input
                className="w-full py-2 block border-b-[1px] border-black focus:outline-none"
                type="number"
                name="menitawal"
                value={data.menitawal}
                onChange={handleInputChange}
                placeholder="30"
              />
            </div>
            <div className="w-full text-left">
              <label className="text-left font-zillaSlabLight">
                Durasi awal (detik):
              </label>
              <input
                className="w-full py-2 block border-b-[1px] border-black focus:outline-none"
                type="number"
                name="detikawal"
                value={data.detikawal}
                onChange={handleInputChange}
                placeholder="30"
              />
            </div>
            <div className="w-full text-left">
              <label className="text-left font-zillaSlabLight">
                Warna Background:
              </label>
              <input
                className="w-full h-8 block border-b-[1px] border-black focus:outline-none"
                type="color"
                name="bgcolor"
                value={"#" + data.bgcolor}
                onChange={handleInputChange}
                placeholder="#8a90b6"
              />
            </div>
            <div className="w-full text-left">
              <label className="text-left font-zillaSlabLight">
                Warna Text:
              </label>
              <input
                className="w-full h-8 block border-b-[1px] border-black focus:outline-none"
                type="color"
                name="txtcolor"
                value={"#" + data.txtcolor}
                onChange={handleInputChange}
                placeholder="#FFFFFF"
              />
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#" + data.bgcolor,
            }}
            className={`border-[3px] m-4 md:block lg:block border-black rounded-md w-4/6 mx-auto p-6 text-center text-3xl font-medium
              hidden`}
          >
            <span
              className="block mb-2 text-[10vw] p-10"
              style={{
                color: "#" + data.txtcolor,
              }}
            >
              <span className="m-3">
                {data.jamawal.length < 2 ? "0" + data.jamawal : data.jamawal}
              </span>
              <span>:</span>
              <span className="m-3">{data.menitawal}</span>
              <span>:</span>
              <span className="m-3">{data.detikawal}</span>
            </span>
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
            className="w-full py-2  border-b-[1px] font-zillaSlabLight border-black focus:outline-none"
            disabled
            value={
              props.baseurl+"modules/subathon?key=" +
              data.keys +
              "&jamawal=" +
              data.jamawal +
              "&menitawal=" +
              data.menitawal +
              "&detikawal=" +
              data.detikawal +
              "&bgcolor=" +
              data.bgcolor +
              "&txtcolor=" +
              data.txtcolor +
              "&fontweight=" +
              data.fontweight +
              "&rules=" +
              encodeURI(JSON.stringify(tabel))
            }
          />
        </div>
        <div className="w-full px-4 text-left block mb-4">
          <button
            onClick={clipBoardHandler}
            className="border-[3px] rounded-xl border-black bg-blue-400 py-2 px-5 hover:cursor-pointer hover:bg-blue-600 text-xl font-semibold font-patrick text-white"
          >
            Copy to Clipboard
          </button>
          <button
            onClick={newTabHandler}
            className="border-[3px] ml-3 rounded-xl border-black bg-yellow-400 py-2 px-5 hover:cursor-pointer hover:bg-yellow-600 text-xl font-semibold font-patrick text-white"
          >
            Open in New Tab
          </button>
        </div>
      </div>
    </>
  );
};

export default Subathon;
