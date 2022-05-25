import Head from "next/head";
import Navbar from "../../components/navbar";

const Cashout = (props) => {
    return (
        <>
            <Head>
                <title>Cashout | Sawerku</title>
            </Head>
            <Navbar title="Cashout & Saldo">
                <div className="grid grid-cols-1 gap-4 m-auto sm:grid-cols-2 content-center h-screen p-4">
                    <div className="w-full">
                        <div className="w-full md:w-4/6 lg:w-4/6  h-full border-4 mx-auto border-black rounded-2xl text-center overflow-hidden">
                            <div className="block text-center font-patrick text-[24px] border-b-4 text-white font-medium border-black bg-[#FAC76C]">
                                <div className="text-center">Total Saldo</div>
                            </div>
                            <div className="py-10 font-zillaSlabBold text-4xl font-bold">
                                {props.saldo ? props.saldo : "Rp 0,-"}
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="w-full md:w-4/6 lg:w-4/6  h-full border-4 mx-auto border-black rounded-2xl text-center overflow-hidden">
                            <div className="block text-center font-patrick text-[24px] border-b-4 text-white font-medium border-black bg-[#B2E0E6]">
                                <div className="text-center">Siap Dicairkan</div>
                            </div>
                            <div className="py-10 font-zillaSlabBold text-4xl font-bold">
                                {props.saldo ? props.saldo : "Rp 0,-"}
                            </div>
                            <button
                                className="bg-[#55A9B4] hover:bg-[#398690] border-2 border-black text-white font-medium font-zillaSlabMedium text-xl py-2 px-4 rounded-xl mb-6 focus:outline-none focus:shadow-outline"
                            >
                                Cairkan
                            </button>
                        </div>
                    </div>
                </div>
            </Navbar>

        </>
    )
}

export async function getServerSideProps({ req }) {
    const { credentials } = req.cookies;
    const token = JSON.parse(credentials).data.token;
    const respon = await fetch("https://backend-sawerku.herokuapp.com/api/saldo", {
        method: "GET",
        headers: {
            authorization: `${token}`,
        },
    });
    if (respon.statusText !== "OK") {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }
    
    const { data } = await respon.json();
    return {
        props: {
            saldo: intToRupiah(data.saldo)
        }, // will be passed to the page component as props
    };
}

function intToRupiah(angka) {
    var rupiah = "";
    var angkarev = angka
        .toString()
        .split("")
        .reverse()
        .join("");
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

export default Cashout