import React, { useState } from "react";
import TabelWaktu from "./tabel";

class Subathon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jamawal: "5",
      menitawal: "30",
      detikawal: "30",
      bgcolor: "8a90b6",
      txtcolor: "FFFFFF",
      fontweight: "400",
      waktu: []
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    value = value.replace("#", "");
    this.setState({
      [name]: value,
    });
  }


  componentDidMount() {
    const data = localStorage.getItem("subathon");
    if (data) {
      this.setState(JSON.parse(data));
    }
  }

  clipBoardHandler = () => {
    const url = document.getElementById("url").value;
    navigator.clipboard.writeText(url);
  };

  render() {
    const handleSubmit = (event) => {
      event.preventDefault();
      localStorage.setItem("subathon", JSON.stringify(this.state));
      alert("alert berhasil disimpan");
    };
    return (
      <>
        <div className="w-11/12 mx-auto mt-5 border-2 border-black rounded-xl overflow-hidden">
          <div className="w-full bg-red-400 p-1 border-b-2 font-patrick text-3xl border-black text-white text-center">
            Subathon
          </div>
          <div className="w-full p-4 text-left block font-zillaSlabLight">
            Tampilkan waktu yang tersisa pada Subathon dan tambahkan waktu
            secara otomatis saat ada dukungan yang masuk.
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
                </tr>
              </thead>
              <tbody id="maindata">
                <TabelWaktu />
                <TabelWaktu />
                <TabelWaktu />
                <TabelWaktu />
                <TabelWaktu />
              </tbody>
            </table>
            <div className="grid grid-cols-3 gap-4 w-full px-4 text-left mt-3 mb-3">
              <div className="w-full text-left">
                <label className="text-left font-zillaSlabLight">
                  Durasi awal (jam):
                </label>
                <input
                  className="w-full py-2 block border-b-[1px] border-black focus:outline-none"
                  type="number"
                  name="jamawal"
                  value={this.state.jamawal}
                  onChange={this.handleInputChange}
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
                  value={this.state.menitawal}
                  onChange={this.handleInputChange}
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
                  value={this.state.detikawal}
                  onChange={this.handleInputChange}
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
                  value={"#" + this.state.bgcolor}
                  onChange={this.handleInputChange}
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
                  value={"#" + this.state.txtcolor}
                  onChange={this.handleInputChange}
                  placeholder="#FFFFFF"
                />
              </div>

            </div>

            <div
              style={{
                backgroundColor: "#" + this.state.bgcolor,
              }}
              className={`border-[3px] m-4 md:block lg:block border-black rounded-md w-4/6 mx-auto p-6 text-center text-3xl font-medium
              hidden`}
            >
              <span
                className="block mb-2 text-[10vw] p-10"
                style={{
                  color: "#" + this.state.txtcolor,
                }}
              >
                <span className="m-3">
                  {this.state.jamawal.length < 2
                    ? "0" + this.state.jamawal
                    : this.state.jamawal}
                </span>
                <span>:</span>
                <span className="m-3">{this.state.menitawal}</span>
                <span>:</span>
                <span className="m-3">{this.state.detikawal}</span>
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
              value={"https://sawerku.irfans.me/modules/subathon?key=" + this.props.keys + "&jamawal=" + this.state.jamawal + "&menitawal=" + this.state.menitawal + "&detikawal=" + this.state.detikawal + "&bgcolor=" + this.state.bgcolor + "&txtcolor=" + this.state.txtcolor + "&fontweight=" + this.state.fontweight}
            />
          </div>
          <div className="w-full px-4 text-left block mb-4">
            <button
              onClick={this.clipBoardHandler}
              className="border-[3px] rounded-xl border-black bg-blue-400 py-2 px-5 hover:cursor-pointer hover:bg-blue-600 text-xl font-semibold font-patrick text-white"
            >
              Copy to Clipboard
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default Subathon;
