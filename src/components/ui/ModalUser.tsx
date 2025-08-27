import { useNavigate } from "react-router";
import {useAuth} from "@/context/AuthContext.tsx";

export default function ModalUser({ isLoggedIn, isAdmin }: { isLoggedIn: boolean, isAdmin: boolean } ) {
  const navigate = useNavigate();
  const { logout } = useAuth();


  return (
    <div className="flex flex-col items-center justify-center w-full space-y-6">
      {!isLoggedIn && (
        <div className="w-full flex flex-col items-center space-y-4">
          <button
            onClick={() => navigate('/login')}
            className="w-full max-w-xs py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-stone-600 hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500 transition"
          >
            Faça seu login
          </button>

          <div className="flex items-center gap-1 text-sm text-stone-700">
            <span>É novo aqui?</span>
            <a
              href="#"
              className="font-medium text-stone-600 hover:text-stone-500 transition"
            >Comece aqui
            </a>
          </div>
        </div>
      )}

      <nav>
        <ul className="text-stone-700 text-[13px] font-medium px-2">
          <div className="flex items-center space-x-3">
            <li onClick={()=> navigate('/account')} className="cursor-pointer hover:text-stone-500 transition">Conta</li>
            <li className="cursor-pointer hover:text-stone-500 transition">Wishlist</li>
            <div className="flex flex-col items-center gap-4">
              {isLoggedIn && <li onClick={() => logout()} className="cursor-pointer hover:text-stone-500 transition">Logout</li>}
              {isAdmin && <li onClick={()=> navigate('/backoffice?page=0&limit=10')} className="cursor-pointer hover:text-stone-500 transition">Backoffice</li>}
            </div>
          </div>
        </ul>
      </nav>
    </div>
  );
}
