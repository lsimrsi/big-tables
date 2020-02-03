import React, {useState} from 'react';
import './Button.css';

const Button = (props) => {
  let active = props.active ? "filter-active" : "";
  return (
    <button className={active} onClick={props.onClick}>{props.children}</button>
  )
}

export default Button;