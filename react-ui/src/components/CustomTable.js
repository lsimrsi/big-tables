import React, { useState, useEffect } from 'react';
import { data } from '../data';
import { isFieldVisible, arrayMove } from '../utils/common';
import Button from './Button';

import './CustomTable.css';

const CustomTable = () => {
  const tableRef = React.createRef();
  const theadRef = React.createRef();
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
  const [tableStyle, tableStyleSet] = useState({});
  const padding = 20;
  const interval = 1000 / 60;

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

  useEffect(() => {
    if (tableRef.current) {
      let tableStyle = {};
      let tbl = tableRef.current;
      setTimeout(() => {
        tbl.scrollTo({left: styles.tableScroll, y: 0, behavior: "smooth"});
      }, 50)
      let styles = getStylesFromFilters(filterWeight, filterDimension);
      // tableRef.current.scrollTo({left: styles.tableScroll, y: 0, behavior: "smooth"});
      tableStyle.width = styles.tableWidth;
      tableStyleSet(tableStyle);
    }
  }, [filterWeight, filterDimension]);

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
    let x = (e.clientX + padding) - (draggedHeader.width / 2) - padding;
    let y = tableBounds.y;
    headerPosSet({ x, y });
    theadHeightSet(theadBounds.height);
  }

  const onMouseOverPanelStyle = (isRightPanel) => {
    if (!tableRef) return;
    if (!draggedHeader.key) return;
    let tblRef = tableRef.current;
    let left = isRightPanel ? draggedHeader.width / 8 : -draggedHeader.width / 8;

    scrollIntervalSet(setInterval(() => tblRef.scrollBy({
      left,
      behavior: 'auto'
    }), interval));
  }
  const onMouseOutPanelStyle = () => {
    clearInterval(scrollInterval);
  }

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
      <div className="abs-header" style={absStyle}>{draggedHeader.name}</div>
      <div
        className="panel-left panel"
        style={panelStyle}
        onMouseOver={() => onMouseOverPanelStyle(false)}
        onMouseOut={onMouseOutPanelStyle} />
      <div
        className="panel-right panel"
        style={panelStyle}
        onMouseOver={() => onMouseOverPanelStyle(true)}
        onMouseOut={onMouseOutPanelStyle} />
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


const getStylesFromFilters = (filterWeight, filterDimension) => {
  let styles = {};
  styles.tableWidth = "100%";
  styles.tableScroll = 0;
  styles.borderColor = "#eee";

  if (!filterWeight && !filterDimension) {
    return styles;
  }

  styles.borderColor = "#60e97d";

  let count = 0;
  if (filterWeight && filterDimension) {
    for (let key in data[0]) {
      if (key === "gross_rail_load_weight") {
        styles.tableScroll = (count * 120);
        styles.tableWidth = "100%";
        return styles;
      }
      count++;
    }
  }

  count = 0;
  if (filterWeight) {
    for (let key in data[0]) {
      if (key === "gross_rail_load_weight") {
        styles.tableScroll = (count * 120);
        styles.tableWidth = (120 * 6) + "px";
        return styles;
      }
      count++;
    }
  }
  count = 0;
  if (filterDimension) {
    for (let key in data[0]) {
      if (key === "plate_code") {
        styles.tableScroll = (count * 120);
        styles.tableWidth = (120 * 6) + "px";
        return styles;
      }
      count++;
    }
  }
}