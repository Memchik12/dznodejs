
import { Link } from 'react-router-dom';
import { useUsersList } from '../hooks/useUsersList';

export const UsersListComponent = () => {
    // 1. Деструктурируем ВСЕ, что возвращает хук
    const {
        users,
        isLoading,
        setIsLoading,
        error,
        setError,
        page,
        setPage,
        limit,
        setLimit,
        refresh
    } = useUsersList();

    // Обработчики пагинации
    const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));
    const handleNextPage = () => setPage((prev) => prev + 1);
    const handleLimitChange = (e) => setLimit(Number(e.target.value));


    if (error) return <div style={{ color: 'red' }}>Ошибка: {error}</div>;

    return (
        <div className="users-page">
            {/* --- Хедер с кнопкой создания --- */}
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>Список пользователей</h1>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={refresh} disabled={isLoading}>🔄 Обновить</button>
                </div>
            </header>

            {/* --- Таблица данных --- */}
            {/* Опционально: делаем таблицу полупрозрачной при загрузке */}
            <div style={{ opacity: isLoading ? 0.5 : 1, transition: '0.3s' }}>
                <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Имя</th>
                        <th>Email</th>
                        <th width="150">Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>
                                    <Link to={`${user.id}`} style={{ fontWeight: 'bold' }}>{user.name}</Link>
                                </td>
                                <td>{user.email}</td>

                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={{ textAlign: 'center' }}>
                                {isLoading ? 'Загрузка...' : 'Пользователей не найдено'}
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {/* --- Панель пагинации (Footer) --- */}
            <footer style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: '#f5f5f5' }}>

                {/* Выбор лимита */}
                <div>
                    <span>Показывать по: </span>
                    <select value={limit} onChange={handleLimitChange} disabled={isLoading}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </div>

                {/* Переключение страниц */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <button onClick={handlePrevPage} disabled={page === 1 || isLoading}>
                        ← Назад
                    </button>

                    <span style={{ fontWeight: 'bold' }}>Страница {page}</span>

                    {/* Логика disabled для "Вперед" зависит от того, возвращает ли API общее кол-во страниц.
              Если нет, можно блокировать, если users пришло меньше чем limit */}
                    <button
                        onClick={handleNextPage}
                        disabled={users.length < limit || isLoading}
                    >
                        Вперед →
                    </button>
                </div>
            </footer>
        </div>
    );
};