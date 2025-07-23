import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import AppLayout from "@/components/ui/AppLayout.tsx";
import Cart from "@/components/pages/Cart.tsx";
import Home from "@/components/pages/Home.tsx";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout/>}>
            <Route index element={<Navigate replace to="home"/>}/>
            <Route path='home' element={<Home/>}/>
            <Route path='cart' element={<Cart/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
