import React, { useState, useEffect } from 'react';
import { data } from '../data';
import { isFieldVisible, arrayMove } from '../utils/common';
import Button from './Button';

import './CustomTable.css';

const CustomTable = () => {
  const [filterWeight, filterWeightSet] = useState(false);
  const [filterDimension, filterDimensionSet] = useState(false);
  const [keys, keysSet] = useState(Object.keys(data[0]));
  const [headers, headersSet] = useState([]);
  const [draggedHeader, draggedHeaderSet] = useState(null);

  useEffect(() => {
    const constructTableHeaders = () => {
      let headers = keys.map((key, index) => {
        return {
          key,
          name: capitalizeFirstLetters(key),
          position: index,
          width: 120,
        }
      });
      headersSet(headers);
    }
    constructTableHeaders();
  }, []);

  const onClickFilterWeight = () => {
    filterWeightSet(!filterWeight);
  }

  const onClickFilterDimension = () => {
    filterDimensionSet(!filterDimension);
  }

  const onMouseDownHeader = (header) => {
    draggedHeaderSet(header);
  }

  const onMouseUpCustomTable = () => {
    draggedHeaderSet(null);
  }

  const onMouseOverDrag = (header) => {
    if (!draggedHeader) return;
    let toIndex = headers.findIndex(hdr => header.key === hdr.key);
    let fromIndex = headers.findIndex(hdr => draggedHeader.key === hdr.key);

    arrayMove(headers, fromIndex, toIndex);
    headersSet([...headers]);
  }

  let tableStyle = {};
  // let winProps = getKeyPosition(filterWeight, filterDimension);
  // tableStyle.transform = `translateX(${winProps.tableTranslate})`;
  let windowStyle = {};
  // windowStyle.maxWidth = winProps.windowWidth;
  // windowStyle.overflowX = winProps.overflowX;
  // windowStyle.borderColor = winProps.borderColor;

  return (
    <div onMouseUp={onMouseUpCustomTable} className="example" id="custom-table">
      <h3>Custom Table</h3>
      <Button active={filterWeight} onClick={onClickFilterWeight}>Filter Weight</Button>
      <Button active={filterDimension} onClick={onClickFilterDimension}>Filter Dimension</Button>
      <div className="window" style={windowStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              {headers.map(header => {
                let isVisible = isFieldVisible(header.key, filterWeight, filterDimension);
                let hide = isVisible ? "" : "hide-field";
                let widthPx = header.width + "px";
                let thStyle = {
                  width: widthPx,
                  maxWidth: widthPx,
                }

                let drag = "";
                if (draggedHeader !== null && draggedHeader.key === header.key) {
                  drag = "drag";
                }
                else if (draggedHeader !== null && draggedHeader.key) {
                  drag = "drag-target";
                }
                return <th
                  onMouseDown={() => onMouseDownHeader(header)}
                  // onMouseUp={() => onMouseUpDrag(header)}
                  onMouseOver={() => onMouseOverDrag(header)}
                  style={thStyle}
                  className={`field-common ${hide} ${drag}`}
                  key={header.key}>
                    {header.name}</th>
              })}
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => {
              return (
                <tr key={i}>
                  {headers.map(header => {
                    let isVisible = isFieldVisible(header.key, filterWeight, filterDimension);
                    let hide = isVisible ? "" : "hide-field";
                    return (
                  <td key={"" + header.key + ":" + item[header.key]} className={"field-common " + hide}>
                        {item[header.key]}
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