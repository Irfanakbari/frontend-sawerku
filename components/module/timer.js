import { useState, useEffect } from "react"

const TimerModule = (props) => {
    const [time, setTime] = useState({
        hour: props.data.hour,
        minute: props.data.minute,
        second: props.data.second,

    });
    const [isStart, setIsStart] = useState(false);

    useEffect(() => {
        let inteval;
        if (isStart) {
            inteval = setInterval(() => {
                let { hour, minute, second } = time;
                if (second > 0) {
                    second--;
                } else {
                    if (minute > 0) {
                        minute--;
                        second = 59;
                    } else {
                        if (hour > 0) {
                            hour--;
                            minute = 59;
                            second = 59;
                        }
                    }
                }
                setTime({
                    hour,
                    minute,
                    second,
                });
            }, 1000);
        }
        return () => clearInterval(inteval);
    }, [time, isStart]);

    return (
        <>
            <div
                style={{
                    backgroundColor: "#" + props.bgcolor,
                }}
                className={`border-[3px] m-4 border-black rounded-md w-11/12 mx-auto p-6 text-center text-3xl font-medium`}
            >
                <span
                    className="block mb-2 text-[10vw] p-10"
                    style={{
                        color: "#" + props.txtcolor,
                    }}
                >
                    <span className="m-3 jam">
                        {time.hour < 10 ? "0" + time.hour : time.hour}
                    </span>
                    <span>:</span>
                    <span className="m-3 menit">
                        {time.minute < 10 ? "0" + time.minute : time.minute}
                    </span>
                    <span>:</span>
                    <span className="m-3 detik transition">{
                        time.second < 10 ? "0" + time.second : time.second
                    }</span>
                </span>
            </div>
            <button
                className="m-4 float-right text-center block w-full"
                onClick={() => setIsStart(!isStart)}
            >
                {
                    isStart ? "Stop" : "Start"
                }
            </button>
        </>
    )
}

export default TimerModule