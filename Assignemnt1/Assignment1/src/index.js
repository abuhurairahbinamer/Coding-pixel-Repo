import functions from './utils.js'
const users = [
  { name: "Ali", age: 20 },
  { name: "Sara", age: 20 },
  { name: "John", age: 25 },
  { name: "Ali", age: 20 }
];

const res1=functions.GroupCount(users,o=>o.age);
console.log(res1);
const res2=functions.sumBy(users,o=>o.age);
console.log(res2);
const res3=functions.uniqueBy(users,o=>o.name);
console.log(res3);
const res4=functions.sortByThenBy(users,o=>o.age,o=>o.name);
console.log(res4);
const res5=functions.chunk(Object.freeze([1,2,3,4,5,6,7]),2);
console.log(res5);

