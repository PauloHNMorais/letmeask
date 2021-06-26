import { createContext, ReactNode, useEffect, useState } from "react";
import { firebase, auth } from "../services/firebase";

interface IUser {
  name: string;
  photoURL: string;
  id: string;
  email: string | null;
}

interface IAuthContext {
  user?: IUser;
  signInWithGoogle: () => Promise<void>;
}

export const AuthContext = createContext({} as IAuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | undefined>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid, email } = user;

        if (!displayName || !photoURL)
          throw new Error("Missing information from Google Account");

        setUser({
          name: displayName,
          photoURL,
          id: uid,
          email,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const res = await auth.signInWithPopup(provider);

    if (res.user) {
      const { displayName, photoURL, uid, email } = res.user;

      if (!displayName || !photoURL) {
        throw new Error("Missing information from Google Account.");
      }

      setUser({
        name: displayName,
        photoURL,
        id: uid,
        email,
      });
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
