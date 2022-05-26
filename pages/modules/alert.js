import { useEffect } from "react";
import { useRouter } from "next/router";
import { io } from "socket.io-client";

export default function AlertModule() {
  const { key, bgcolor, hgcolor, txtcolor, template, durasinotif } =
    useRouter().query;

  const socket = io("https://backend-sawerku.herokuapp.com/")


  useEffect(() => {
    const handleSocket = (dan) => {
      document.getElementById("body").style.display = "block";
      setTimeout(() => {
        document.getElementById("body").style.display = "none";
      }, durasinotif);
    }
    socket.on("alert" + key, (data) => handleSocket(data))

    return () => {
      socket.off("alert" + key)
    }
  }, [socket, key, durasinotif])


  return (
    <>
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
              }}
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
              }}
            >
              Rp 10.000
            </span>
          </span>
          <span
            style={{
              color: "#" + txtcolor,
            }}
          >
            Semangat Ya !!!
          </span>
        </div>
      </div>
    </>
  );
}
