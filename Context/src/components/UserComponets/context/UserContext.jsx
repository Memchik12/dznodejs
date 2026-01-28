import React, {createContext, useContext, useState} from 'react';
import {useParams} from "react-router-dom";
import {MOCK_API_USERS_URL} from '../../config.js';

const UserContext = createContext();

export default function UserProvider({ children })
{
    const id = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const logIn = async (username) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(MOCK_API_USERS_URL);
            const users = await response.json();

            // Ищем пользователя в полученном массиве
            const foundUser = users.find(u => u.name === username);

            if (foundUser) {
                setUser(foundUser); // Сохраняем весь объект пользователя из API
            } else {
                setError("Пользователь не найден");
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }

    const logOut = () => {
        setUser(null);
        setError(null);
    };

    return (
        <UserContext Userid={id} value={{ user, logIn, logOut, loading, error }}>
            {children}
        </UserContext>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);

    // Если контекст не найден, выводим понятную ошибку в консоль
    if (context === undefined) {
        throw new Error('useUserContext must be used within a UserProvider');
    }

    return context;
};