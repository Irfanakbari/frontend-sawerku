import { NextResponse } from "next/server";
import { checkCookies } from 'cookies-next';



export default function middleware(req,res) {
    const kuki = checkCookies('credentials', {
        req,
        res,
    });
    if (!kuki) {
        return NextResponse.redirect("http://localhost:3000/login");
    }
}