import { useState } from 'react'
import './App.css'
import UserProvider from "./components/UserComponets/context/UserContext.jsx";
import LoginPartial from "./components/UserComponets/ui/partial/LoginPartial.jsx";
import UserHeaderPage from "./components/UserComponets/ui/UserHeaderPage.jsx";

function App()
{
  const [count, setCount] = useState(0)

  return (
<>
    <UserProvider>
        <UserHeaderPage/>
        <div style={{ maxWidth: '400px', margin: '20px auto' }}>
            <LoginPartial />
        </div>
    </UserProvider>
</>

  )
}
export default App
