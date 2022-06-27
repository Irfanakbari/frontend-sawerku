import Navbar from "../../components/navbar";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import ALert from "../../components/alert/alert";
import Subathon from "../../components/subathon/subathon";
import Barcode from "../../components/qrcode/qrcode";
import axiosInstance from "../../helper/axios";

const Overlay = (props) => {
  const [CurrentMenu, setCurrentMenu] = useState(0);
  const [streamKey, setStreamKey] = useState("");
  const [username, setUsername] = useState("");
  useEffect(() => {
    axiosInstance
      .get("https://backend1.irfans.my.id/v1/user/streamkey")
      .then((res) => {
        setStreamKey(res.data.data.streamKey);
        setUsername(res.data.username);
      })
      .catch((err) => {});
  }, []);

  return (
    <>
      <Head>
        <title>Overlay | Sawerku</title>
      </Head>
      <Navbar title="Overlay">
        <div className="mt-5 mb-5 p-4  w-full">
          <div className="justify-center grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4  gap-3 ">
            <div
              onClick={() => setCurrentMenu(0)}
              className="border-2 bg-[#8a90b6] hover:bg-[#8089c0] rounded-lg hover:cursor-pointer w-auto text-white p-3 px-5 text-center"
            >
              Alert
            </div>
            <div
              onClick={() => setCurrentMenu(1)}
              className="border-2 bg-[#8a90b6] hover:bg-[#8089c0] rounded-lg hover:cursor-pointer w-auto text-center text-white p-3 px-5"
            >
              Subathon
            </div>
            <div
              onClick={() => setCurrentMenu(2)}
              className="border-2 bg-[#8a90b6] hover:bg-[#8089c0] rounded-lg hover:cursor-pointer w-auto text-center text-white p-3 px-5"
            >
              QR Code
            </div>
            {/* <div
              onClick={() => changeMenu(3)}
              className="border-2 bg-[#8a90b6] hover:bg-[#8089c0] rounded-lg hover:cursor-pointer w-auto text-center text-white p-3 px-5"
            >
              Voting
            </div> */}
            {/* <div
              onClick={() => changeMenu(4)}
              className="border-2 bg-[#8a90b6] hover:bg-[#8089c0] rounded-lg hover:cursor-pointer w-auto text-center text-white p-3 px-5"
            >
              MediaShare
            </div> */}
            <div
              onClick={() => setCurrentMenu(5)}
              className="border-2 bg-[#8a90b6] hover:bg-[#8089c0] rounded-lg hover:cursor-pointer w-auto text-center text-white p-3 px-5"
            >
              Milestone
            </div>
            {/* <div
              onClick={() => changeMenu(6)}
              className="border-2 bg-[#8a90b6] hover:bg-[#8089c0] rounded-lg hover:cursor-pointer w-auto text-center text-white p-3 px-5"
            >
              Leaderboard
            </div>
            <div
              onClick={() => changeMenu(7)}
              className="border-2 bg-[#8a90b6] hover:bg-[#8089c0] rounded-lg hover:cursor-pointer w-auto text-center text-white p-3 px-5"
            >
              Running Text
            </div> */}
          </div>
          <br />
        </div>
        {CurrentMenu === 0 ? (
          <ALert keys={streamKey} baseurl={props.baseURL} />
        ) : CurrentMenu === 1 ? (
          <Subathon keys={streamKey} baseurl={props.baseURL} />
        ) : CurrentMenu === 2 ? (
          <Barcode user={username} keys={streamKey} baseurl={props.baseURL} />
        ) : null}
        <br />
      </Navbar>
    </>
  );
};

export async function getServerSideProps({ req, res }) {
  const baseURL = process.env.BASE_URL;
  return {
    props: {
      baseURL: baseURL,
    }, // will be passed to the page component as props
  };
}

export default Overlay;
