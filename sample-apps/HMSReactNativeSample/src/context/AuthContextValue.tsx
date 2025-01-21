export interface AuthContextValue {
  user: any | null;
  loading: boolean;
  hasAccess: boolean;
  loginWithEmail: (email: string, password: string) => Promise<any>;
  registerWithEmail: (email: string, password: string) => Promise<any>;
  // loginWithGoogle?: () => Promise<UserCredential>;  // if you have google login
  logout: () => Promise<void>;
  deleteUserAccount: () => Promise<void>;
}
