// import axios from "axios";
import { ReactNode, createContext, useState } from "react";

type Props = {
  children?: ReactNode;
};

type IAuthContext = {
  isAuthed: boolean;
  setAuthed: (newState: boolean) => void;
};

const initAuthValue = {
  isAuthed: false,
  setAuthed: () => {},
};

const AuthContext = createContext<IAuthContext>(initAuthValue);

const AuthContextProvider = ({ children }: Props) => {
  const [isAuthed, setAuthed] = useState(initAuthValue.isAuthed);

  return (
    <AuthContext.Provider value={{ isAuthed, setAuthed }}>
      {children}
    </AuthContext.Provider>
  );
};

// TODO need to merge this approach with the one above
// const AuthContextProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(
//     JSON.parse(localStorage.getItem("user")) || ""
//   );

//   const login = async (inputs) => {
//     const res = await axios.post(
//       "http://localhost:8800/api/auth/login",
//       inputs,
//       {
//         withCredentials: true,
//       }
//     );

//     setCurrentUser(res.data);
//   };

//   useEffect(() => {
//     localStorage.setItem("user", JSON.stringify(currentUser));
//   }, [currentUser]);

//   return (
//     <AuthContext.Provider value={{ currentUser, login }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

export { AuthContext, AuthContextProvider };
