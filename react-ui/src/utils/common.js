import { data, weightFields, dimensionFields } from '../data';

export const isFieldVisible = (field, filterWeight, filterDimension) => {
  // if no filters are selected, all fields are visible
  if (!filterWeight && !filterDimension) {
    return true;
  }

  if (filterWeight) {
    for (let i = 0; i < weightFields.length; i++) {
      if (field === weightFields[i]) {
        return true;
      }
    }
  }
  if (filterDimension) {
    for (let i = 0; i < dimensionFields.length; i++) {
      if (field === dimensionFields[i]) {
        return true;
      }
    }
  }
  return false;
}

export const getKeyPosition = (filterWeight, filterDimension) => {
  let obj = {};
  obj.windowWidth = "100%";
  obj.tableTranslate = "0px";
  obj.overflowX = "auto";
  obj.borderColor = "#eee";

  if (!filterWeight && !filterDimension) {
    return obj;
  }

  obj.overflowX = "hidden";
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
