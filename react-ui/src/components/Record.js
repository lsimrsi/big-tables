import React from 'react';
import {isFieldVisible} from '../utils/common';

const Record = ({ filterWeight, filterDimension, item }) => {
  return (
    <>
      {Object.keys(item).map(field => {
        let isVisible = isFieldVisible(field, filterWeight, filterDimension);
        let hide = isVisible ? "" : "hide-field";
        return <span key={"" + field + ":" + item[field]} className={"field-common field " + hide}>{item[field]}</span>
      })}
    </>
  )
}

export default Record;