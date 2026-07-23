import { UserReport, User, Post, Todo } from '../types/schema.ts';
declare const process: {  
  argv: string[];
  exit(code?: number): void;
};
const url = "https://jsonplaceholder.typicode.com";

// P7: Type guards for unknown values (no any)
const isString = (value: unknown): value is string => {
  return typeof value === 'string';
};

const isNumber = (value: unknown): value is number => {
  return typeof value === 'number' && !isNaN(value);
};

const isBoolean = (value: unknown): value is boolean => {
  return typeof value === 'boolean';
};

// P7: Type guards for API data validation
const isApiUser = (obj: unknown): obj is User => {
  if (typeof obj !== 'object' || obj === null) return false;
  const maybe = obj as Record<string, unknown>;
  return (
    isNumber(maybe.id) &&
    isString(maybe.name) &&
    isString(maybe.email)
  );
};

const isApiUsers = (data: unknown): data is User[] => {
  if (!Array.isArray(data)) return false;
  return data.every(isApiUser);
};

const isPost = (obj: unknown): obj is Post => {
  if (typeof obj !== 'object' || obj === null) return false;
  const maybe = obj as Record<string, unknown>;
  return (
    isNumber(maybe.userId) &&
    isNumber(maybe.id) &&
    isString(maybe.title) &&
    isString(maybe.body)
  );
};

const isPosts = (data: unknown): data is Post[] => {
  if (!Array.isArray(data)) return false;
  return data.every(isPost);
};

const isTodo = (obj: unknown): obj is Todo => {
  if (typeof obj !== 'object' || obj === null) return false;
  const maybe = obj as Record<string, unknown>;
  return (
    isNumber(maybe.userId) &&
    isNumber(maybe.id) &&
    isString(maybe.title) &&
    isBoolean(maybe.completed)
  );
};

const isTodos = (data: unknown): data is Todo[] => {
  if (!Array.isArray(data)) return false;
  return data.every(isTodo);
};

// P7: Assertion functions
function assertIsApiUsers(data: unknown): asserts data is User[] {
  if (!isApiUsers(data)) {
    throw new Error('Invalid users data structure');
  }
}

function assertIsPosts(data: unknown): asserts data is Post[] {
  if (!isPosts(data)) {
    throw new Error('Invalid posts data structure');
  }
}

function assertIsTodos(data: unknown): asserts data is Todo[] {
  if (!isTodos(data)) {
    throw new Error('Invalid todos data structure');
  }
}

const sortByThenBy = <T>(
  array: T[],
  keyFn1: ((item: T) => string | number),
  keyFn2: ((item: T) => string | number)
): T[] => {
  return [...array].sort((a, b) => {
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
};

const groupBy = <T>(
  items: T[],
  keyFn: (item: T) => string
): Record<string, T[]> => {
  return [...items].reduce<Record<string, T[]>>((acc, item) => {
    const key = keyFn(item);

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(item);
    return acc;
  }, {});
};

const fetchAPI = async <T>(url: string): Promise<T> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Error fetching api");
  }
  return res.json() as Promise<T>;
};

function getMinPosts(): number {
  const arg = process.argv.find(a => a.startsWith("--min-posts="));
  if (!arg) return 0;

  const value = arg.split("=")[1];
  const num = Number(value);

  if (isNaN(num)) {
    console.error("Error: --min-posts must be a number");
    process.exit(1);
  }

  return num;
}

const main = async () => {
  const minPosts = getMinPosts();
  console.log(`Minimum Posts Filter: ${minPosts}`);
  
  try {
    // P7: Fetch data as unknown then validate
    const [usersData, postsData, todosData] = await Promise.all([
      fetchAPI<unknown>(`${url}/users`),
      fetchAPI<unknown>(`${url}/posts`),
      fetchAPI<unknown>(`${url}/todos`)
    ]);

    // P7: Validate data types (no any)
    assertIsApiUsers(usersData);
    assertIsPosts(postsData);
    assertIsTodos(todosData);

    // Now TypeScript knows these are typed arrays
    const users = usersData;
    const posts = postsData;
    const todos = todosData;

    const userPosts = groupBy(posts, p => p.userId.toString());
    const userTodos = groupBy(todos, t => t.userId.toString());

    const userReport: UserReport[] = users.map((user) => {
      return {
        id: user.id,
        userName: user.name,
        postCount: userPosts[user.id]?.length || 0,
        completedTodos: userTodos[user.id]?.filter(t => t.completed).length || 0
      };
    });

    const filteredReports = userReport.filter(
      u => u.postCount >= minPosts
    );

    const sortedReports = sortByThenBy<UserReport>(
      filteredReports,
      r => r.postCount,
      r => r.userName
    );

    const stats = sortedReports.reduce(
      (acc, user) => {
        acc.totalPosts += user.postCount;
        acc.totalCompletedTodos += user.completedTodos;
        return acc;
      },
      { totalPosts: 0, totalCompletedTodos: 0 }
    );

    const averagePosts = sortedReports.length > 0
      ? (stats.totalPosts / sortedReports.length).toFixed(2)
      : "0.00";

    console.log("\n User Insights Report\n");

    sortedReports.forEach(user => {
      console.log(
        `${user.userName} | Posts: ${user.postCount} | Completed Todos: ${user.completedTodos}`
      );
    });

    console.log("\n Summary:");
    console.log(`Total Posts: ${stats.totalPosts}`);
    console.log(`Total Completed Todos: ${stats.totalCompletedTodos}`);
    console.log(`Average Posts per User: ${averagePosts}`);

  } catch (error) {
    // P7: Safe error handling with unknown (no any)
    if (error instanceof Error) {
      console.error('Error:', error.message);
    } else {
      console.error('Error:', String(error));
    }
    process.exit(1);
  }
};

main();