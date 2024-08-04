import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "../ProtectedRoutes";
import HomePage from "../pages/view/home";
import ExplorePage from "../pages/view/explore";
import HistoryPage from "../pages/view/history";
import ResponsePage from "../pages/view/response";
import ChatPage from "../pages/view/chat";
import LoginPage from "../pages/login";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { getTelegramUser } from "../services/auth";
// import { useSignInUserQuery } from "../services/apiSlices";
import {useSignInQuery} from '../services/apiSlices'
export const App = () => {
  const telegram = getTelegramUser();
  console.log("this is telegram user ", telegram);
  
  // const {data, error, isSuccess} = useSignInQuery({...telegram})


  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoutes isAuthenticated={true} />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/response" element={<ResponsePage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};
