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
node npm run index.js
```

---

##  Output

 User Insights Report

Chelsey Dietrich | Posts: 10 | Completed Todos: 12
Clementina DuBuque | Posts: 10 | Completed Todos: 12
Clementine Bauch | Posts: 10 | Completed Todos: 7
Ervin Howell | Posts: 10 | Completed Todos: 8
Glenna Reichert | Posts: 10 | Completed Todos: 8
Kurtis Weissnat | Posts: 10 | Completed Todos: 9
Leanne Graham | Posts: 10 | Completed Todos: 11
Mrs. Dennis Schulist | Posts: 10 | Completed Todos: 6
Nicholas Runolfsdottir V | Posts: 10 | Completed Todos: 11
Patricia Lebsack | Posts: 10 | Completed Todos: 6

 Summary:
Total Posts: 100
Total Completed Todos: 90
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
