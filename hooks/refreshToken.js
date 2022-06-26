import axios from "axios";
import { setCookies,getCookies, getCookie } from "cookies-next";
import Router from "next/router";

const refreshToken = async () => {
    console.log(getCookie);
    const response =await axios.get("http://localhost:4000/token", {
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${getCookie("credentials")}`,
        },
    });
    console.log(response.data);
    if (response.status === 200) {
        setCookies("credentials", response.data.token);
        Router.push("/admin");
    } else {
        Router.push("/login");
    }
    return response.data.token;
}

export default refreshToken;
