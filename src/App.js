import { useState } from 'react';
import './App.css';
import Navbar from './components/Home/Navbar';
import Page from './components/Home/Page';
import Login from './components/Login/Login';
import VideoPage from './components/Video/VideoPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from './components/Home/Search';
import VerifyUp from './components/Verify/VerifyUp';
import Info from './components/Verify/Info';
import useLogoutOnClose from './components/Login/Logout';

function App() {

  // eslint-disable-next-line no-unused-vars
  const [isLogin, setIsLogin] = useState(false);
  useLogoutOnClose();
  return (
    <BrowserRouter>
      <>
        <Navbar isLogin = {isLogin} />
        <Routes>
          <Route path="/" element = {<Info/>} />
          <Route path="/home" element={<Page type="random" />} />
          <Route path="trending" element={<Page type="trending" />} />
          <Route path="subscriptions" element={<Page type="subVids" />} />
          <Route path="/likee" element={<Page type="likeVideos"/>} />
          <Route path="yourVid" element={<Page type="yourVids"/>} />
          <Route path="signin" element = {<Login setIsLogin={setIsLogin} />} />
          <Route path="/video/:id" element = {<VideoPage/>} />
          <Route path="/search" element = {<Search/>} />
          <Route path="/verifyUploaders" element= {<VerifyUp/>}/>
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
