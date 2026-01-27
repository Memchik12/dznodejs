import {useUserContext} from "../context/UserContext.jsx";


export default function  UserHeaderPage (){

    const { user, logOut } = useUserContext();
   console.log(user);

    return (
        <header style={{ padding: '10px', borderBottom: '1px solid #ccc', marginBottom: '20px' }}>
            {user ? (
                <div>
                    <span>Привет,
                        <strong>
                            <div key={user.id}>{user.name}</div>
                        </strong>!
                    </span>
                    <button onClick={logOut}>Выйти</button>
                </div>
            ) : (
                <span>Гость</span>
            )}
        </header>
    );
};
