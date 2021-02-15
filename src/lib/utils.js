
/**
 * Split array
 */
function splitArray(array, char) {
    const result = [];
    let firstIdx = 0;
    array.forEach((elt, idx) => {
        if (elt === char) {
            result.push(array.slice(firstIdx, idx - 1));
            firstIdx = idx + 1;
        }
    });
    if (firstIdx < array.length) {
        result.push(array.slice(firstIdx, array.length))
    }
    return result
}

export {
  splitArray,
}