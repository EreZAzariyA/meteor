import React from "react";
import {Meteor } from "meteor/meteor";
import { useTracker } from 'meteor/react-meteor-data';
import { Spin } from "antd";

const Saved = ()=>{

  const {savedAreReady,saved} = useTracker(()=>{
    const subscribe = Meteor.subscribe('user.friends');
    const savedList = Meteor.user()?.social?.saved
    return{
      savedAreReady: subscribe.ready(),
      saved: savedList
    }
  },[]);

  if(savedAreReady){
    return(
      <>
        <h1>Saved</h1>
        {!saved || saved?.length === 0 &&
          <>
            <p>No Saved posts</p>
            <p>add some to see them here</p>
          </>
        }
      </>
      );
  } else return <Spin/>
};

export default Saved;
