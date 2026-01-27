import { useEffect } from 'react';

export const usePageTitle = (title) => {
    useEffect(() => {
        // Сохраняем предыдущий заголовок
        const prevTitle = document.title;

        // Устанавливаем новый
        document.title = title;

        // (Опционально) Возвращаем старый при уходе со страницы
        return () => {
            document.title = prevTitle;
        };
    }, [title]); // Запускать эффект, если title изменился
};