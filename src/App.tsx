import { Route, Routes} from "react-router-dom";
import './App.css'
import Login from "./pages/Login.tsx"
import Register from "./pages/Register.tsx"
import Home from "./pages/Home.tsx"

function App() {

  return (
      <>
              <Routes>
                  <Route path={"/login"} element={<Login />} />
                  <Route path={"/register"} element={<Register />} />
                  <Route path={"/home"} element={<Home />} />
              </Routes>
      </>
  )
}

export default App
