import { io } from "socket.io-client";
import { useEffect } from "react";
import { useRouter } from "next/router";
let socket;

export default function AlertModule() {
  const { key, bgcolor, hgcolor, txtcolor, template, durasinotif } = useRouter().query;
  var queue = [];
  function immutablePush(newEntry) {
    return queue.push(newEntry);
  }

  useEffect(() => {
    socket = io("https://backend-sawerku.herokuapp.com/");
    socket.on(
      "alert" + key,
      async (data) => {
        console.log(data);
      },
      []
    );
  });


  return (
    <>
      <div className="body" style={{
        display: "none",
      }}>
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
