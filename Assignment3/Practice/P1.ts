
interface ApiAddress {
  city: string;
}

interface ApiUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: ApiAddress;
}


const fetchAPI = async <T>(url: string): Promise<T> => {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    const data: T = await res.json(); 
    return data;

  } catch (error) {
    console.error("Fetch error:", error);
    throw error; 
  }
};


async function main() {
  try {
    const users = await fetchAPI<ApiUser[]>(
      "https://jsonplaceholder.typicode.com/users"
    );

    users.forEach((user) => {
      console.log("Name:", user.name);
      console.log("Username:", user.username);
      console.log("Email:", user.email);
      console.log("City:", user.address.city);
      console.log("Phone",user.phone)
    });

  } catch (error) {
    console.error("Main error:", error);
  }
}

main();