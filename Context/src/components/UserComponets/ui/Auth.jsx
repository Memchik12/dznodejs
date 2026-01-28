import React, { useState, useContext } from 'react';
import { MOCK_API_USERS_URL } from '../../config.js';
import {useUserContext} from '../context/UserContext.jsx';

export default function Auth ()
{
    const { user, logIn, loadingUserContext, errorUserContext  } = useUserContext();
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', isError: false });
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    // Если пользователь уже вошел, не показываем форму
    if (user)
    {
        return <div style={{ textAlign: 'center' }}><h3>Вы успешно авторизованы!</h3></div>

    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        setLoading({ text: 'Загрузка...', isError: false });


        try {
            if (isLogin) {
                // ВХОД
                const response = await fetch(`${MOCK_API_USERS_URL}?email=${formData.email}`);
                const users = await response.json();
                const foundUser = users.find(u => u.password === formData.password);

                if (foundUser) {
                    logIn(foundUser); // Отправляем данные в контекст
                } else {
                    setError('Неверный email или пароль');
                }
            } else {
                // РЕГИСТРАЦИЯ
                const newUser = {
                    createdAt: new Date().toISOString(),
                    name: formData.name,
                    avatar: "https://i.pravatar.cc/150?u=" + formData.email, // Динамическая заглушка
                    email: formData.email,
                    password: formData.password
                };

                const response = await fetch(MOCK_API_USERS_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newUser)
                });

                if (response.ok) {
                    setMessage('Регистрация успешна! Теперь войдите.');
                    setIsLogin(true);
                }
            }
        } catch (error) {
            console.log(error);
            setError(error.message);
        }


    };
    return (
        <div style={{ maxWidth: '350px', margin: 'auto', border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
            <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {!isLogin && (
                    <input type="text" name="name" placeholder="Имя" onChange={handleChange} required />
                )}
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Пароль" onChange={handleChange} required />
                <button type="submit">{isLogin ? 'Войти' : 'Создать аккаунт'}</button>
            </form>

            {/* Вывод сообщения вместо alert */}
            {error && (
                <p style={{ color: error ? 'red' : 'green', marginTop: '10px' }}>
                    {error.message}
                </p>
            )}
            {/* Вывод сообщения вместо alert */}
            {errorUserContext && (
                <p style={{ color: error ? 'red' : 'green', marginTop: '10px' }}>
                    {"errorUserContext" + errorUserContext.message}
                </p>
            )}
            {/* Вывод сообщения вместо alert */}
            {loading && (
                <p> loading...</p>
            )}

            <button
                onClick={() => { setIsLogin(!isLogin); }}
                style={{ marginTop: '15px', background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}
            >
                {isLogin ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
            </button>
        </div>
    )
};



