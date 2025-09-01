import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import AppLayout from "@/components/ui/AppLayout.tsx";
import Cart from "@/components/pages/Cart.tsx";
import Home from "@/components/pages/Home.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import Login from "@/components/pages/Login.tsx";
import Orders from "@/components/pages/Orders.tsx";
import SearchResult from "@/components/pages/SearchResult.tsx";
import Product from "@/components/pages/Product.tsx";
import Account from "@/components/pages/Account.tsx";
import {AuthProvider} from "@/context/AuthContext.tsx";
import {BackOffice} from "@/components/pages/BackOffice.tsx";
import Signup from "@/components/pages/Signup.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {staleTime: 5},
  }
})

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<AuthProvider><AppLayout/></AuthProvider>}>
              <Route index element={<Navigate replace to="home"/>}/>
              <Route path='home' element={<Home/>}/>
              <Route path='cart' element={<Cart/>}/>
              <Route path='login' element={<Login/>}/>
              <Route path='order' element={<Orders/>}/>
              <Route path='search' element={<SearchResult/>}/>
              <Route path='product/:bookId' element={<Product/>}/>
              <Route path='account' element={<Account/>}/>
              <Route path='backOffice' element={<BackOffice/>}/>
              <Route path='signup' element={<Signup/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false}/>
      </QueryClientProvider>
    </>
  )
}

export default App
