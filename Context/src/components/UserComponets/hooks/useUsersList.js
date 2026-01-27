// src/features/users/hooks/useUsersList.js
import { useState, useEffect } from 'react';


export const useUsersList = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [error, setError] = useState(null);

    // 1. Загрузка при монтировании
    useEffect(() => {
        loadUsers();
    }, [page, limit]);

    const loadUsers = async () => {
        setIsLoading(true);
        try {
            const data = await fetchUserList(page, limit);
            setUsers(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };


    return { users, isLoading, setIsLoading, error, setError, page, setPage, limit, setLimit, refresh: loadUsers };
};