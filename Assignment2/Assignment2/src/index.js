const url = "https://jsonplaceholder.typicode.com";
const sortByThenBy = (array, keyFn1, keyFn2) =>
  [...array].sort((a, b) => {
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



const fetchAPI=async(url)=>{
        const res=await fetch(url);
        if(!res.ok){
            throw new Error("Error fetching api")
        }
         return res.json();
}

const main=async()=>{
    try {
        const [users,posts,todos]=await Promise.all([
            fetchAPI(`${url}/users`),
            fetchAPI(`${url}/posts`),
            fetchAPI(`${url}/todos`)
        ])
        
        const userReport=[...users].map((user,idx)=>{
            const userPosts=[...posts].filter(p=>user.id===p.userId);
            const userTodos=[...posts].filter(p=>user.id===p.userId);
            return {
                id:user.id,
                userName:user.name,
                postCount:userPosts.length,
                completedTodos:[...userTodos].filter(t=>t.completed).length
            }
        })
        // sorting reports
      const sortedReports=sortByThenBy(userReport,r=>r.postCount,r=>r.userName)
        // stats
      const stats = [...sortedReports].reduce(
      (acc, user) => {
        acc.totalPosts += user.postCount;
        acc.totalCompletedTodos += user.completedTodos;
        return acc;
      },
      { totalPosts: 0, totalCompletedTodos: 0 }
    );

     const averagePosts = (
      stats.totalPosts / sortedReports.length
    ).toFixed(2);
   


      
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
        console.error(error)
        process.exit(1)
    }

}
main();