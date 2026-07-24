# User Insights Report (Assignment 3)

##  Overview

This project fetches data from the JSONPlaceholder API and generates a
user insights report.

It analyzes: - Number of posts per user - Number of completed todos per
user - Summary statistics

------------------------------------------------------------------------

##  Features

-   Fetches data from API using async/await
-   Uses TypeScript generics
-   Groups data efficiently using `groupBy`
-   Sorts results using `sortByThenBy`
-   Filters users via CLI argument `--min-posts`
-   Displays summary statistics

------------------------------------------------------------------------

##  Technologies Used

-   TypeScript
-   Node.js
-   Fetch API

------------------------------------------------------------------------

##  Project Structure

    src/
     ├── index.ts
     └── types/
          └── schema.ts

------------------------------------------------------------------------

##  How to Run

### 1. Install dependencies

``` bash
npm install
```

### 2. Run the program

``` bash
npm run dev
```

### 3. Run with filter

``` bash
npm run dev -- --min-posts=10
```

------------------------------------------------------------------------

## Sample Output

    User Insights Report

    Leanne Graham | Posts: 10 | Completed Todos: 11
    ...

    Summary:
    Total Posts: 100
    Total Completed Todos: 90
    Average Posts per User: 10.00

------------------------------------------------------------------------

##  Key Concepts

### Generic Functions

-   `sortByThenBy<T>`
-   `groupBy<T>`
-   `fetchAPI<T>`

### Record Utility Type

``` ts
Record<string, T[]>
```

Used for grouping data by keys.

------------------------------------------------------------------------

##  Notes

-   `.map()`, `.filter()`, `.reduce()` do NOT mutate arrays
-   `.sort()` DOES mutate arrays (handled safely using spread)

------------------------------------------------------------------------

##  Author

Assignment 3 Submission
