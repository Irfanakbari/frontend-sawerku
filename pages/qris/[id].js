import { QRCodeSVG } from 'qrcode.react';
import Error from "next/error";


const Qris = (props) => {
    const {
        qris
    } = props;
    if (!qris) {
        return <Error statusCode={props.errorCode} />;
    }
    return (
        <div className='flex items-center justify-center h-screen'>
            <div className="qris m-auto p-5 rounded border-2 border-black bg-orange-500">
                <div className="container">
                    <div className="text-center">
                        <center>
                        <QRCodeSVG value={qris} size={300} bgColor="transparent" fgColor="white" level='Q' />,
                        </center>
                        <p className='text-white text-lg '>Silahkan Scan dengan Aplikasi E-Wallet Anda</p>
                    </div>
                </div>
            </div>
        </div>
    );
}



export async function getServerSideProps(req, res) {
    const { id } = req.query;
    const ress = await fetch(
        "https://backend-sawerku.herokuapp.com/api/payments/xendit/qr/qr/get",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: id
            }),
        }
    );
    const { data } = await ress.json();
    const qris = data.qr_string;
    return {
        props: {
            qris: qris
        },
    };
}

export default Qris;