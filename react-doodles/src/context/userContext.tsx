import { ReactNode, createContext, useEffect, useState } from "react";

// user type; corresponds to response from backend login function
interface UserType {
  id: number;
  email: string;
  createdAt: string;
}

interface UserContextType {
  currentUser: UserType | null;
  login: (email: string, password: string) => Promise<number>;
}

// used for modifying the state of the app
interface Props {
  children?: ReactNode;
}

export const UserContext = createContext<UserContextType>({
  currentUser: null,
  login: async () => {return 1;},
});

export const UserContextProvider: React.FC<Props> = ({ children }) => {
  // update current user based on local storage, or set to null if there isn't one
  const [currentUser, setCurrentUser] = useState<UserType | null>(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  // perform login request
  const login = async (email: string, password: string) => {
    try {
      const res = await fetch("http://localhost:8800/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: `{"email": "${email}", "password": "${password}"}`,
        credentials: "include",
      });

      // get response JSON data
      const resData = await res.json();

      // response unsuccessful
      if (!res.ok) {
        console.error("Server error response:", resData);
        // error occurred; explicitly set user context to null
        setCurrentUser(null);

        return res.status; // failure; either 404 (user doesn't exist) or 4000 (incorrect username/password)
        // success; set user context
      } else {
        setCurrentUser(resData);

        return 0; // success
      }
    } catch (err: any) {
      console.log("ERROR:" + err);

      // error occurred; explicitly set user context to null
      setCurrentUser(null);

      return -1; // failure; unknown error
    }
  };

  // save current user information as a string in local storage
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <UserContext.Provider value={{ currentUser, login }}>
      {children}
    </UserContext.Provider>
  );
};
