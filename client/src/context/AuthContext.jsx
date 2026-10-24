
import { createContext, useContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(
                localStorage.getItem("nexoraUser") || "null"
            );
        } catch {
            return null;
        }
    });

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("nexoraUser", JSON.stringify(userData));
    };

    const logout = () => {
        localStorage.removeItem("nexoraUser");
        setUser(null);
    };

    const updateUser = (updatedUser) => {
        setUser((current) => {
            const updated = { ...current, ...updatedUser };
            localStorage.setItem("nexoraUser", JSON.stringify(updated));
            return updated;
        });
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading: false,
                login,
                logout,
                updateUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthContext() {
    return useContext(AuthContext);
}
