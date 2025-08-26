import {Outlet} from "react-router-dom";
import Header from "@/components/ui/Header.tsx";
import Footer from "@/components/ui/Footer.tsx";


export default function AppLayout() {
  return <div className="flex flex-col min-h-screen">
    <Header/>
    <main>
      <div>
        <Outlet/>
      </div>
    </main>
    <Footer/>
  </div>
}
