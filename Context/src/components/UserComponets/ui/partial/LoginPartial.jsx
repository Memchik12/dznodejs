import React, { useState } from 'react';
import {useUserContext} from '../../context/UserContext.jsx';

export default function LoginPartial () {
    const [inputValue, setInputValue] = useState('');
    const { logIn, user, loading, error } = useUserContext();

    if (user) return null;

    return (
        <div style={{ padding: '20px', border: '1px solid #ddd' }}>
            <h3>Вход в систему</h3>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Введите имя (например, Admin)"
                disabled={loading}
            />
            <button onClick={() => logIn(inputValue)} disabled={loading || !inputValue}>
                {loading ? 'Проверка...' : 'Войти'}
            </button>

            {/* Вывод ошибки, если пользователь не найден */}
            {error && <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>}
        </div>
    );
};

