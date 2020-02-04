import React, { useState } from 'react';
import { data } from '../data';
import Record from './Record';
import './LongGrid.css';
import Button from './Button';
import {isFieldVisible} from '../utils/common';

const LongGrid = () => {
  const [filterWeight, filterWeightSet] = useState(false);
  const [filterDimension, filterDimensionSet] = useState(false);

  const onClickFilterWeight = () => {
    filterWeightSet(!filterWeight);
  }

  const onClickFilterDimension = () => {
    filterDimensionSet(!filterDimension);
  }

  let gridColumns = {
    gridTemplateColumns: `repeat(${Object.keys(data[0]).length}, max-content)`
  }

  return (
    <div className="example" id="long-grid">
      <h3>Grid Animation</h3>
      <Button active={filterWeight} onClick={onClickFilterWeight}>Filter Weight</Button>
      <Button active={filterDimension} onClick={onClickFilterDimension}>Filter Dimension</Button>
      <div className="table" style={gridColumns}>
        {Object.keys(data[0]).map(item => {
          let capped = capitalizeFirstLetters(item);
          let isVisible = isFieldVisible(item, filterWeight, filterDimension);
          let hide = isVisible ? "" : "hide-field";
          return <div className={`header field-common ${hide}`}><span key={item}>{capped}</span></div>
        })}
        {data.map((item, i) => {
          return <Record filterDimension={filterDimension} filterWeight={filterWeight} key={i} item={item} />
        })}
      </div>
    </div>
  )
}

export default LongGrid;

function capitalizeFirstLetters(word) {
  let words = word.split('_');
  let cappedWords = [];
  for (let i = 0; i < words.length; i++) {
    let cappedWord = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    cappedWords.push(cappedWord);
  }
  return cappedWords.join(" ");
}