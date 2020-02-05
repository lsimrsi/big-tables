import React, { useState } from 'react';
import { data } from '../data';
import { isFieldVisible } from '../utils/common';
import Button from './Button';

import './CustomTable.css';

const CustomTable = () => {
  const [filterWeight, filterWeightSet] = useState(false);
  const [filterDimension, filterDimensionSet] = useState(false);

  const onClickFilterWeight = () => {
    filterWeightSet(!filterWeight);
  }

  const onClickFilterDimension = () => {
    filterDimensionSet(!filterDimension);
  }

  let tableStyle = {};
  let winProps = getKeyPosition(filterWeight, filterDimension);
  tableStyle.transform = `translateX(${winProps.tableTranslate})`;
  let windowStyle = {};
  windowStyle.maxWidth = winProps.windowWidth;
  windowStyle.overflowX = winProps.overflowX;
  windowStyle.borderColor = winProps.borderColor;

  return (
    <div className="example" id="window-table">
      <h3>Window Table</h3>
      <Button active={filterWeight} onClick={onClickFilterWeight}>Filter Weight</Button>
      <Button active={filterDimension} onClick={onClickFilterDimension}>Filter Dimension</Button>
      <div className="window" style={windowStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              {Object.keys(data[0]).map(field => {
                let capped = capitalizeFirstLetters(field);
                let isVisible = isFieldVisible(field, filterWeight, filterDimension);
                let hide = isVisible ? "" : "hide-field";
                return <th className={`field-common ${hide}`} key={field}>{capped}</th>
              })}
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => {
              return (
                <tr key={i}>
                  {Object.keys(item).map(field => {
                    let isVisible = isFieldVisible(field, filterWeight, filterDimension);
                    let hide = isVisible ? "" : "hide-field";
                    return (
                  <td key={"" + field + ":" + item[field]} className={"field-common " + hide}>
                        {item[field]}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CustomTable;

function capitalizeFirstLetters(word) {
  let words = word.split('_');
  let cappedWords = [];
  for (let i = 0; i < words.length; i++) {
    let cappedWord = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    cappedWords.push(cappedWord);
  }
  return cappedWords.join(" ");
}


const getKeyPosition = (filterWeight, filterDimension) => {
  let obj = {};
  obj.windowWidth = "100%";
  obj.tableTranslate = "0px";
  obj.overflowX = "auto";
  obj.borderColor = "#eee";

  if (!filterWeight && !filterDimension) {
    return obj;
  }

  obj.overflowX = "auto";
  obj.borderColor = "#60e97d";

  let count = 0;
  if (filterWeight && filterDimension) {
    for (let key in data[0]) {
      if (key === "gross_rail_load_weight") {
        obj.tableTranslate = (-count * 120) + "px";
        obj.windowWidth = (120 * 12) + "px";
        obj.overflowX = "auto";
        return obj;
      }
      count++;
    }
  }

  count = 0;
  if (filterWeight) {
    for (let key in data[0]) {
      if (key === "gross_rail_load_weight") {
        obj.tableTranslate = (-count * 120) + "px";
        obj.windowWidth = (120 * 6) + "px";
        return obj;
      }
      count++;
    }
  }
  count = 0;
  if (filterDimension) {
    for (let key in data[0]) {
      if (key === "plate_code") {
        obj.tableTranslate = (-count * 120) + "px";
        obj.windowWidth = (120 * 6) + "px";
        return obj;
      }
      count++;
    }
  }
}