import React, { lazy } from "react";
import {Meteor } from "meteor/meteor";
import { useTracker } from 'meteor/react-meteor-data';
import { Space, Spin } from "antd";
import { FriendsDB } from "../../../../api/friends/friends";
import "./style.css";

const FriendCard = lazy(()=>import('./friend-card/index'));

const Friends = ()=>{
  
  const {friendsAreReady,friends} = useTracker(()=>{
    const subscribe = Meteor.subscribe('user.friends');
    const user_id = Meteor.userId()
    const friendsList = FriendsDB.find({user_id: user_id},{fields:{'friendsList':1}}).fetch()[0]?.friendsList;
    const getFriendsProfile = friendsList ? friendsList.map((friend)=>{
     return Meteor.users.find({_id: friend.friend_id}).fetch()[0];
    }) : [];
    return{
      friendsAreReady: subscribe.ready(),
      friends: getFriendsProfile
    }
  },[]);

  if(friendsAreReady){
    return(
      <div className="friends_list_main_container">
        <div className="friends_list_inner_container">
          <h1>Friends</h1>
          {
            !friends || friends?.length === 0
            ?
            <div className="undefine_friends_list">
              <p>No Friends</p>
              <p>Add some to see them here</p>
            </div>
            :
            <div className="friends_list">
              <Space direction="horizontal">
                {friends?.map((friend)=>
                  <FriendCard key={friend._id} friend={friend}/>
                  )
                }
              </Space>
            </div>
          }
        </div>
      </div>
    );
  }
  else return <Spin/>
};

export default Friends;
