import {Outlet, useLocation} from "react-router-dom";
import Header from "@/components/ui/Header.tsx";
import Footer from "@/components/ui/Footer.tsx";
import BKOSidebar from "@/components/ui/BKOSidebar.tsx";


export default function AppLayout() {
const location = useLocation();

    return <div className="flex flex-col min-h-screen">
      {location.pathname === '/backoffice' ? <BKOSidebar/> : <Header/> }
    <main>
      <div>
        <Outlet/>
      </div>
    </main>
    <Footer/>
  </div>
}
