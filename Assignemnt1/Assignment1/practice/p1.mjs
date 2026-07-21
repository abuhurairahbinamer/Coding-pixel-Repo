const sum = (nums) => {
  return nums.reduce((acc, n) => acc + n, 0);
};
const res=sum([1,2,3,4])
console.log(res);

//deeper 
const sumBy = (items, fn) => {
  return items.reduce((acc, item) => acc + fn(item), 0);
};
const res1=sumBy([{n:2},{n:3}], x => x.n)
console.log(res1);