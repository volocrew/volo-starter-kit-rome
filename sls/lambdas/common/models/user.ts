export interface User {
  createdAt: string;
  createdBy: string;
  email: string;
  name: string;
  // accountId: string;
  phoneNumber: string;
  // roles?: Role[];
  // roleIds: string[];
  temporaryPassword?: string;
  theme?: string;
  notifications: boolean;
}
