// 'use client'; // for app router only

// import { createContext, useContext, useState, ReactNode } from 'react';

// const OpenFile = createContext(null);

// export const OpenFileProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState(null);

//   const login = (userData: any) => setUser(userData);
//   const logout = () => setUser(null);

//   return (
//     <OpenFile.Provider value={{ user, login, logout }}>
//       {children}
//     </OpenFile.Provider>
//   );
// };

// export const useAuth = () => useContext(OpenFile);
