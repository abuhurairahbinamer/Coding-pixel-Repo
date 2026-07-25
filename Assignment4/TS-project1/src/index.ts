import { UserReport, User, Post, Todo } from '../types/schema';
declare const process: {
  argv: string[];
  exit(code?: number): void;
};
const url = 'https://jsonplaceholder.typicode.com';
const sortByThenBy = <T>(
  array: T[],
  keyFn1: (item: T) => string | number,
  keyFn2: (item: T) => string | number
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
    throw new Error('Error fetching api');
  }
  return res.json() as Promise<T>;
};
function getMinPosts(): number {
  const arg = process.argv.find((a) => a.startsWith('--min-posts='));
  // console.log('arg:', process.argv);
  if (!arg) return 0;

  const value = arg.split('=')[1];
  const num = Number(value);

  if (isNaN(num)) {
    console.error('Error: --min-posts must be a number');
    process.exit(1);
  }

  return num;
}
const main = async () => {
  const minPosts = getMinPosts();
  console.log('starting Project 1');
  console.log(`Minimum Posts Filter: ${minPosts}`);
  try {
    const [users, posts, todos] = await Promise.all([
      fetchAPI<User[]>(`${url}/users`),
      fetchAPI<Post[]>(`${url}/posts`),
      fetchAPI<Todo[]>(`${url}/todos`),
    ]);

    const userPosts = groupBy(posts, (p) => p.userId.toString());
    const userTodos = groupBy(todos, (t) => t.userId.toString());

    const userReport: UserReport[] = [...users].map((user) => {
      // const userPosts=[...posts].filter(p=>user.id===p.userId);
      // const userTodos=[...todos].filter(p=>user.id===p.userId);

      return {
        id: user.id,
        userName: user.name,
        postCount: userPosts[user.id]?.length || 0,
        completedTodos:
          userTodos[user.id]?.filter((t) => t.completed).length || 0,
      };
    });
    // sorting reports
    const filteredReports = userReport.filter((u) => u.postCount >= minPosts);

    const sortedReports = sortByThenBy<UserReport>(
      filteredReports,
      (r) => r.postCount,
      (r) => r.userName
    );
    // stats
    const stats = [...sortedReports].reduce(
      (acc, user) => {
        acc.totalPosts += user.postCount;
        acc.totalCompletedTodos += user.completedTodos;
        return acc;
      },
      { totalPosts: 0, totalCompletedTodos: 0 }
    );

    const averagePosts =
      sortedReports.length > 0
        ? (stats.totalPosts / sortedReports.length).toFixed(2)
        : '0.00';

    console.log('\n User Insights Report\n');

    sortedReports.forEach((user) => {
      console.log(
        `${user.userName} | Posts: ${user.postCount} | Completed Todos: ${user.completedTodos}`
      );
    });

    console.log('\n Summary:');
    console.log(`Total Posts: ${stats.totalPosts}`);
    console.log(`Total Completed Todos: ${stats.totalCompletedTodos}`);
    console.log(`Average Posts per User: ${averagePosts}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
main();
