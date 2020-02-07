import React, { useState, useEffect } from 'react';
import { data } from '../data';
import { isFieldVisible, arrayMove } from '../utils/common';
import Button from './Button';

import './CustomTable.css';

const CustomTable = () => {
  const tableRef = React.createRef();
  const theadRef = React.createRef();
  const windowRef = React.createRef();
  const [filterWeight, filterWeightSet] = useState(false);
  const [filterDimension, filterDimensionSet] = useState(false);
  const [keys, keysSet] = useState(Object.keys(data[0]));
  const [headers, headersSet] = useState([]);
  const [draggedHeader, draggedHeaderSet] = useState({
    key: "",
    name: "",
    width: 120,
  });
  const [headerPos, headerPosSet] = useState({ x: 0, y: 0 });
  const [theadHeight, theadHeightSet] = useState(0);
  const [scrollInterval, scrollIntervalSet] = useState(0);

  useEffect(() => {
    const constructTableHeaders = () => {
      let headers = keys.map((key) => {
        return {
          key,
          name: capitalizeFirstLetters(key),
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

  const onMouseUpCustomTable = () => {
    // let rect = e.target.getBoundingClientRect();
    // headerPosSet({ x: rect.left, y: rect.top });
    clearInterval(scrollInterval);
    draggedHeaderSet({
      key: "",
      name: "",
      width: 120,
    });
  }

  const onMouseDownHeader = (header) => {
    draggedHeaderSet(header);
  }

  const onMouseOverHeader = (header) => {
    if (!draggedHeader.key) return;
    let toIndex = headers.findIndex(hdr => header.key === hdr.key);
    let fromIndex = headers.findIndex(hdr => draggedHeader.key === hdr.key);

    arrayMove(headers, fromIndex, toIndex);
    headersSet([...headers]);
  }

  const onMouseMoveHeader = (e) => {
    let tableBounds = tableRef.current.getBoundingClientRect();
    let theadBounds = theadRef.current.getBoundingClientRect();
    let padding = 20;
    let x = (e.clientX + padding) - (draggedHeader.width / 2) - padding;
    let y = tableBounds.y;
    headerPosSet({ x, y });
    theadHeightSet(theadBounds.height);
  }

  const onMouseOverPanelStyle = (isRightPanel) => {
    if (!windowRef.current) return;
    if (!draggedHeader.key) return;
    let wnRef = windowRef.current;
    let amt = 1000/60;
    let left = isRightPanel ? amt/2 : -amt/2;

    scrollIntervalSet(setInterval(() => wnRef.scrollBy({
      left,
      behavior: 'auto'
    }), amt));
  }
  const onMouseOutPanelStyle = () => {
    clearInterval(scrollInterval);
  }

  let tableStyle = {};
  let winProps = getKeyPosition(filterWeight, filterDimension);
  // tableStyle.transform = `translateX(${winProps.tableTranslate})`;
  let windowStyle = {};
  // windowStyle.maxWidth = winProps.windowWidth;
  // windowStyle.overflowX = winProps.overflowX;
  // windowStyle.borderColor = winProps.borderColor;

  let absStyle = {};
  // absStyle.left = headerPos.x + "px";
  // absStyle.top = headerPos.y + "px";
  // absStyle.width = draggedHeader.width + "px";
  // absStyle.height = theadHeight;
  // absStyle.maxHeight = theadHeight;

  let panelStyle = {};
  if (draggedHeader.key) {
    panelStyle.display = "initial";
    // absStyle.opacity = 1;
  }

  return (
    <div onMouseUp={onMouseUpCustomTable} className="example" id="custom-table">
      <h3>Custom Table</h3>
      <Button active={filterWeight} onClick={onClickFilterWeight}>Filter Weight</Button>
      <Button active={filterDimension} onClick={onClickFilterDimension}>Filter Dimension</Button>
      <div className="window" style={windowStyle} ref={windowRef}>
        <div className="abs-header" style={absStyle}>{draggedHeader.name}</div>
        <div
          className="panel-left panel"
          style={panelStyle}
          onMouseOver={() => onMouseOverPanelStyle(false)}
          onMouseOut={onMouseOutPanelStyle}/>
        <div
          className="panel-right panel"
          style={panelStyle}
          onMouseOver={() => onMouseOverPanelStyle(true)}
          onMouseOut={onMouseOutPanelStyle}/>
        <table ref={tableRef} style={tableStyle} onMouseMove={onMouseMoveHeader}>
          <thead ref={theadRef}>
            <tr>
              {headers.map(header => {
                let isVisible = isFieldVisible(header.key, filterWeight, filterDimension);
                let hide = isVisible ? "" : "hide-field";
                let widthPx = header.width + "px";
                let thStyle = {
                  width: widthPx,
                }

                let drag = "";
                if (draggedHeader.key === header.key) {
                  drag = "drag";
                }
                return <th
                  key={header.key}
                  onMouseDown={() => onMouseDownHeader(header)}
                  onMouseOver={() => onMouseOverHeader(header)}
                  style={thStyle}
                  className={`${hide} ${drag}`}
                >{header.name}</th>
              })}
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => {
              if (i > 20) return;
              return (
                <tr key={i}>
                  {headers.map(header => {
                    let isVisible = isFieldVisible(header.key, filterWeight, filterDimension);
                    let hide = isVisible ? "" : "hide-field";
                    return (
                      <td key={"" + header.key + ":" + item[header.key]} className={"" + hide}>
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