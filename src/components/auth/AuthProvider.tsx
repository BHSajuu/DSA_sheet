import React, { createContext, useContext, useState, useEffect } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';

interface User {
  _id: Id<"users">;
  email: string;
  createdAt: number;
}

interface AuthContextType {
  user: User | null;
  signIn: (email: string) => Promise<void>;
  signOut: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const signInMutation = useMutation(api.auth.signInWithEmail);
  const userQuery = useQuery(api.auth.getUserByEmail, email ? { email } : "skip");

  useEffect(() => {
    // FIXED: Check for stored email on mount with proper loading state management
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      // FIXED: Set loading to false immediately if no stored email to prevent unnecessary loading state
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // FIXED: Only update user state when query data is available to prevent blinking
    if (userQuery !== undefined) {
      setUser(userQuery);
      setIsLoading(false);
    }
  }, [userQuery]);

  const signIn = async (email: string) => {
    setIsLoading(true);
    try {
      const user = await signInMutation({ email });
      localStorage.setItem('userEmail', email);
      setEmail(email);
      setUser(user);
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem('userEmail');
    setEmail(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};