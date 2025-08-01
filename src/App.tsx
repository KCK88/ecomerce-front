import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import AppLayout from "@/components/ui/AppLayout.tsx";
import Cart from "@/components/pages/Cart.tsx";
import Home from "@/components/pages/Home.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import Login from "@/components/pages/Login.tsx";
import OrdersPage from "@/components/pages/Orders.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {staleTime: 60000},
  }
})

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout/>}>
              <Route index element={<Navigate replace to="home"/>}/>
              <Route path='home' element={<Home/>}/>
              <Route path='cart' element={<Cart/>}/>
              <Route path='login' element={<Login/>}/>
              <Route path='order' element={<OrdersPage/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  )
}

export default App
