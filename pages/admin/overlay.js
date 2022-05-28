import Navbar from "../../components/navbar";
import Head from "next/head";
import React, { useState } from "react";
import ALert from "../../components/alert";
import Subathon from "../../components/subathon/subathon";
import { removeCookies } from "cookies-next";
import Barcode from "../../components/qrcode/qrcode";

const Overlay = (props) => {
  const [getCurrentMenu, setCurrentMenu] = useState(0);

  const changeMenu = (index) => {
    setCurrentMenu(index);
  };
  return (
    <>
      <Head>
        <title>Overlay | Sawerku</title>
      </Head>
      <Navbar title="Overlay">
        <div className="mt-5 mb-5 p-4  w-full">
          <div className="justify-center grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4  gap-3 ">
            <div
              onClick={() => changeMenu(0)}
              className="border-2 bg-[#8a90b6] hover:bg-[#8089c0] rounded-lg hover:cursor-pointer w-auto text-white p-3 px-5 text-center"
            >
              Alert
            </div>
            <div
              onClick={() => changeMenu(1)}
              className="border-2 bg-[#8a90b6] hover:bg-[#8089c0] rounded-lg hover:cursor-pointer w-auto text-center text-white p-3 px-5"
            >
              Subathon
            </div>
            <div
              onClick={() => changeMenu(2)}
              className="border-2 bg-[#8a90b6] hover:bg-[#8089c0] rounded-lg hover:cursor-pointer w-auto text-center text-white p-3 px-5"
            >
              QR Code
            </div>
            <div
              onClick={() => changeMenu(3)}
              className="border-2 bg-[#8a90b6] hover:bg-[#8089c0] rounded-lg hover:cursor-pointer w-auto text-center text-white p-3 px-5"
            >
              Voting
            </div>
            <div
              onClick={() => changeMenu(4)}
              className="border-2 bg-[#8a90b6] hover:bg-[#8089c0] rounded-lg hover:cursor-pointer w-auto text-center text-white p-3 px-5"
            >
              MediaShare
            </div>
            <div
              onClick={() => changeMenu(5)}
              className="border-2 bg-[#8a90b6] hover:bg-[#8089c0] rounded-lg hover:cursor-pointer w-auto text-center text-white p-3 px-5"
            >
              Milestone
            </div>
            <div
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
            </div>
          </div>
          <br />

        </div>
        {getCurrentMenu === 0 ? (
          <ALert keys={props.streamkey} />
        ) : getCurrentMenu === 1 ? (
          <Subathon keys={props.streamkey} />
        ) : getCurrentMenu === 2 ? (
          <Barcode user={props.username} keys={props.streamkey} />
        ) : null
        }
        <br />
      </Navbar>
    </>
  );
};

export async function getServerSideProps({ req, res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  const { credentials } = req.cookies;
  const token = JSON.parse(credentials).data.token;
  const respon = await fetch("https://backend-sawerku.herokuapp.com/api/streamkey", {
    method: "GET",
    headers: {
      authorization: `${token}`,
    },
  });
  if (respon.statusText !== "OK") {
    removeCookies("credentials", { req, res });
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const { data, username } = await respon.json();
  return {
    props: {
      streamkey: data.streamKey,
      username: username
    }, // will be passed to the page component as props
  };
}

export default Overlay;
