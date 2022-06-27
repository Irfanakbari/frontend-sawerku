import { io } from "socket.io-client";
import React from "react";

class TimerModule extends React.Component {
  constructor(props) {
    super(props);
    this.rule = this.props.rule;
    this.state = {
      hour: this.props.data.hour,
      minute: this.props.data.minute,
      second: this.props.data.second,
      isStart: false,
      isEdit: false,
    };
    this.countdown = 0;
    this.socket = io("https://backend1.irfans.my.id/");
    this.socket.on("subathon" + this.props.keys, (data) => {
      this.addTime(data.nominal);
    });
    this.timer = this.timer.bind(this);
  }

  componentWillUnmount() {
    this.socket.off("subathon" + this.props.keys);
  }

  addTime = (nominal) => {
    let temp;
    for (let value of this.rule) {
      if (nominal >= parseInt(value.gross)) {
        temp = value;
      }
    }
    let { hour, minute, second } = this.state;
    if (parseInt(second) + parseInt(temp.secplus) >= 60) {
      second = parseInt(second) + parseInt(temp.secplus) - 60;
      minute++;
    } else {
      second = parseInt(second) + parseInt(temp.secplus);
    }
    if (parseInt(minute) + parseInt(temp.minplus) >= 60) {
      minute = parseInt(minute) + parseInt(temp.minplus) - 60;
      hour++;
    } else {
      minute = parseInt(minute) + parseInt(temp.minplus);
    }
    hour = parseInt(hour) + parseInt(temp.jamplus);
    this.setState({
      hour: hour,
      minute: minute,
      second: second,
    });
  };

  timer = () => {
    if (this.countdown == 0) {
      this.countdown = setInterval(() => {
        let { hour, minute, second } = this.state;
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
        this.setState({
          hour,
          minute,
          second,
        });
      }, 1000);
    } else {
      clearInterval(this.countdown);
      this.countdown = 0;
    }
  };

  setIsStart = (isStart) => {
    this.setState({
      isStart,
    });
    this.timer();
  };

  setIsEdit = (isEdit) => {
    this.setState({
      isEdit,
    });
  };

  submitEdit = (e) => {
    e.preventDefault();
    let jam = document.getElementById("jam").value;
    let menit = document.getElementById("menit").value;
    let detik = document.getElementById("detik").value;
    let time = {
      hour: parseInt(this.state.hour) + parseInt(jam),
      minute: parseInt(this.state.minute) + parseInt(menit),
      second: parseInt(this.state.second) + parseInt(detik),
    };
    this.setState({
      hour: time.hour,
      minute: time.minute,
      second: time.second,
    });
  };

  render() {
    return (
      <>
        <div
          style={{
            backgroundColor: "#" + this.props.bgcolor,
          }}
          className={`border-[3px] m-4 border-black rounded-md w-11/12 mx-auto p-6 text-center text-3xl font-medium`}
        >
          <span
            className="block mb-2 text-[10vw] p-10"
            style={{
              color: "#" + this.props.txtcolor,
            }}
          >
            <span className="m-3 jam">
              {this.state.hour < 10 ? "0" + this.state.hour : this.state.hour}
            </span>
            <span>:</span>
            <span className="m-3 menit">
              {this.state.minute < 10
                ? "0" + this.state.minute
                : this.state.minute}
            </span>
            <span>:</span>
            <span className="m-3 detik transition">
              {this.state.second < 10
                ? "0" + this.state.second
                : this.state.second}
            </span>
          </span>
        </div>
        <div className="w-full justify-center flex">
          <button
            className="m-4 text-center "
            onClick={() => this.setIsStart(!this.state.isStart)}
          >
            {this.state.isStart ? "Stop" : "Start"}
          </button>
          <button
            className="m-4 text-center"
            onClick={() => this.setIsEdit(!this.state.isEdit)}
          >
            {this.state.isEdit ? "Close" : "Edit"}
          </button>
        </div>
        {this.state.isEdit ? (
          <div className="w-full justify-center flex">
            <form onSubmit={this.submitEdit}>
              <label className="m-4 text-center">
                {" "}
                Jam
                <input
                  type="number"
                  id="jam"
                  className="m-4 text-center border-black border-2"
                  defaultValue={0}
                />
              </label>
              <label className="m-4 text-center">
                {" "}
                Menit
                <input
                  type="number"
                  id="menit"
                  className="m-4 text-center border-black border-2"
                  defaultValue={0}
                />
              </label>
              <label className="m-4 text-center">
                {" "}
                Detik
                <input
                  type="number"
                  id="detik"
                  className="m-4 text-center border-black border-2"
                  defaultValue={0}
                />
              </label>
              <button
                type="submit"
                className="block p-2 text-center m-auto rounded px-5 bg-orange-400"
              >
                Save
              </button>
            </form>
          </div>
        ) : null}
      </>
    );
  }
}

export default TimerModule;
