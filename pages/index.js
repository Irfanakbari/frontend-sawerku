import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Jembatan interaksi dengan penontonmu | Sawerku</title>
      </Head>
      <div className="flex items-center justify-center">
        <div className="container lg:w-3/5 sm:w-3/5 border-4 border-black mt-5 mb-5 rounded-lg text-center mx-5 overflow-hidden">
          <div className="flex flex-col font-patrick text-2xl items-center justify-center border-b-4 p-2 text-white font-semibold border-black bg-[#BB6BD9]">
            SAWERKU
          </div>
          <h1 className="mt-4 text-6xl font-patrick">
            Jembatan interaksi dengan penontonmu!
          </h1>
          <br />
          <Link href="/register">
            <button className="bg-[orange] m-3 w-60 hover:bg-[#e2b766] border-2 border-black text-white font-semibold font-zillaSlabMedium text-xl py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Daftar
            </button>
          </Link>
          <Link href="/login">
            <button className="bg-[#55A9B4] m-3 w-60 hover:bg-[#196b76] border-2 border-black text-white font-semibold font-zillaSlabMedium text-xl py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Login
            </button>
          </Link>
          <br />
          <br />
          <div className="text-left ml-4 mr-4 text-[24px] font-zillaSlabLight">
            <p>
              Saweria membantu kamu mendapatkan dukungan finansial dari
              penggemar karyamu dengan moda pembayaran di bawah ini:
            </p>
            <br />
            <p>
              Dana dapat dengan mudah dicairkan ke semua rekening bank di
              Indonesia dan e-wallet (Gopay, OVO, DANA, LinkAja, dan Shopeepay).
            </p>
            <br />
            <p className="text-xl font-bold">Cara Memulai : </p>
            <ul>
              <li>
                <p>
                  <span className="text-xl font-bold">1. </span>
                  Daftarkan dirimu
                </p>
              </li>
              <li>
                <p>
                  <span className="text-xl font-bold">2. </span>
                  Verifikasi akun kamu
                </p>
              </li>
              <li>
                <p>
                  <span className="text-xl font-bold">3. </span>
                  Atur overlay yang ingin digunakan
                </p>
              </li>
              <li>
                <p>
                  <span className="text-xl font-bold">4. </span>
                  Jangan lupa pasang QR code atau link sawerku
                </p>
              </li>
              <li>
                <p>
                  <span className="text-xl font-bold">5. </span>
                  Sapa dan terima dukungan dari penggemarmu!
                </p>
              </li>
            </ul>
            <br />
          </div>
        </div>
      </div>
    </>
  );
}
