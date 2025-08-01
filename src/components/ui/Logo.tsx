import {useNavigate} from "react-router";

export default function Logo() {

  const navigate = useNavigate()

  return (
    <button onClick={() => navigate('/home')} className="cursor-pointer">
      <img
        src="public/logo-ext.png"
        alt="PDC Books"
        style={{width: '150px', height: 'auto'}}
      />
    </button>
  );
};

