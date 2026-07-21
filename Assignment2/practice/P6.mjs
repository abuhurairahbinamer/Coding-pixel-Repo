const url = "https://jsonplaceholder.typicode.com";

const fetchAPI = async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Error fetching api");
    return res.json();
};

const main = async () => {
    try {
       
        const [users, todos] = await Promise.all([
            fetchAPI(`${url}/users`),
            fetchAPI(`${url}/todos`)
        ]);

       
        users.forEach(user => {
            const userTodos = todos.filter(todo => todo.userId === user.id);
            const totalTodos = userTodos.length;
            const completedTodos = userTodos.filter(todo => todo.completed).length;
            const openTodos = userTodos.filter(todo => !todo.completed).length;
            
            console.log(`User: ${user.name}`);
            console.log(`  Total Todos: ${totalTodos}`);
            console.log(`  Completed: ${completedTodos}`);
            console.log(`  Open: ${openTodos}`);
            console.log(`  Completed + Open = ${completedTodos + openTodos}`);
            
           
            const isValid = completedTodos + openTodos === totalTodos;
            console.log(`  ✅ Valid: ${isValid}\n`);
            
            if (!isValid) {
                console.error(`❌ MISMATCH for ${user.name}: ${completedTodos} + ${openTodos} ≠ ${totalTodos}`);
            }
        });

    } catch (error) {
        console.error("Error:", error.message);
    }
};

main();