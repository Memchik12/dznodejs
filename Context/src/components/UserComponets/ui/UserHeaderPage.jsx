import {useUserContext} from "../context/UserContext.jsx";


export default function  UserHeaderPage (){

    const { user, logOut } = useUserContext();


    return (
        <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px', background: '#f4f4f4' }}>
            <h1>My App</h1>
            <div>
                {user ? (
                    <>
                        <span>Привет, <strong>{user.name}</strong>! </span>
                        <button onClick={logOut}>Выйти</button>
                    </>
                ) : (
                    <span>Гость</span>
                )}
            </div>
        </header>
    );
};
