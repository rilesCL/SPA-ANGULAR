// interfaces/user.interface.ts
export interface IUser {
    username: string;
    email: string;
    nom: string;
    prenom: string;
  }
  
  export interface IUserCreate {
    username: string;
    password: string;
    email: string;
    key: string;  // pour l'API create-user
  }