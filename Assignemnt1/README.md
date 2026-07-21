# Utility Functions

A collection of JavaScript utility functions for common array operations.

---

## Example Usage (Main File)

```js
import functions from './utils.js'

const users = [
  { name: "Ali", age: 20 },
  { name: "Sara", age: 20 },
  { name: "John", age: 25 },
  { name: "Ali", age: 20 }
];

const res1 = functions.GroupCount(users,o=>o.age);
const res2 = functions.sumBy(users,o=>o.age);
const res3 = functions.uniqueBy(users,o=>o.name);
const res4 = functions.sortByThenBy(users,o=>o.age,o=>o.name);
const res5 = functions.chunk(Object.freeze([1,2,3,4,5,6,7]),2);

const res6 = functions.groupBy(['a','bb','cc','ddd',""],s=>s.length);
const res7 = functions.GroupCount(['a','bb','cc','ddd'],s=>s);

const res8 = functions.uniqueBy([{id:1,v:'a'},{id:1,v:'b'},{id:2}], x => x.id);
const res9 = functions.LastOccurance([{id:1,v:'a'},{id:1,v:'b'},{id:2}],x=>x.id);

const res10 = functions.sortByThenBy([...users].map((e)=>Object.freeze(e)),o=>o.age,o=>o.name);
const res11 = functions.chunk([1,2,3,4,5,6],2);
```

---

## Outputs

```js
{ '20': 3, '25': 1 }

85

[
  { name: 'Ali', age: 20 },
  { name: 'Sara', age: 20 },
  { name: 'John', age: 25 }
]

[
  { name: 'Ali', age: 20 },
  { name: 'Ali', age: 20 },
  { name: 'Sara', age: 20 },
  { name: 'John', age: 25 }
]

[ [ 1, 2 ], [ 3, 4 ], [ 5, 6 ], [ 7 ] ]

{ '1': [ 'a' ], '2': [ 'bb', 'cc' ], '3': [ 'ddd' ] }

{ a: 1, bb: 1, cc: 1, ddd: 1 }

[ { id: 1, v: 'a' }, { id: 2 } ]

[ { id: 1, v: 'b' }, { id: 2 } ]

[
  { name: 'Ali', age: 20 },
  { name: 'Ali', age: 20 },
  { name: 'Sara', age: 20 },
  { name: 'John', age: 25 }
]

[ [ 1, 2 ], [ 3, 4 ], [ 5, 6 ] ]
```

---

## Functions Included

- GroupCount
- sumBy
- uniqueBy
- sortByThenBy
- chunk
- groupBy
- LastOccurance

---

## Notes

- All functions are immutable (do not modify original data)
- Uses modern JavaScript methods like `map`, `reduce`, and `sort`
