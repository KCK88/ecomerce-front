import {useNavigate} from "react-router";

export default function ModalUser({ isLoggedIn }: { isLoggedIn: boolean }) {

  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center w-full">
      {!isLoggedIn && <div>
        <button
          onClick={() => navigate('/login')}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-stone-600 hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500"
        >
          Faça seu login
        </button>
        <div className="flex justify-center">
          <span>É novo aqui?</span>
          <a href="#" className="font-medium text-stone-600 hover:text-stone-500">
            comece aqui
          </a>
        </div>
      </div>}
      <div>
        <ul className="flex justify-center gap-10 overflow-hidden">
          <li>Conta</li>
          <li>Wishlist</li>
        </ul>
      </div>
    </div>
  )
}