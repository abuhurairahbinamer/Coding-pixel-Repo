import { UserReport, User, Post, Todo } from '../types/schema.ts';
declare const process: {  
  argv: string[];
  exit(code?: number): void;
};
// P6: Status type and type guard
const STATUSES = ['todo', 'in_progress', 'done'] as const;
type Status = typeof STATUSES[number];

const isStatus = (x: string): x is Status => {
  return STATUSES.includes(x as Status);
};

// Helper: Convert completed boolean to Status
const getStatusFromCompleted = (completed: boolean): Status => {
  return completed ? 'done' : 'todo';
};


    


const groupBy = <T>(items: T[], keyFn: (item: T) => string): Record<string, T[]> => {
  return items.reduce<Record<string, T[]>>((acc, item) => {
    const key = keyFn(item);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});
};




// Fetch helper
const fetchAPI = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${url}`);
  }
  return response.json() as Promise<T>;
};

// Main function
const main = async () => {
  try {
  
  
    
    // Fetch data concurrently
    const [users, posts, todos] = await Promise.all([
      fetchAPI<User[]>('https://jsonplaceholder.typicode.com/users'),
      fetchAPI<Post[]>('https://jsonplaceholder.typicode.com/posts'),
      fetchAPI<Todo[]>('https://jsonplaceholder.typicode.com/todos')
    ]);

    // Group posts and todos by userId
    const postsByUser = groupBy(posts, post => post.userId.toString());
    const todosByUser = groupBy(todos, todo => todo.userId.toString());

    // Build user report
    const userReport: UserReport[] = users.map(user => {
      const userPosts = postsByUser[user.id] || [];
      const userTodos = todosByUser[user.id] || [];

      // P6: Use Status type to count completed todos
      const completedTodos = userTodos.filter(todo => {
        const status = getStatusFromCompleted(todo.completed);
        return isStatus(status) && status === 'done';
      }).length;

      return {
        id: user.id,
        userName: user.name,
        postCount: userPosts.length,
        completedTodos: completedTodos
      };
    });

   

    // Calculate statistics
    const stats = userReport.reduce(
      (acc, user) => {
        acc.totalPosts += user.postCount;
        acc.totalCompletedTodos += user.completedTodos;
        return acc;
      },
      { totalPosts: 0, totalCompletedTodos: 0 }
    );

    const averagePosts = userReport.length > 0
      ? (stats.totalPosts / userReport.length).toFixed(2)
      : '0.00';

    // Print report
    console.log('\n User Insights Report\n');
    console.log('----------------------------------------');



    console.log('----------------------------------------');
    console.log('\n Summary:');
    console.log(`  Total Users: ${userReport.length}`);
    console.log(`  Total Posts: ${stats.totalPosts}`);
    console.log(`  Total Completed Todos: ${stats.totalCompletedTodos}`);
    console.log(`  Average Posts per User: ${averagePosts}`);

    // P6: Show status breakdown
    console.log('\n Todo Status Breakdown:');
    const statusCounts = todos.reduce((acc, todo) => {
      const status = getStatusFromCompleted(todo.completed);
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as Record<Status, number>);

    console.log(`  Done: ${statusCounts.done || 0}`);
    console.log(`  Todo: ${statusCounts.todo || 0}`);

  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
  }
};


main();