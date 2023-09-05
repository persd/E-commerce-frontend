import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { createContext, useContext } from 'react';
import Loader from '../components/UI/Loader';
export const UserContext = createContext();
export function useUserContext() {
    return useContext(UserContext);
}

export function UserContextProvider({ children }) {
    const checkUser = useQuery({
        queryKey: ['check'],

        queryFn: async () => {
            return await axios.get('/api/check');
        },
        retry: false,
        refetchOnWindowFocus: false,
    });

    const user = checkUser.data?.data;
    if (checkUser.isLoading) return <Loader />;
    return (
        <UserContext.Provider value={{ user, checkUser }}>
            {!checkUser.isLoading && children}
        </UserContext.Provider>
    );
}
