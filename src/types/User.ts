export interface User {
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface Role {
  id: number;
  name: string;
}

export interface Permission {
  id: number;
  name: string;
}
