import { Component, createRef } from "react";
import Watches from "../Watches/Watches";

export default class TimeZones extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeZones: [],
    };

    this.nameRef = createRef();
    this.timeZoneRef = createRef();

    this.onRemove = this.onRemove.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.updateTime = this.updateTime.bind(this);

    this.interval = setInterval(() => this.updateTime(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateTime() {
    this.setState((state) => {
      const updatedTimeZones = state.timeZones.map((timeZone) => ({
        ...timeZone,
        time: this.getTime(timeZone.UTC),
      }));

      return { timeZones: updatedTimeZones };
    });
  }

  onRemove(name) {
    this.setState((state) => {
      return {timeZones: state.timeZones.filter((timeZone) => timeZone.name !== name)}
    })
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState((state) => ({
      timeZones: [
        ...state.timeZones,
        {
          name: this.nameRef.current.value,
          UTC: this.timeZoneRef.current.value,
          time: this.getTime(this.timeZoneRef.current.value),
        },
      ],
    }));
  }

  getTime(UTC) {
    const calculatedHours = () => {
      if (UTC[0] === '+') {
        return (
          new Date().getUTCHours() + Number(UTC.substring(1)) < 10
            ? `0${new Date().getUTCHours() + Number(UTC.substring(1))}`
            : new Date().getUTCHours() + Number(UTC.substring(1))
        );
      } else {
        return new Date().getUTCHours() - Number(UTC.substring(1));
      }
    }
    
    const minutes = new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes();
    const seconds = new Date().getSeconds() < 10 ? `0${new Date().getSeconds()}` : new Date().getSeconds();

    return `${calculatedHours()}:${minutes}:${seconds}`
  }

  render() {
    return (
      <div>
        <form className="form" onSubmit={this.onSubmit}>
          <input ref={this.nameRef}  type="text" placeholder="Название" required />
          <input ref={this.timeZoneRef}  type="text" placeholder="Временная зона" required />

          <button type="submit">Добавить</button>
        </form>

        <div className="watches">
          {this.state.timeZones.map((timeZone) => (
            <Watches data={timeZone} key={timeZone.name} onRemove={this.onRemove} />
          ))}
        </div>
      </div>
    )
  }
}