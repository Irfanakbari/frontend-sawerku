import { useState, useEffect } from "react"

const TimerModule = (props) => {
    const [time, setTime] = useState({
        hour: props.data.hour,
        minute: props.data.minute,
        second: props.data.second,

    });
    const [isStart, setIsStart] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

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

    const submitEdit = (e) => {
        e.preventDefault();
        var jam = document.getElementById("jam").value;
        var menit = document.getElementById("menit").value;
        var detik = document.getElementById("detik").value;
        setTime({
            hour: parseInt(time.hour) + parseInt(jam),
            minute: parseInt(time.minute) + parseInt(menit),
            second: parseInt(time.second) + parseInt(detik),
        });
        setIsEdit(false);
    };


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
            <div className="w-full justify-center flex">
                <button
                    className="m-4 text-center "
                    onClick={() => setIsStart(!isStart)}
                >
                    {
                        isStart ? "Stop" : "Start"
                    }
                </button>
                <button
                    className="m-4 text-center"
                    onClick={() => setIsEdit(!isEdit)}
                >
                    {
                        isEdit ? "Close" : "Edit"
                    }
                </button>
            </div>
            {
                isEdit ? (<div className="w-full justify-center flex">
                    <form onSubmit={submitEdit}>
                        <label className="m-4 text-center"> Jam
                            <input type="number" id="jam" className="m-4 text-center border-black border-2" defaultValue={0} />
                        </label>
                        <label className="m-4 text-center"> Menit
                            <input type="number" id="menit" className="m-4 text-center border-black border-2" defaultValue={0}  />
                        </label>
                        <label className="m-4 text-center"> Detik
                            <input type="number" id="detik" className="m-4 text-center border-black border-2" defaultValue={0} />
                        </label>
                        <button type="submit" className="block p-2 text-center m-auto rounded px-5 bg-orange-400">Save</button>
                    </form>
                </div>) : null
            }
        </>
    )
}

export default TimerModule