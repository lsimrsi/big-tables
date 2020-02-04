import React, { useState } from 'react';
import { data } from '../data';
import { isFieldVisible } from '../utils/common';
import Button from './Button';

import './StickyTable.css';

const StickyTable = () => {
  const [filterWeight, filterWeightSet] = useState(false);
  const [filterDimension, filterDimensionSet] = useState(false);

  const onClickFilterWeight = () => {
    filterWeightSet(!filterWeight);
    filterDimensionSet(false);
  }

  const onClickFilterDimension = () => {
    filterDimensionSet(!filterDimension);
    filterWeightSet(false);
  }

  return (
    <div className="example" id="sticky-table">
      <h3>Sticky Table</h3>
      <Button active={filterWeight} onClick={onClickFilterWeight}>Filter Weight</Button>
      <Button active={filterDimension} onClick={onClickFilterDimension}>Filter Dimension</Button>
      <div className="scroll">
        <table cellspacing="0" cellpadding="0">
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

export default StickyTable;

function capitalizeFirstLetters(word) {
  let words = word.split('_');
  let cappedWords = [];
  for (let i = 0; i < words.length; i++) {
    let cappedWord = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    cappedWords.push(cappedWord);
  }
  return cappedWords.join(" ");
}