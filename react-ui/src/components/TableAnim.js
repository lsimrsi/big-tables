import React, { useState } from 'react';
import { data, weightFields, dimensionFields } from '../data';
import Button from './Button';

import './TableAnim.css';

const TableAnim = () => {
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
      <h3>Table Animation</h3>
      <Button active={filterWeight} onClick={onClickFilterWeight}>Filter Weight</Button>
      <Button active={filterDimension} onClick={onClickFilterDimension}>Filter Dimension</Button>
      <div className="scroll">
      <table>
        <thead>
        <tr>
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
            return <th className={`field-common header ${hide}`} key={item}>{capped}</th>
          })}
        </tr>
        </thead>
        <tbody>
        {data.map((item, i) => {
          return (
            <tr key={i}>
              {Object.keys(item).map(field => {
                let hide = "";

                let foundWeightField = false;
                for (let i = 0; i < weightFields.length; i++) {
                  if (field === weightFields[i] && filterWeight) {
                    foundWeightField = true;
                    break;
                  }
                }
                if (!foundWeightField && filterWeight) {
                  hide = "hide-field";
                }

                let foundDimensionField = false;
                for (let i = 0; i < dimensionFields.length; i++) {
                  if (field === dimensionFields[i] && filterDimension) {
                    foundDimensionField = true;
                    break;
                  }
                }
                if (!foundDimensionField && filterDimension) {
                  hide = "hide-field";
                }
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

export default TableAnim;

function capitalizeFirstLetters(word) {
  let words = word.split('_');
  let cappedWords = [];
  for (let i = 0; i < words.length; i++) {
    let cappedWord = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    cappedWords.push(cappedWord);
  }
  return cappedWords.join(" ");
}