import React, { useState } from 'react';
import {data, weightFields, dimensionFields} from '../data';
import Record from './Record';
import './GridAnim.css';

const GridAnim = () => {
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
    <div className="example" id="table-anim">
      <button onClick={onClickFilterWeight}>Filter Weight</button>
      <button onClick={onClickFilterDimension}>Filter Dimension</button>
      <div className="table">
        {Object.keys(data[0]).map(item => {
          let capped = capitalizeFirstLetters(item);
          let hide = "";

          let foundWeightField = false;
          for (let i = 0; i < weightFields.length; i++) {
            if (item === weightFields[i] && filterWeight) {
              foundWeightField = true;
              break;
            }
          }
          if (!foundWeightField && filterWeight) {
            hide = "hide-field";
          }

          let foundDimensionField = false;
          for (let i = 0; i < dimensionFields.length; i++) {
            if (item === dimensionFields[i] && filterDimension) {
              foundDimensionField = true;
              break;
            }
          }
          if (!foundDimensionField && filterDimension) {
            hide = "hide-field";
          }
          return <span className={`field-common header ${hide}`} key={item}>{capped}</span>
        })}
        {data.map((item, i) => {
          return <Record filterDimension={filterDimension} filterWeight={filterWeight} key={i} item={item} />
        })}
      </div>
    </div>
  )
}

export default GridAnim;

function capitalizeFirstLetters(word) {
  let words = word.split('_');
  let cappedWords = [];
  for (let i = 0; i < words.length; i++) {
    let cappedWord = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    cappedWords.push(cappedWord);
  }
  return cappedWords.join(" ");
}