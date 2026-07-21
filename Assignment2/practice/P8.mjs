const url = "https://jsonplaceholder.typicode.com";

const fetchAPI = async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    return res.json();
};

const main = async () => {
    try {
        // Fetch data
        const [users, posts] = await Promise.all([
            fetchAPI(`${url}/users`),
            fetchAPI(`${url}/posts`)
        ]);

        // Create report
        const report = [...users].map(user => ({
            name: user.name,
            postCount: posts.filter(post => post.userId === user.id).length
        }));

        // Sort report
        const sortedReport = [...report].sort((a, b) => 
            (b.postCount - a.postCount) || a.name.localeCompare(b.name)
        );

        // 🔑 P8: Print aligned table
        printTable(sortedReport);

    } catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
};

// Print formatted table
const printTable = (data) => {
    // Step 1: Define columns
    const headers = ['Name', 'Post Count'];
    
    // Step 2: Calculate max width for each column
    const nameWidth = Math.max(
        headers[0].length,
        ...data.map(row => row.name.length)
    );
    
    const postWidth = Math.max(
        headers[1].length,
        ...data.map(row => String(row.postCount).length)
    );
    
    // Step 3: Print header
    console.log('='.repeat(nameWidth + postWidth + 3));
    console.log(
        headers[0].padEnd(nameWidth) + ' | ' + 
        headers[1].padStart(postWidth)
    );
    console.log('-'.repeat(nameWidth + postWidth + 3));
    
    // Step 4: Print rows
    data.forEach(row => {
        console.log(
            row.name.padEnd(nameWidth) + ' | ' + 
            String(row.postCount).padStart(postWidth)
        );
    });
    
    console.log('='.repeat(nameWidth + postWidth + 3));
};

main();