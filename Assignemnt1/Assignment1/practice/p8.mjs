
const pipe = (...fns) => {
  return (x) => {
    return fns.reduce((value, fn) => {
      return fn(value);
    }, x);
  };
};


const add1 = (x) => x + 1;
const multiply2 = (x) => x * 2;

const result = pipe(add1, multiply2)(3);

console.log(result); 
