export type UserReport={
       id:number,
       userName:string,
       postCount:number,
       completedTodos:number
}
export type User={
    id:number,
    name:string
}

export interface Post {
  userId: number;
  id: number;
}

export interface Todo {
  userId: number;
  id: number;
  completed: boolean;
}