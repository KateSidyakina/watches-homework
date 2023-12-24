import { Component } from "react";

export default class Watches extends Component {
  render() {
    const { name, time } = this.props.data;

    return (
      <div className="watch">
        <span>{name}</span>
        <span>{time}</span>
        <button onClick={() => this.props.onRemove(name)} type="button">remove</button>
      </div>
    )
  }
}