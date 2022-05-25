import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import TimerModule from "../../components/module/timer";

export default function SubathonModule() {
    const router = useRouter();
    const { key, bgcolor, txtcolor, jamawal, menitawal, detikawal } = router.query;


    return (
        <>
            <div className="w-screen block">
                <TimerModule bgcolor={bgcolor} txtcolor={txtcolor} data={
                    {
                        hour: jamawal,
                        minute: menitawal,
                        second: detikawal,
                    }
                } />
            </div>
        </>
    );
}



