import axios from "axios";
import Head from "next/head";
import Router from "next/router";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { io } from "socket.io-client";

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [isUsername, setIsUsername] = useState(false);
  const socket = io("https://backend1.irfans.me/");
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post(
        "https://backend1.irfans.me/v1/auth/register",
        {
          email: e.target.email.value,
          password: e.target.password.value,
          username: e.target.username.value,
          key: props.keys,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setLoading(false);
        toast.success(res.message, {
          position: "top-right",
          autoClose: 2000,
          theme: "colored",
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => {
          Router.push("/login");
        }, 2000);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(res, {
          position: "top-right",
          autoClose: 2000,
          theme: "colored",
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const passwordSame = (e) => {
    if (e.target.value !== password) {
      e.target.setCustomValidity("Password tidak sama");
    } else {
      e.target.setCustomValidity("");
    }
  };
  const usernameHandler = (e) => {
    const username = e.target.value;
    socket.emit("usernameready", {
      username: username,
    });
  };
  socket.on("usernameready", (data) => {
    console.log(data);
    if (data.status === "failed") {
      setIsUsername(true);
      document.getElementsByName("username")[0].setCustomValidity(data.message);
    } else {
      setIsUsername(false);
      document.getElementsByName("username")[0].setCustomValidity("");
    }
  });

  return (
    <>
      <Head>
        <title>Register | Sawerku</title>
      </Head>
      <ToastContainer />
      <div className="flex items-center justify-center mt-10 mb-10">
        <div className="container lg:w-2/5 sm:w-3/6 border-4 border-black mt-5 rounded-lg text-center mx-5 overflow-hidden">
          <div className="flex flex-col font-patrick text-2xl items-center justify-center border-b-4 p-2 text-white font-semibold border-black bg-[#BB6BD9]">
            SAWERKU
          </div>
          <h1 className="mt-4 text-[40px] font-zillaSlabSemiBold">REGISTER</h1>
          <br />
          <div className="max-w-lg mx-auto font-inter p-4">
            <form onSubmit={submitHandler}>
              <label>
                <span className="block mb-2 text-[#4A4154] font-zillaSlabMedium text-left after:content-['*'] after:ml-1 after:text-[red]">
                  Email :
                </span>
                <input
                  type="email"
                  name="email"
                  value={props.email}
                  disabled
                  required
                  className="py-2 w-full block border-b-2 placeholder:text-[#CCD5DD] placeholder:font-medium placeholder:text-md focus:outline-none invalid:text-[red] invalid:border-[red]"
                ></input>
              </label>
              <br />
              <label>
                <span className="block mb-2 text-[#4A4154] font-zillaSlabMedium text-left after:content-['*'] after:ml-1 after:text-[red]">
                  Username :
                </span>
                <input
                  type="text"
                  name="username"
                  required
                  onChange={usernameHandler}
                  placeholder="jonikun"
                  className="py-2 w-full block border-b-2 placeholder:text-[#CCD5DD] placeholder:font-medium placeholder:text-md focus:outline-none invalid:text-[red] invalid:border-[red]"
                ></input>
                {isUsername ? (
                  <span className="block text-red-500 text-sm text-left mt-2">
                    Username Sudah Terpakai
                  </span>
                ) : null}
              </label>
              <br />
              <label>
                <span className="block mb-2 text-[#4A4154] font-zillaSlabMedium text-left after:content-['*'] after:ml-1 after:text-[red]">
                  Password :
                </span>
                <input
                  name="password"
                  type="password"
                  required
                  placeholder="********"
                  onChange={passwordHandler}
                  className="py-2 w-full block border-b-2 placeholder:text-[#CCD5DD] placeholder:font-medium placeholder:text-md focus:outline-none invalid:text-[red] invalid:border-[red]"
                ></input>
              </label>
              <br />
              <label>
                <span className="block mb-2 text-[#4A4154] font-zillaSlabMedium text-left after:content-['*'] after:ml-1 after:text-[red]">
                  Konfirmasi Password :
                </span>
                <input
                  name="password2"
                  type="password"
                  required
                  placeholder="********"
                  onChange={passwordSame}
                  className="py-2 w-full block border-b-2 placeholder:text-[#CCD5DD] placeholder:font-medium placeholder:text-md focus:outline-none invalid:text-[red] invalid:border-[red]"
                ></input>
              </label>
              <br />
              <button className="bg-[#55A9B4] hover:bg-[#196b76] border-2 border-black text-white font-semibold font-zillaSlabMedium text-xl py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline">
                {loading ? "Loading" : "Register"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

Login.getInitialProps = async ({ query }) => {
  const { email, key } = query;
  return {
    email,
    keys: key,
  };
};

export default Login;
