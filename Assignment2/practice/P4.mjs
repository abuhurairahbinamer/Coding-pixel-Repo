const report = [
    { name: "Alice", postCount: 10 },
    { name: "Bob", postCount: 10 },
    { name: "Charlie", postCount: 8 },
    { name: "David", postCount: 10 },
    { name: "Eve", postCount: 9 }
];

// Sort the report
const res=[...report].sort((a, b) => 
    (b.postCount - a.postCount) || a.name.localeCompare(b.name)
);

console.log(res);
