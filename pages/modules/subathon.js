import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import TimerModule from "../../components/module/timer";

export default function SubathonModule({props}) {
    const router = useRouter();
    const [rule, setRule] = useState([]);
    const { key, bgcolor, txtcolor, jamawal, menitawal, detikawal, rules } = props;


    return (
        <>
            <div className="w-screen block">
                <TimerModule bgcolor={bgcolor} txtcolor={txtcolor} data={
                    {
                        hour: jamawal,
                        minute: menitawal,
                        second: detikawal,
                    }
                } rule={rules} keys={key} />
            </div>
        </>
    );
}

SubathonModule.getInitialProps =async ({ query }) => {
    const { key, bgcolor, txtcolor, jamawal, menitawal, detikawal, rules } = query;
    var ruless = decodeURI(rules);
    ruless = await JSON.parse(ruless);
    return {
        props: {
            key,
            bgcolor,
            txtcolor,
            jamawal,
            menitawal,
            detikawal,
            rules: ruless,
        }, // will be passed to the page component as props
    }
}




