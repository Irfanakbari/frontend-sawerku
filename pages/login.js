import Head from "next/head";
import Router from "next/router";
import { useState, useEffect } from "react";
import { setCookies, checkCookies, getCookie } from "cookies-next";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const Login = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem("token");
    const refreshToken = getCookie("refreshToken");
    if (session && refreshToken) {
      Router.push("/admin");
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post("https://backend1.irfans.my.id/v1/auth/login", {
        email: e.target.email.value,
        password: e.target.password.value,
      })
      .then((res) => {
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 2000,
          theme: "colored",
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        if (!checkCookies("refreshToken")) {
          setCookies("refreshToken", res.data.data.rtoken, {
            maxAge: 60 * 60 * 24 * 30,
            secure: true,
            domain: "irfans.my.id",
          });
        }
        // setCookies("token", res.data.data.token, {
        //   maxAge: 60,
        // });
        localStorage.setItem("token", res.data.data.token);
        Router.push("/admin");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err, {
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

  return (
    <>
      <Head>
        <title>Login | Sawerku</title>
      </Head>
      <ToastContainer />
      <div className="flex items-center justify-center h-screen">
        <div className="container lg:w-2/5 sm:w-3/6 border-4 border-black mt-5 rounded-lg text-center mx-5 overflow-hidden">
          <div className="flex flex-col font-patrick text-2xl items-center justify-center border-b-4 p-2 text-white font-semibold border-black bg-[#BB6BD9]">
            SAWERKU
          </div>
          <h1 className="mt-4 text-[40px] font-zillaSlabSemiBold">LOGIN</h1>
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
                  required
                  placeholder="emailku@pribadi.com"
                  className="py-2 w-full block border-b-2 placeholder:text-[#CCD5DD] placeholder:font-medium placeholder:text-md focus:outline-none invalid:text-[red] invalid:border-[red]"
                ></input>
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
                  className="py-2 w-full block border-b-2 placeholder:text-[#CCD5DD] placeholder:font-medium placeholder:text-md focus:outline-none invalid:text-[red] invalid:border-[red]"
                ></input>
              </label>
              <br />
              <button className="bg-[#55A9B4] hover:bg-[#196b76] border-2 border-black text-white font-semibold font-zillaSlabMedium text-xl py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline">
                {loading ? "Loading" : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
