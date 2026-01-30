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

    const logIn = async (email, password) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${MOCK_API_USERS_URL}`);
            const users = await response.json();
            const foundUser = users.find(u => u.password === password && u.email === email);

            if (foundUser) {
                setUser(foundUser); // Сохраняем весь объект пользователя из API
                setLoading(false)
            } else {
                setError('Неверный email или пароль');
                return error;
            }
        } catch (err) {
            setError(err);
            return error;
        }

    }

    const register = async (name,email, password) => {
        setLoading(true);
        setError(null);
        try {
            const users =
                await fetch(`${MOCK_API_USERS_URL}`)
                    .then((response) => {
                        return response.json();
                    });
            const foundUser = users.find(u => u.email === email);
            if (foundUser) {
                setError("Данный Email уже используется")
                return false;
            }
            const newUser = {
                createdAt: new Date().toISOString(),
                name: name,
                avatar: "https://i.pravatar.cc/150?u=" + email, // Динамическая заглушка
                email: email,
                password: password
            };

            const response = await fetch(MOCK_API_USERS_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser)
            });
        }
        catch (error) {
            setError(error)
        }
        finally {
            setLoading(false);
        }


    }

    const logOut = () => {
        setUser(null);
        setError(null);
    };

    return (
        <UserContext Userid={id} value={{ user, logIn, logOut,register, loading, error }}>
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