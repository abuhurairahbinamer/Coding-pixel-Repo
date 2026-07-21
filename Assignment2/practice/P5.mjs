const url = "https://jsonplaceholder.typicode.com";

const fetchAPI = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error("Error fetching api");
    }
    return res.json();
};

const main = async () => {
    try {
        // Fetch users and posts
        const [users, posts] = await Promise.all([
            fetchAPI(`${url}/users`),
            fetchAPI(`${url}/posts`)
        ]);

        // Create report with user names and their post counts
        const report = users.map(user => ({
            name: user.name,
            postCount: posts.filter(post => post.userId === user.id).length
        }));

        // Compute summary stats using reduce
        const stats = [...report].reduce(
            (acc, user) => ({
                totalUsers: acc.totalUsers + 1,
                totalPosts: acc.totalPosts + user.postCount
            }),
            { totalUsers: 0, totalPosts: 0 }
        );

      
        const averagePosts = (stats.totalPosts / stats.totalUsers).toFixed(2);

        console.log("Report:", report);
        console.log("Summary Stats:", {
            totalUsers: stats.totalUsers,
            totalPosts: stats.totalPosts,
            averagePosts: averagePosts
        });

    } catch (error) {
        console.error("Error:", error.message);
    }
};

main();