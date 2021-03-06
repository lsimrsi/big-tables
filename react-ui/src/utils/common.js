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

export const arrayMove = (arr, fromIndex, toIndex) => {
  var element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
}
