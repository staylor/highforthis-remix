/**
 * Concats or insets a string at given array index
 */
const pushString = (string, array, index) => {
  const tempArray = array;
  if (!array[index]) {
    tempArray[index] = string;
  } else {
    tempArray[index] += string;
  }
  return tempArray;
};

export default pushString;
