import axios from "axios";
import React from "react";
import { toast, ToastContainer } from "react-toastify";

class ALert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mindonasi: "10000",
      mintts: "25000",
      mingif: "35000",
      bgcolor: "8a90b6",
      hgcolor: "744FC9",
      txtcolor: "FFFFFF",
      durasinotif: "5000",
      fontweight: "400",
      template: "baru saja memberikan",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  async handleInputChange(event) {
    const target = event.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    value = value.replace("#", "");
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  testAlert = async () => {
    await axios
      .post(
        "https://backend1.irfans.me/v1/alert",
        {
          dari: "admin",
          gross: this.state.mindonasi,
          pesan: "Semangat Ya",
          streamKey: this.props.keys,
        },
      )
      .then((res) => {
        toast.success("Berhasil Kirim Pesan", {
          position: "top-right",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: "toast-success",
        });
      });
  };

  componentDidMount() {
    const data = localStorage.getItem("alert");
    if (data) {
      this.setState(JSON.parse(data));
    }
  }

  clipBoardHandler = () => {
    const url = document.getElementById("url").value;
    navigator.clipboard.writeText(url);
    toast.success("Berhasil Menyalin ke ClipBoard", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  render() {
    const handleSubmit = (event) => {
      event.preventDefault();
      localStorage.setItem("alert", JSON.stringify(this.state));
      toast.success("Berhasil Menyimpan Konfigurasi", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    };
    return (
      <>
        <ToastContainer />
        <div className="w-11/12 mx-auto mt-5 border-2 border-black rounded-xl overflow-hidden">
          <div className="w-full bg-red-400 p-1 border-b-2 font-patrick text-3xl border-black text-white text-center">
            Alert
          </div>
          <div className="w-full p-4 text-left block font-zillaSlabLight">
            Pasang overlay ini untuk mendapatkan notifikasi saat ada dukungan
            yang masuk
          </div>
          <div className="w-full px-4 text-left block text-2xl font-semibold font-zillaSlabSemiBold">
            Pengaturan:
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 gap-4 w-full px-4 text-left mt-3 mb-3">
              <div className="w-full text-left">
                <label className="text-left font-zillaSlabLight">
                  Dukungan minimum untuk notifikasi:
                </label>
                <input
                  className="w-full py-2 block border-b-[1px] border-black focus:outline-none"
                  type="number"
                  name="mindonasi"
                  value={this.state.mindonasi}
                  onChange={this.handleInputChange}
                  placeholder="10000"
                />
              </div>
              <div className="w-full text-left">
                <label className="text-left font-zillaSlabLight">
                  Dukungan minimum untuk Text to Speech:
                </label>
                <input
                  className="w-full py-2 block border-b-[1px] border-black focus:outline-none"
                  type="number"
                  name="mintts"
                  value={this.state.mintts}
                  onChange={this.handleInputChange}
                  placeholder="25000"
                />
              </div>
              <div className="w-full text-left">
                <label className="text-left font-zillaSlabLight">
                  Dukungan minimum untuk menyertakan gif:
                </label>
                <input
                  className="w-full py-2 block border-b-[1px] border-black focus:outline-none"
                  type="number"
                  name="mingif"
                  value={this.state.mingif}
                  onChange={this.handleInputChange}
                  placeholder="35000"
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
                  Warna Highlight:
                </label>
                <input
                  className="w-full h-8 block border-b-[1px] border-black focus:outline-none"
                  type="color"
                  name="hgcolor"
                  value={"#" + this.state.hgcolor}
                  onChange={this.handleInputChange}
                  placeholder="#744FC9"
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
              <div className="w-full text-left">
                <label className="text-left font-zillaSlabLight">
                  Durasi Notifikasi (ms):
                </label>
                <input
                  className="w-full py-2 block border-b-[1px] border-black focus:outline-none"
                  type="number"
                  name="durasinotif"
                  value={this.state.durasinotif}
                  onChange={this.handleInputChange}
                  placeholder="5000"
                />
              </div>
              <div className="w-full text-left">
                <label className="text-left font-zillaSlabLight">
                  Ketebalan Teks:
                </label>
                <input
                  className="w-full py-2 block border-b-[1px] border-black focus:outline-none"
                  type="number"
                  name="fontweight"
                  value={this.state.fontweight}
                  onChange={this.handleInputChange}
                  placeholder="400"
                />
              </div>
              <div className="w-full text-left">
                <label className="text-left font-zillaSlabLight">
                  Template Teks:
                </label>
                <input
                  className="w-full py-2 block border-b-[1px] border-black focus:outline-none"
                  type="text"
                  id="template"
                  name="template"
                  value={this.state.template}
                  onChange={this.handleInputChange}
                  placeholder="baru saja memberikan"
                />
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#" + this.state.bgcolor,
              }}
              className={`border-[3px] m-4 border-black rounded-md p-6 text-center text-3xl font-medium`}
            >
              <span className="block mb-2">
                <span
                  style={{
                    color: "#" + this.state.hgcolor,
                  }}
                >
                  Mumu
                </span>{" "}
                <span
                  style={{
                    color: "#" + this.state.txtcolor,
                  }}
                >
                  {this.state.template}
                </span>{" "}
                <span
                  style={{
                    color: "#" + this.state.hgcolor,
                  }}
                >
                  Rp 10.000
                </span>
              </span>
              <span
                style={{
                  color: "#" + this.state.txtcolor,
                }}
              >
                Semangat Ya !!!
              </span>
            </div>
            <div className="w-full px-4 text-left block text-2xl font-semibold font-zillaSlabSemiBold">
              Filter Kata:
            </div>
            <div className="w-full p-4 text-left block font-zillaSlabLight">
              Pesan dukungan tidak akan ditampilkan jika mengandung kata-kata
              dibawah ini Masukkan 1 kata/frasa per baris.
            </div>
            <div className="w-full px-4 text-left block mb-4">
              <textarea className="w-full py-2 h-[120px] px-4 border-[1px] border-black focus:outline-none" />
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
                this.props.baseurl +
                "modules/AlertModule?key=" +
                this.props.keys +
                "&mindonasi=" +
                this.state.mindonasi +
                "&mintts=" +
                this.state.mintts +
                "&mingif=" +
                this.state.mingif +
                "&durasinotif=" +
                this.state.durasinotif +
                "&bgcolor=" +
                this.state.bgcolor +
                "&hgcolor=" +
                this.state.hgcolor +
                "&txtcolor=" +
                this.state.txtcolor +
                "&fontweight=" +
                this.state.fontweight +
                "&template=" +
                this.state.template
              }
            />
          </div>
          <div className="w-full px-4 text-left block mb-4">
            <button
              onClick={this.clipBoardHandler}
              className="border-[3px] rounded-xl border-black bg-blue-400 py-2 px-5 hover:cursor-pointer hover:bg-blue-600 text-xl font-semibold font-patrick text-white"
            >
              Copy to Clipboard
            </button>
            <button
              onClick={this.testAlert}
              className="border-[3px] rounded-xl ml-3 border-black bg-[orange] py-2 px-5 hover:cursor-pointer hover:bg-[#ae853a] text-xl font-semibold font-patrick text-white"
            >
              Kirim Alert Test
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default ALert;
