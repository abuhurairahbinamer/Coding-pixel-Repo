# user-insights-cli

A Node.js command-line tool that fetches data from a public API and generates user insights.

---

##  Features

- Fetches users, posts, and todos concurrently using `Promise.all`
- Builds per-user reports
- Sorts by post count and then by name
- Calculates summary statistics using `reduce`
- Handles errors using `try/catch`
- Uses `stderr` and exits with code `1` on failure

---

##  How It Works

1. Fetches data from:
   - /users
   - /posts
   - /todos

2. For each user:
   - Counts total posts
   - Counts completed todos

3. Sorts users:
   - By postCount (ascending)
   - Then by userName

4. Calculates:
   - Total posts
   - Total completed todos
   - Average posts per user (2 decimal places)

---

## Run the Project

```bash
node index.js
```

---

##  Sample Output

User Insights Report

Chelsey Dietrich | Posts: 10 | Completed Todos: 0
Clementina DuBuque | Posts: 10 | Completed Todos: 0
Clementine Bauch | Posts: 10 | Completed Todos: 0
Ervin Howell | Posts: 10 | Completed Todos: 0
Glenna Reichert | Posts: 10 | Completed Todos: 0
Kurtis Weissnat | Posts: 10 | Completed Todos: 0
Leanne Graham | Posts: 10 | Completed Todos: 0
Mrs. Dennis Schulist | Posts: 10 | Completed Todos: 0
Nicholas Runolfsdottir V | Posts: 10 | Completed Todos: 0
Patricia Lebsack | Posts: 10 | Completed Todos: 0

Summary:
Total Posts: 100
Total Completed Todos: 0
Average Posts per User: 10.00

---

##  Error Handling

If API fails:

```js
console.error(error);
process.exit(1);
```

- Errors go to stderr
- Program exits with code 1

---

##  Requirements

- Node.js 18+

---

##  Notes

- Uses only array methods (map, filter, reduce, sort)
- Does not modify original data
