export interface AuthState {
  user: { name: string } | null;
  login: (user: { name: string }) => void;
  logout: () => void;
}

// Hàm tạo state cho Auth
export const createAuthStore = (set: any): AuthState => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null })
});
