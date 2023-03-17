dataFunctions.gs

function stringifyArray(arr) {
  return arr.join('; ');
}
function searchArray(searchIn,searchFor) {
    for (let i=0;i<searchIn.length;i++) {
    let subA=searchIn[i];
      for (let j=0;j<subA.length;j++) {
        if(subA[j]==searchFor) {
          return [i,j];
        }
        else {
          continue
        }
      }
    }
  }