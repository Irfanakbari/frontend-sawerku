import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Menu from "../../components/adminmenu";
import { removeCookies,getCookie } from "cookies-next";


const Admin = (props) => {
  const router = useRouter();
  const logoutHandler = () => {
    removeCookies("credentials");
    router.push("/login");
  };
  return (
    <>
      <Head>
        <title>Admin {props.username} | Sawerku</title>
      </Head>
      <div className="flex items-center justify-center relative z-0">
        <div className="container w-11/12 border-4 border-black mt-5 mb-5 rounded-3xl text-center overflow-hidden">
          <div className="flex place-content-between font-patrick px-3 text-[30px] border-b-4 p-2 text-white text-left font-semibold border-black bg-[#BB6BD9]">
            <div className="text-center">Halo, {props.username}</div>
            <div className="text-right">
              <button
                onClick={logoutHandler}
                className="bg-[red] hover:bg-[#a11616] border-2 border-black text-white font-semibold font-zillaSlabMedium text-xl py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
              >
                Logout
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 m-7 sm:grid-cols-2">
            <Menu
              title="Overlay"
              desc="Atur Alert dan overlay lainnya di sini. Kompatibel dengan OBS dan Streamlabs."
              bgwarna="#BDDAA7"
              bghover="#8bb56b"
              to="/admin/overlay"
            />
            <Menu
              title="Cashout & Saldo"
              desc="Lihat histori dukungan yang masuk dan cashout di sini."
              bgwarna="#9DA4CF"
              bghover="#8b94d0"
              to="/admin/cashout"
            />
            <Menu
              title="History Dukungan"
              desc="Lihat histori dukungan yang kamu lakukan."
              bgwarna="#CEC0D8"
              bghover="#c5add5"
              to="/history"
            />
            <Menu
              title="Integration"
              desc="Integrasi dengan aplikasi lainnya."
              bgwarna="#F39467"
              bghover="#e87f4f"
              to="/admin/integration"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps({ req,res }) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )
  const credentials  = getCookie("credentials", { req, res });
  const respon = await fetch("https://backend-sawerku.herokuapp.com/v1/user", {
    method: "GET",
    headers: {
      authorization: `${credentials}`,
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
  const { data } = await respon.json();
  // first word of username uppercase
  const username =
    data.username.charAt(0).toUpperCase() + data.username.slice(1);
  return {
    props: {
      username: username,
    }, // will be passed to the page component as props
  };
}

export default Admin;
