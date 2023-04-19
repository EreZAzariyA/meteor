import React, { lazy, Suspense } from "react";
import {Meteor} from "meteor/meteor";
import { useTracker } from 'meteor/react-meteor-data'
import {Routes, Route, BrowserRouter, Navigate} from "react-router-dom"
import { Spin } from "antd";

const App = lazy(()=>import('./layout'));
const AuthRouter = lazy(()=>import('./layout/auth/index'));
const Profile = lazy(()=>import('./components/bookmarks/profile'));
const EditProfile = lazy(()=>import('./components/bookmarks/profile/edit-profile/index'));


const UserRouter = ()=>{

  const {user, userIsReady} = useTracker(()=>{
    const isReady = Meteor.subscribe('user');
    return {
      user: Meteor.user(),
      userIsReady: isReady.ready()
    }
  },[]);

  if(userIsReady){
    return(
      <BrowserRouter>
        <Suspense fallback={<Spin />}>
        {
        user
        ?
          <Routes>
            <Route path="/*" element={<App/>}/>
            <Route path="/profile/:user_id/*" element={<Profile/>}/>
            <Route path="/edit-profile/:user_id" element={<EditProfile/>} />
            <Route path="/*" element={<Navigate to={'/'}/>}/>
          </Routes>
        :
          <AuthRouter/>
        }
        </Suspense>
      </BrowserRouter>
    );
  } else return <Spin />
};

export default UserRouter;