import {Outlet} from "react-router-dom";
import Header from "@/components/ui/Header.tsx";


export default function AppLayout() {
  return <div>
    <Header/>
    <main>
      <div>
        <Outlet/>
      </div>
    </main>
  </div>
}
