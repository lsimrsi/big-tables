import React from 'react';
import { weightFields, dimensionFields } from '../data';

const Record = ({ filterWeight, filterDimension, item }) => {
  return (
    <>
      {Object.keys(item).map(field => {
        let hide = "";
        let foundWeightField = false;
        for (let i = 0; i < weightFields.length; i++) {
          if (field === weightFields[i] && filterWeight) {
            foundWeightField = true;
          }
        }
        if (!foundWeightField && filterWeight) {
          hide = "hide-field";
        }
        let foundDimensionField = false;
        for (let i = 0; i < dimensionFields.length; i++) {
          if (field === dimensionFields[i] && filterDimension) {
            foundDimensionField = true;
          }
        }
        if (!foundDimensionField && filterDimension) {
          hide = "hide-field";
        }
        return <span key={"" + field + ":" + item[field]} className={"field-common field " + hide}>{item[field]}</span>
      })}
    </>
  )
}

export default Record;