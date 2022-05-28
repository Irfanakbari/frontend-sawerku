import { useRouter } from "next/router";
import { QRCode } from "react-qrcode-logo";
import Head from "next/head";


export default function BarcodeModule() {
    const { key, bgColor, barcodecolor, user } = useRouter().query;
    return (
        <>
            <Head>
                <title>Sawerku | Barcode Module</title>
            </Head>
            <div className='border-4 p-1 border-black w-fit m-4' style={{
                backgroundColor: "#" + bgColor
            }}>
                <div className="flex mx-auto justify-center">
                    <div className="row">
                        <QRCode value={"https://sawerku.irfans.me/" + user} bgColor="transparent" size={300} qrStyle={"dots"} eyeRadius={10} fgColor={
                            "#" + barcodecolor
                        } />
                    </div>
                </div>
            </div>
        </>
    )
}
