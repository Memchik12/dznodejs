import {MOCK_API_USERS_URL} from "../../config.js";


export default async function fetchUserList(page = 1, limit = 10) {

    const url = new URL(MOCK_API_USERS_URL);
    url.searchParams.append('page', page);
    url.searchParams.append('limit', limit);

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
}