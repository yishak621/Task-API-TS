export interface User {
  id: string;
  email: string;
  password: string;
}

export const users: User[] = []; //This tells TypeScript that users is an array of User objects.
