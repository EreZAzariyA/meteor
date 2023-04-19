import { Spin } from "antd";
import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const Home = lazy(()=>import('../components/home'));
const Friends = lazy(()=>import('../components/bookmarks/friends/index'));
const Saved = lazy(()=>import('../components/bookmarks/saved/index'));
const Events = lazy(()=>import('../components/bookmarks/events/index'));

const FriendProfile = lazy(()=>import('../components/friend-profile/index'));

export const Routing = ()=>{
  return(
    <Suspense fallback={<Spin/>}>
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/home/friends" element={<Friends/>}/>
        <Route path="/home/saved" element={<Saved/>}/>
        <Route path="/home/events" element={<Events/>}/>

        <Route path="/users/user/:user_id" element={<FriendProfile/>}/>


        <Route path="/*" element={<Navigate to={'/home'}/>}/>
      </Routes>
    </Suspense>
  );
};