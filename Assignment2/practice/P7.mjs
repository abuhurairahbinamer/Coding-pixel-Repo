const url = "https://jsonplaceholder.typicode.com";

const fetchAPI = async (url) => {
    try {
        const res = await fetch(url);
        
        // Check for non-2xx response
        if (!res.ok) {
            throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        
        return res.json();
    } catch (error) {
        // Distinguish network errors from HTTP errors
        if (error.message.includes('fetch')) {
            throw new Error(`Network error: Failed to fetch ${url}`);
        }
        throw error; // Re-throw HTTP errors
    }
};

const main = async () => {
    try {
        const [users, posts, todos] = await Promise.all([
            fetchAPI(`${url}/users`),
            fetchAPI(`${url}/posts`),
            fetchAPI(`${url}/todos`)
        ]);

        console.log("✅ All data fetched successfully!");
        console.log(`Users: ${users.length}, Posts: ${posts.length}, Todos: ${todos.length}`);
        
    } catch (error) {
        // Write to stderr
        console.error("❌ Error:", error.message);
        
        // Exit with non-zero code
        process.exit(1);
    }
};

main();