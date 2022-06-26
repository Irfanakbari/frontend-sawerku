import Head from "next/head";
import Navbar from "../../components/navbar";
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import axiosInstance from "../../helper/axios";

const Cashout = (props) => {
  const [saldo, setSaldo] = useState(0);
  const [payout, setPayout] = useState(0);
  const [histori, setHistori] = useState([]);
  useEffect(() => {
    axiosInstance
      .get("https://backend-sawerku.herokuapp.com/v1/user/saldo")
      .then((res) => {
        setSaldo(res.data.data.saldo);
        setPayout(res.data.data.payoutSaldo);
      })
      .then(() => {
        axiosInstance
          .get("https://backend-sawerku.herokuapp.com/v1/user/paymenthistory")
          .then((res) => {
            setHistori(res.data.data);
          })
          .catch((err) => {});
      })
      .catch((err) => {});
  }, []);
  const columns = [
    {
      name: "Tanggal",
      selector: (row) => row.createdAt.split("T")[0],
    },
    {
      name: "Nominal",
      selector: (row) => row.gross,
    },
    {
      name: "Dari",
      selector: (row) => row.dari,
    },
    {
      name: "Pesan",
      selector: (row) => row.pesan,
    },
  ];

  const data = histori;
  return (
    <>
      <Head>
        <title>Cashout | Sawerku</title>
      </Head>
      <Navbar title="Cashout & Saldo">
        <div className="row">
          <div className="grid grid-cols-1 gap-4 m-auto sm:grid-cols-2 content-center h-screen p-4">
            <div className="w-full">
              <div className="w-full md:w-4/6 lg:w-4/6  h-full border-4 mx-auto border-black rounded-2xl text-center overflow-hidden">
                <div className="block text-center font-patrick text-[24px] border-b-4 text-white font-medium border-black bg-[#FAC76C]">
                  <div className="text-center">Total Saldo</div>
                </div>
                <div className="py-10 font-zillaSlabBold text-4xl font-bold">
                  {intToRupiah(saldo) ?? "Rp 0,-"}
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="w-full md:w-4/6 lg:w-4/6  h-full border-4 mx-auto border-black rounded-2xl text-center overflow-hidden">
                <div className="block text-center font-patrick text-[24px] border-b-4 text-white font-medium border-black bg-[#B2E0E6]">
                  <div className="text-center">Siap Dicairkan</div>
                </div>
                <div className="py-10 font-zillaSlabBold text-4xl font-bold">
                  {intToRupiah(payout) ?? "Rp 0,-"}
                </div>
                <button className="bg-[#55A9B4] hover:bg-[#398690] border-2 border-black text-white font-medium font-zillaSlabMedium text-xl py-2 px-4 rounded-xl mb-6 focus:outline-none focus:shadow-outline">
                  Cairkan
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-5 p-8">
          <div className="w-full">
            <div className="w-full border-4 mx-auto border-black rounded-2xl text-center overflow-hidden">
              <div className="block text-center font-patrick text-[24px] border-b-4 text-white font-medium border-black bg-[#B2E0E6]">
                <div className="text-center">Riwayat Transaksi</div>
              </div>
              <div className="m-5">
                <DataTable columns={columns} data={data} pagination />
              </div>
            </div>
          </div>
        </div>
      </Navbar>
    </>
  );
};

function intToRupiah(angka) {
  var rupiah = "";
  var angkarev = angka.toString().split("").reverse().join("");
  for (var i = 0; i < angkarev.length; i++)
    if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + ".";
  return (
    "Rp " +
    rupiah
      .split("", rupiah.length - 1)
      .reverse()
      .join("") +
    ",-"
  );
}

export default Cashout;
