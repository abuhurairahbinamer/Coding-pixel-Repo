const BASE_URL = "https://jsonplaceholder.typicode.com";

async function fetchSequential() {
  console.time("Sequential");

  const users = await fetch(`${BASE_URL}/users`)
    .then(response => response.json());

  const posts = await fetch(`${BASE_URL}/posts`)
    .then(response => response.json());

  const todos = await fetch(`${BASE_URL}/todos`)
    .then(response => response.json());

  console.timeEnd("Sequential");

  console.log("Sequential Results:");
  console.log("Users:", users.length);
  console.log("Posts:", posts.length);
  console.log("Todos:", todos.length);
}


async function fetchConcurrent() {
  console.time("Concurrent");

  const [users, posts, todos] = await Promise.all([
    fetch(`${BASE_URL}/users`)
      .then(response => response.json()),

    fetch(`${BASE_URL}/posts`)
      .then(response => response.json()),

    fetch(`${BASE_URL}/todos`)
      .then(response => response.json())
  ]);

  console.timeEnd("Concurrent");

  console.log("Concurrent Results:");
  console.log("Users:", users.length);
  console.log("Posts:", posts.length);
  console.log("Todos:", todos.length);
}


async function main() {
  await fetchSequential();

  console.log("----------------------");

  await fetchConcurrent();
}

main();