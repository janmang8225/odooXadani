export type AuthContext = {
  userId: string;
  role: 'REQUESTER' | 'TECHNICIAN' | 'MANAGER' | 'ADMIN';
};
