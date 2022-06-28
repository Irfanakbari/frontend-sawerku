import { QRCode } from "react-qrcode-logo";
import Error from "next/error";
import axios from "axios";

const Qris = (props) => {
  const { qris } = props;
  if (!qris) {
    return <Error statusCode={props.errorCode} />;
  }
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="qris m-auto p-3 rounded border-4 border-black bg-orange-500">
        <div className="container">
          <div className="text-center">
            <center>
              <QRCode
                value={qris}
                bgColor="transparent"
                size={350}
                qrStyle={"dots"}
                eyeRadius={10}
                fgColor={"white"}
              />
            </center>
            <p className="text-white text-2xl mt-4 font-zillaSlabSemiBold ">
              Scan dengan Aplikasi E-Wallet Anda
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(req, res) {
  const { id } = req.query;
  const ress = await axios.post(
    "https://backend1.irfans.me/v1/payments/xendit/getqr",
    {
      id: id,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const { data } = await ress.data
  const qris = data.qr_string;
  return {
    props: {
      qris: qris,
    },
  };
}

export default Qris;
