import {  Post, Todo } from '../types/schema.ts';
declare const process: {  
  argv: string[];
  exit(code?: number): void;
};

 type User={
    id:number,
    name:string,
    email:string
}

const url = "https://jsonplaceholder.typicode.com";

// P8: Derive DTO types with utility types
// First, define the base ApiUser type (matching the API response)
interface ApiUser {
  id: number;
  name: string;
  email: string;
  address: {
    city: string;
  };
  phone: string;
  website: string;
  company: {
    name: string;
  };
}

// P8: Pick only the fields we need
// type UserSummary = Pick<ApiUser, 'id' | 'name' | 'email'>;
type UserSummary = Pick<ApiUser, 'id' | 'name' | 'email'>;
// type updatedReport = Omit<UserSummary, never> & { 
//   postCount: number; 
//   completedTodos: number 
// };

type UserReport = UserSummary & {
  postCount: number;
  completedTodos: number;
};

// P8: Compose with additional fields
// type UserReport = Omit<UserSummary, never> & { postCount: number; completedTodos: number };
// But we already import UserReport from schema, so we can just use that

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
    const [users, posts, todos] = await Promise.all([
      fetchAPI<User[]>(`${url}/users`),
      fetchAPI<Post[]>(`${url}/posts`),
      fetchAPI<Todo[]>(`${url}/todos`)
    ]);

    const userPosts = groupBy(posts, p => p.userId.toString());
    const userTodos = groupBy(todos, t => t.userId.toString());

    // P8: Use UserSummary type for the mapped users
    const userReport: UserReport[] = users.map((user) => {
      // P8: You can create a UserSummary from the full user
      const userSummary: UserSummary = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      return {
        id: userSummary.id,
        name: userSummary.name,
        email: userSummary.email,
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
      r => r.id
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
        `${user.id} | Posts: ${user.postCount} | Completed Todos: ${user.completedTodos}`
      );
    });

    console.log("\n Summary:");
    console.log(`Total Posts: ${stats.totalPosts}`);
    console.log(`Total Completed Todos: ${stats.totalCompletedTodos}`);
    console.log(`Average Posts per User: ${averagePosts}`);

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

main();