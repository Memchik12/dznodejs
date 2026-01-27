import { useState } from 'react'
import './App.css'
import {Route} from "react-router-dom";
import UserProvider from "./components/UserComponets/context/UserContext.jsx";
import UsersListPage from "./page/user/UsersListPage.jsx";
import NotFoundPage from "./page/shared/NotFoundPage.jsx";
import LoginPartial from "./components/UserComponets/ui/partial/LoginPartial.jsx";
import UserHeaderPage from "./components/UserComponets/ui/UserHeaderPage.jsx";

function App()
{
  const [count, setCount] = useState(0)

  return (
<>
        <UserProvider>
            <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '400px', margin: '0 auto' }}>
                <UserHeaderPage />
                <main>
                    <h2>Добро пожаловать в приложение!</h2>
                    <LoginPartial />
                </main>
            </div>

        </UserProvider>
</>

  )
}
export default App
