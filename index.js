/*
Question 1: Clean the room function: given an input of [1,2,4,591,392,391,2,5,10,2,1,1,1,20,20], make a function that organizes these into individual array that is ordered. 

For example answer(ArrayFromAbove) should return: [[1,1,1,1],[2,2,2], 4,5,10,[20,20], 391, 392,591]. 

Bonus: Make it so it organizes strings differently from number types. i.e. [1, "2", "3", 2] should return [[1,2], ["2", "3"]]
*/

const arr = [1,2,4,591,392,391,2,5,10,2,1,1,1,20,20];


function answer1(arr) {
  let prev;
  return arr.slice().sort((a,b)=>a-b)
    .reduce((acc, el) => {
       if(prev === el) {
         if(typeof acc[acc.length-1] === 'number') {
           acc[acc.length-1] = [el, el];
         } else {
           acc[acc.length-1].push(el);
         }
       } else {
         acc[acc.length] = el;
       }
       prev = el;
       return acc;
    }, []);
}

let before = Date.now();
answer1(arr);
let after = Date.now();
console.log(parseInt(after - before));

function answer1_1(arr) {
  const obj = arr.reduce((acc,el) => {
    if(acc[el] !== undefined) {
      acc[el]++;
    } else {
      acc[el] = 1;
    }
    return acc;
  },{});
  
  return Object.keys(obj)
    .map(key => Number(key))
    .sort((a,b) => a-b)
    .reduce((acc,el) => {
      obj[el] > 1 ?
      acc.push(new Array(obj[el]).fill(el)) :
      acc.push(el);
      return acc;
    }, []);
}

before = Date.now();
answer1_1(arr);
after = Date.now();
console.log(parseInt(after - before));

/*
Question 2: Write a javascript function that takes an array of numbers and a target number. The function should find two different numbers in the array that, when added together, give the target number. For example: answer([1,2,3], 4)should return [1,3]
*/

function answer2(arr, target) {
  const seen = {},
        len = arr.length;
  for(let i=0; i<len; i++) {
    const comp = target - arr[i];
    if(seen[comp]) {
      return [comp, arr[i]];
    }
    seen[arr[i]] = 1;
  }
}

console.log(answer2([1,2,3,4],5));

/*
Question 3: Write a function that converts HEX to RGB. Then Make that function auto-dect the formats so that if you enter HEX color format it returns RGB and if you enter RGB color format it returns HEX.
*/

function HEXRGBConverter(color) {
  const rgbPattern = /^rgb\(\d{1,3},\s*\d{1,3},\s*\d{1,3}\)$/g;
  const hexPattern = /#([0-9a-fA-F][0-9a-fA-F]){3}\b|^#[0-9a-fA-F]{3}\b/g;

  try {
    if(rgbPattern.test(color)) {
      const numberPattern = /(\d{1,3})/g;
      let r = 0, g = 0, b = 0;
      
      rgb = color.match(rgbPattern)[0];
      [r,g,b] = rgb.match(numberPattern);
      
      if(r>255 || r<0 || g>255 || g<0 || b>255 || b<0) {
        throw Error('please use valid color code')
      }
      r = (+r).toString(16);
      g = (+g).toString(16);
      b = (+b).toString(16);

      if (r.length == 1)
        r = "0" + r;
      if (g.length == 1)
        g = "0" + g;
      if (b.length == 1)
        b = "0" + b;

      return "#" + r + g + b;
    } else if(hexPattern.test(color)) {
      h = color.match(hexPattern)[0];

      let r = 0, g = 0, b = 0;

      // 3 digits
      if (h.length == 4) {
        r = "0x" + h[1] + h[1];
        g = "0x" + h[2] + h[2];
        b = "0x" + h[3] + h[3];

      // 6 digits
      } else if (h.length == 7) {
        r = "0x" + h[1] + h[2];
        g = "0x" + h[3] + h[4];
        b = "0x" + h[5] + h[6];
      } else throw Error('please use valid color code');
      
      return "rgb("+ +r + ", " + +g + ", " + +b + ")";
    } else throw Error('please use valid color code');
  }
  catch(e) {
    return e.message;
  }
}

// HEXRGBConverter('rgb(56,78,90)');
module.exports = HEXRGBConverter;