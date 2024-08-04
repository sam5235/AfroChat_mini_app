import { MainButton, WebAppProvider } from "@vkruglikov/react-telegram-web-app";
import { useState } from "react";
import { FaTelegramPlane } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from '../store/store';



const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()

  const handleLogin =()=>{
    navigate('/')
  }

  return (
    <WebAppProvider>
      <div className="flex flex-col items-center justify-center bg-secondaryBg p-4 w-full h-full">
        <FaTelegramPlane className="w-44 h-44 text-button" />
        <div className="form-fields w-80 flex flex-col items-center justify-center gap-2">
          <label className="text-text text-lg ml-2 text-left w-full">
            User Name
          </label>

          <input
            type="text"
            className="input-rounded input input-block input-solid input-xl bg-background shadow-lg"
            placeholder="Enter your username"
            disabled={isLoading}
          />
          {isLoading && (
            <div className="spinner-dot-pulse mt-10 spinner-lg">
              <div className="spinner-pulse-dot"></div>
            </div>
          )}
          <MainButton text="Sign Up" onClick={handleLogin} />
        </div>
      </div>
    </WebAppProvider>
  );
};

export default LoginPage;
