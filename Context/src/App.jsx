import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserProvider from "./components/UserComponets/context/UserContext.jsx";

function App() {
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
  )
}

export default App
