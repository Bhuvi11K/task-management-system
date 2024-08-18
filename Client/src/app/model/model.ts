export interface User {
  id: number;
  name: string;
  role: string;
  email: string;
}

export interface ManagerWithDevelopers {
  manager: User;
  developers: User[];
}

export interface TaskEditData {
  developerId: number;
  taskId: number;
  task: any;
}
