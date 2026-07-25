
export const sortByThenBy = (array, keyFn1, keyFn2) =>
  [...array].sort((a, b) => {
    const k1a = keyFn1(a);
    const k1b = keyFn1(b);

    if (k1a < k1b) return -1;
    if (k1a > k1b) return 1;

    const k2a = keyFn2(a);
    const k2b = keyFn2(b);

    if (k2a < k2b) return -1;
    if (k2a > k2b) return 1;

    return 0;
  });



const input = Object.freeze([
  { name: "Ali", age: 20 },
  { name: "Sara", age: 20 },
  { name: "John", age: 25 }
]);

const result = sortByThenBy(input, x => x.age, x => x.name);

console.assert(
  JSON.stringify(input) === JSON.stringify([
    { name: "Ali", age: 20 },
    { name: "Sara", age: 20 },
    { name: "John", age: 25 }
  ])
);



console.log(result);