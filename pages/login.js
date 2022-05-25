import Head from "next/head";
import Router from "next/router";
import { useState } from "react";
import { setCookies, getCookie } from "cookies-next";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    postAPI("https://backend-sawerku.herokuapp.com/api/login", {
      email: e.target.email.value,
      password: e.target.password.value,
    }).then((res) => {
      if (res.status === "failed") {
        setLoading(false);
        alert(res.message);
      } else {
        setCookies("credentials", res);
        Router.push("/admin");
      }
    });
  };
  const postAPI = async (url, data) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  };

  return (
    <>
      <Head>
        <title>Login | Sawerku</title>
      </Head>
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
                  placeholder="********"
                  className="py-2 w-full block border-b-2 placeholder:text-[#CCD5DD] placeholder:font-medium placeholder:text-md focus:outline-none invalid:text-[red] invalid:border-[red]"
                ></input>
              </label>
              <br />
              <button className="bg-[#55A9B4] hover:bg-[#196b76] border-2 border-black text-white font-semibold font-zillaSlabMedium text-xl py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline">
                {
                  loading ? "Loading" : "Login"
                }
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};


export async function getServerSideProps({ req, res }) {
  const cooki = getCookie('credentials', { req, res });
  if (cooki) {
    return {
      redirect: {
        permanent: false,
        destination: "/admin",
      },
    };
  }
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default Login;
