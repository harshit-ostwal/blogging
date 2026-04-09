import { nanoid } from "nanoid";
import { createContext, useContext, useState } from "react";
import { toast } from "sonner";
import { StorageKeys } from "@/constants/storage-keys";
import {
    getLocalStorageItem,
    setLocalStorageItem,
} from "@/utils/localStorage.utils";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [users, setUsers] = useState(
        getLocalStorageItem(StorageKeys.USERS) || []
    );

    const [loggedInUser, setLoggedInUser] = useState(
        getLocalStorageItem(StorageKeys.LOGGEDINUSER) || null
    );

    const fetchUserByEmail = (email) => {
        return users.find((user) => user.email === email);
    };

    const signUp = (data) => {
        const existingUser = fetchUserByEmail(data.email);

        if (existingUser) {
            toast.error("Account already exists, Please try again later.");
            return false;
        }

        const newUser = {
            id: nanoid(),
            ...data,
        };

        setUsers([...users, newUser]);
        setLocalStorageItem(StorageKeys.USERS, [...users, newUser]);
        toast.success("Sign up successfull.");
        return true;
    };

    const signIn = (data) => {
        const user = fetchUserByEmail(data.email);

        if (user.password !== data.password) {
            toast.error("Invalid credentials, Please try again later.");
            return false;
        }

        setLoggedInUser(user);
        setLocalStorageItem(StorageKeys.LOGGEDINUSER, user);
        toast.success("Sign in successfull.");
        return true;
    };

    const signOut = () => {
        setLoggedInUser(null);
        localStorage.removeItem(StorageKeys.LOGGEDINUSER);
        toast.success("Sign out successfull.");
        return true;
    };

    return (
        <AuthContext.Provider
            value={{
                loggedInUser,
                fetchUserByEmail,
                signIn,
                signUp,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
