import React, { useState } from 'react';
import { data, weightFields, dimensionFields } from '../data';
import Record from './Record';
import Button from './Button';
import './GridNoAnim.css';

const GridNoAnim = () => {
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

  const onMouseOverTable = (e) => {
    // console.log('e.clientX', e.clientX);
  }

  let refinedData = [];
  for (let i = 0; i < data.length; i++) {
    if (filterWeight) {
      let filteredObj = weightFields.reduce((result, key) => ({ ...result, [key]: data[i][key] }), {});
      refinedData.push(filteredObj);
    } else if (filterDimension) {
      let filteredObj = dimensionFields.reduce((result, key) => ({ ...result, [key]: data[i][key] }), {});
      refinedData.push(filteredObj);
    } else {
      refinedData.push(data[i]);
    }
  }

  let gridStyle = {
    gridTemplateColumns: `repeat(${Object.keys(refinedData[0]).length}, 120px)`
  }
  return (
    <div className="example" id="grid-no-anim">
      <h3>Grid No Animation</h3>
      <Button active={filterWeight} onClick={onClickFilterWeight}>Filter Weight</Button>
      <Button active={filterDimension} onClick={onClickFilterDimension}>Filter Dimension</Button>
      <div className="table" style={gridStyle} onMouseOver={onMouseOverTable}>
        {Object.keys(refinedData[0]).map(item => {
          let capped = capitalizeFirstLetters(item);
          return <span className="header" key={item}>{capped}</span>
        })}
        {refinedData.map((item, i) => {
          return <Record key={i} item={item} />
        })}
      </div>
    </div>
  )
}

export default GridNoAnim;

function capitalizeFirstLetters(word) {
  let words = word.split('_');
  let cappedWords = [];
  for (let i = 0; i < words.length; i++) {
    let cappedWord = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    cappedWords.push(cappedWord);
  }
  return cappedWords.join(" ");
}