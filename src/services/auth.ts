import { useWebApp } from "@vkruglikov/react-telegram-web-app";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const getTelegramUser = () => {
  const webApp = useWebApp();
  const telegramUser = webApp.initDataUnsafe?.user || "";
  const data = {
    hash_str: webApp.initDataUnsafe?.hash || "",
    initData: webApp.initData || "",
    telegram_user: {
      id: telegramUser.id || 65758,
      is_bot: telegramUser.is_bot || false,
      first_name: telegramUser.first_name || "",
      last_name: telegramUser.last_name || "",
      username: telegramUser.username || "",
      language_code: telegramUser.language_code || "",
      allows_write_to_pm: telegramUser.allows_write_to_pm || "",
      full_name: telegramUser.first_name + " " + telegramUser.last_name || "",
    },
  };
  return data;
};

export const getSession = () => {
  const session = useSelector((state: RootState) => state.user);
  return session;
};

const storeTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('access_token', accessToken);
  localStorage.setItem('refresh_token', refreshToken);
};

const getTokens = () => {
  const accessToken = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');
  return { accessToken, refreshToken };
};

