import { NextResponse } from "next/server";


export default function middleware(req) {
    const {credentials} = req.cookies;
    if (!credentials){
        return NextResponse.redirect("https://sawerku.irfans.me/login");
    }
}