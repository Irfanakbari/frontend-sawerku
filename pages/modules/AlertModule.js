import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { io } from "socket.io-client";
import Head from "next/head";

export default function AlertModule() {
  const { key, bgcolor, hgcolor, txtcolor, template, durasinotif, mindonasi } =
    useRouter().query;

  const [queue, setQueue] = useState([]);

  const socket = io("https://backend1.irfans.me")


  useEffect(() => {
    console.log(queue)
    while (queue.length > 0) {
      if (queue.length > 0) {
        const dan = queue.shift();
        if (dan.gross >= mindonasi) {
          document.getElementById("body").style.display = "block";
          document.getElementsByClassName("sender")[0].innerHTML = dan.dari;
          document.getElementsByClassName("gross")[0].innerHTML = dan.gross;
          document.getElementsByClassName("pesan")[0].innerHTML = dan.pesan;
        }
      }
    }
  setTimeout(() => {
    if (queue.length === 0) {
      timeout();
    }
  }, durasinotif);
    function timeout() {
      setTimeout(() => {
        document.getElementById("body").style.display = "none";
      }, durasinotif);
    }
    return () => {
      socket.off();
    }
  }, [durasinotif, mindonasi, queue, socket])


  socket.on("alert" + key, (data) => {
    console.log(data);
    setQueue(queue => [...queue, data]);
  })




  return (
    <>
      <Head>
        <title>Sawerku | Alert Module</title>
      </Head>
      <div
        id="body"
        style={{
          display: "none",
        }}
      >
        <div
          style={{
            backgroundColor: "#" + bgcolor,
          }}
          className={`border-[3px] m-4 border-black rounded-md p-6 text-center text-3xl font-medium`}
        >
          <span className="block mb-2">
            <span
              style={{
                color: "#" + hgcolor,
              }} className="sender"
            >
              Mumu
            </span>{" "}
            <span
              style={{
                color: "#" + txtcolor,
              }}
            >
              {template}
            </span>{" "}
            <span
              style={{
                color: "#" + hgcolor,
              }} className="gross"
            >
              Rp 10.000
            </span>
          </span>
          <span
            style={{
              color: "#" + txtcolor,
            }} className="pesan"
          >
            Semangat Ya !!!
          </span>
        </div>
      </div>
    </>
  );
}
