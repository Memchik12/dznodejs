import React, { useState } from 'react';
import {useUserContext} from '../../context/UserContext.jsx';
import {MOCK_API_USERS_URL} from "../../../config.js";
import * as test from "node:test";

export default function LoginPartial () {
    const [inputValueEmail, setInputValueEmail] = useState('');
    const [inputValuePassword, setInputValuePassword] = useState('');
    const { user, logIn,register, errorContext, loadContext} = useUserContext();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

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
        setError(null);
        setLoading(true);

        try {
            if (isLogin) {
                // ВХОД
                logIn(formData.email,formData.password)

            } else
            {
                // РЕГИСТРАЦИЯ
                const reg = register(formData.name,formData.email,formData.password)
                if (reg.then(
                    (value)=>{console.log(value);
                    }) !== false)
                {
                    setIsLogin(true);
                }
                else {
                    setError("Данный Email уже используется");
                    console.log(error);
                    setLoading(false);
                    return
                };
            }
        } catch (error) {
            setError(error);
        }


    };

    if (user) return null;

    return (
        <div style={{ padding: '20px', border: '1px solid #ddd' }}>
            <h3>Вход в систему</h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {!isLogin && (
                    <input type="text" name="name" placeholder="Имя"  onChange={handleChange} required />
                )}
                <input type="email" name="email"  placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password"  placeholder="Пароль" onChange={handleChange} required />
                <button
                    onClick={() => logIn(inputValueEmail,inputValuePassword)}
                    disabled={loading} type="submit">

                    {loading ? 'Проверка...' : isLogin ? 'Войти' : 'Создать аккаунт'}</button>
            </form>


            {error !== '' ? <p style={{ color: error ? 'red' : 'green', marginTop: '10px' }}>
                {error}</p> : null

            }

            <button
                onClick={() => { setIsLogin(!isLogin); }}
                style={{ marginTop: '15px', background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}
            >
                {isLogin ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
            </button>
        </div>
    );
};

