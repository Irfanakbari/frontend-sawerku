import { NextResponse } from "next/server";
import { checkCookies } from "cookies-next";

export default function middleware(req, res) {
  // console.log(req.headers.cookie);
  const kuki = checkCookies("refreshToken", {
    req,
    res,
  });
  if (!kuki) {
    return NextResponse.redirect(process.env.BASE_URL + "login");
  }
}
