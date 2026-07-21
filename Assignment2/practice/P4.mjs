const baseUrl = "https://jsonplaceholder.typicode.com";

const fetchAPI = async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error("API error");
    return res.json();
};

const main = async () => {
    try {
       
        const [users, posts] = await Promise.all([
            fetchAPI(`${baseUrl}/users`),
            fetchAPI(`${baseUrl}/posts`)
        ]);

     
        const report = users.map(user => ({
            name: user.name,
            postCount: posts.filter(p => p.userId === user.id).length
        }));

       
        const sortedReport = [...report].sort(
            (a, b) =>
                (b.postCount - a.postCount) || 
                a.name.localeCompare(b.name)
        );

        console.log("Sorted Report:", sortedReport);

    } catch (err) {
        console.error(err.message);
    }
};

main();