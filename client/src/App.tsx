
import { Routes, Route, useLocation } from "react-router-dom";
import Login from './components/Login.tsx';
import Header from './components/Header.tsx';
import Body from './components/main_body/Body.tsx';
import GetStarted from './components/GetStarted.tsx';
import WardBody from "./components/wardrobe/WardBody.tsx";
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";

function App() {

  let location = useLocation()

  const BG = () => {
      switch (location.pathname) {
        case "/":
          return "bg-[url('/Body_Background.png')]"
        case "/login":
          return "bg-neutral-50"
        case "/get-started":
          return "bg-neutral-50"
        case "/wardrobe":
          return "bg-stone-100"
        default:
          return "bg-neutral-50"
      }
    }

  return (
    <div className={`${BG()} bg-cover bg-center min-h-screen`}>
      <Header />
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/login" element={<Login />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/wardrobe" element={<ProtectedRoute><WardBody /></ProtectedRoute>} />
      </Routes>
    </div>
  )
}

export default App
