import { StorageKeys } from "@/constants/storage-keys";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "@/utils/localStorage.utils";
import { nanoid } from "nanoid";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  loggedInUser: null,
  fetchUserByEmail: () => {},
  signIn: () => {},
  signUp: () => {},
});

const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(
    getLocalStorageItem(StorageKeys.USERS) || [],
  );

  const [loggedInUser, setLoggedInUser] = useState(
    getLocalStorageItem(StorageKeys.LOGGEDINUSER) || null,
  );

  const fetchUserByEmail = (email) => {
    const user = users.find((user) => user.email === email);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  };

  const signUp = (data) => {
    const existingUser = fetchUserByEmail(data.email);

    if (existingUser) {
      throw new Error("User already exists");
    }

    const newUser = {
      id: nanoid(),
      ...data,
    };

    setUsers([...users, newUser]);
    setLocalStorageItem(StorageKeys.USERS, [...users, newUser]);
  };

  const signIn = (data) => {
    const user = fetchUserByEmail(data.email);

    if (user.password !== data.password) {
      throw new Error("Invalid credentials, Please try again later.");
    }

    setLoggedInUser(user);
    setLocalStorageItem(StorageKeys.LOGGEDINUSER, user);
  };

  return (
    <AuthContext.Provider
      value={{
        loggedInUser,
        fetchUserByEmail,
        signIn,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
