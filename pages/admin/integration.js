import Head from "next/head";
import Navbar from "../../components/navbar";
import { getCookie, removeCookies } from 'cookies-next';
import { toast, ToastContainer } from 'react-toastify';


const Integration = (props) => {
    const discordHandler = async (e) => {
        e.preventDefault();
        const url = e.target.url.value;
        const message = e.target.message.value;

        await fetch(`https://backend-sawerku.herokuapp.com/v1/user/webhook`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `${props.token}`
            },
            body: JSON.stringify({
                discord_url: url,
                discord_message: message
            })
        }).then(res => {
            console.log(res.status);
            if (res.status === 200) {
                toast.success("Successfully integrated with discord", {
                    position: "top-right",
                    autoClose: 2000,
                    theme: "colored",
                    hideProgressBar: true,
                    closeOnClick: true,
                });
            } else {
                toast.error("Failed to integrate with discord", {
                    position: "top-right",
                    autoClose: 2000,
                    theme: "colored",
                    hideProgressBar: true,
                    closeOnClick: true,
                });
            }
        });
    }
    const webhookHandler = async (e) => {
        e.preventDefault();
        const url = e.target.url.value;
        const message = e.target.message.value;

        await fetch(`https://backend-sawerku.herokuapp.com/v1/user/webhook`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `${props.token}`
            },
            body: JSON.stringify({
                webhook_url: url,
                webhook_message: message
            })
        }).then(res => {
            if (res.status === 200) {
                toast.success("Successfully integrated with Webhook", {
                    position: "top-right",
                    autoClose: 2000,
                    theme: "colored",
                    hideProgressBar: true,
                    closeOnClick: true,
                });
            } else {
                toast.error("Failed to integrate with Webhook", {
                    position: "top-right",
                    autoClose: 2000,
                    theme: "colored",
                    hideProgressBar: true,
                    closeOnClick: true,
                });
            }
        });
    }



    return (
        <>
            <Head>
                <title>Cashout | Sawerku</title>
            </Head>
            <ToastContainer />
            <Navbar title="Integration">
                <div className="row mb-5 p-8">
                    <div className="w-full">
                        <div className="w-full border-4 mx-auto border-black rounded-2xl text-center overflow-hidden">
                            <div className="block text-center font-patrick text-[24px] border-b-4 text-white font-medium border-black bg-blue-400">
                                <div className="text-center">Integrasi Discord</div>
                            </div>
                            <div className="m-5">
                                <p className="text-left font-zillaSlabLight text-xl mb-4">Kirimkan alert dukungan kamu sebagai pesan pada channel discord!</p>
                                <form onSubmit={discordHandler}>
                                    <label>
                                        <span className="block mb-2 text-[#4A4154] font-zillaSlabMedium text-left after:content-['*'] after:ml-1 after:text-[red]">
                                            Discord Webhook URL :
                                        </span>
                                        <input
                                            type="text"
                                            name="url"
                                            defaultValue={props.hook[0].discord_hook}
                                            required
                                            placeholder="https://discord.com/api/webhooks/..."
                                            className="py-2 w-full block border-b-2 placeholder:text-[#CCD5DD] placeholder:font-medium placeholder:text-md focus:outline-none invalid:text-[red] invalid:border-[red]"
                                        ></input>
                                    </label>
                                    <br />
                                    <label>
                                        <span className="block mb-2 text-[#4A4154] font-zillaSlabMedium text-left after:content-['*'] after:ml-1 after:text-[red]">
                                            Template Pesan :
                                        </span>
                                        <input
                                            name="message"
                                            type="text"
                                            defaultValue={props.hook[0].discord_message}
                                            required
                                            placeholder="yeey kamu dapat {amount} dari {donatur}"
                                            className="py-2 w-full block border-b-2 placeholder:text-[#CCD5DD] placeholder:font-medium placeholder:text-md focus:outline-none invalid:text-[red] invalid:border-[red]"
                                        ></input>
                                    </label>
                                    <br />
                                    <button className="bg-[#55A9B4] hover:bg-[#196b76] border-2 border-black text-white font-semibold font-zillaSlabMedium text-xl py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline">
                                        Save
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mb-5 p-5">
                    <div className="w-full">
                        <div className="w-full border-4 mx-auto border-black rounded-2xl text-center overflow-hidden">
                            <div className="block text-center font-patrick text-[24px] border-b-4 text-white font-medium border-black bg-yellow-400">
                                <div className="text-center">Integrasi Webhook</div>
                            </div>
                            <div className="m-5">
                                <p className="text-left font-zillaSlabLight text-xl mb-4">Kirimkan alert dukungan kamu sebagai pesan pada webhook milikmu sendiri</p>
                                <form onSubmit={webhookHandler}>
                                    <label>
                                        <span className="block mb-2 text-[#4A4154] font-zillaSlabMedium text-left after:content-['*'] after:ml-1 after:text-[red]">
                                            Webhook URL :
                                        </span>
                                        <input
                                            type="text"
                                            name="url"
                                            required
                                            defaultValue={props.hook[0].webhook}
                                            placeholder="https://domain.com/api/webhooks/..."
                                            className="py-2 w-full block border-b-2 placeholder:text-[#CCD5DD] placeholder:font-medium placeholder:text-md focus:outline-none invalid:text-[red] invalid:border-[red]"
                                        ></input>
                                    </label>
                                    <br />
                                    <label>
                                        <span className="block mb-2 text-[#4A4154] font-zillaSlabMedium text-left after:content-['*'] after:ml-1 after:text-[red]">
                                            Template Pesan :
                                        </span>
                                        <input
                                            name="message"
                                            type="text"
                                            required
                                            defaultValue={props.hook[0].webhook_message}
                                            placeholder="yeey kamu dapat {amount} dari {donatur}"
                                            className="py-2 w-full block border-b-2 placeholder:text-[#CCD5DD] placeholder:font-medium placeholder:text-md focus:outline-none invalid:text-[red] invalid:border-[red]"
                                        ></input>
                                    </label>
                                    <br />
                                    <button className="bg-[#55A9B4] hover:bg-[#196b76] border-2 border-black text-white font-semibold font-zillaSlabMedium text-xl py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline">
                                        Save
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Navbar>

        </>
    )
}

export async function getServerSideProps({ req, res }) {
    const credentials = getCookie("credentials", { req, res });
    const token = JSON.parse(credentials).data.token;
    const respon = await fetch("https://backend-sawerku.herokuapp.com/v1/user/saldo", {
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
    let hook;
    const respon2 = await fetch("https://backend-sawerku.herokuapp.com/v1/user/webhook", {
        method: "GET",
        headers: {
            authorization: `${token}`,
        },
    });
    if (respon2.status === 200) {
        hook = await respon2.json();
        console.log(hook);
    }

    return {
        props: {
            token,
            hook : hook.data
        }, // will be passed to the page component as props
    };
}

export default Integration