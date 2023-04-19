import React, {lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Posts = lazy(()=>import('./posts/index'));

const ProfileRouter = ()=>{
  return(
    <Routes>
        <Route path="/" element={<Posts/>} />
        <Route path="/about" element={<h1>about</h1>} />
        <Route path="/friends" element={<h1>friends</h1>} />
        <Route path="/photos" element={<h1>photos</h1>} />
    </Routes>
  )
}

export default ProfileRouter;