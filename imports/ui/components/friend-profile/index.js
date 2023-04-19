import React, { useEffect, useState } from "react";
import {Meteor} from "meteor/meteor";
import { useTracker } from 'meteor/react-meteor-data';
import {  useNavigate, useParams } from "react-router-dom";
import { Button, Spin, Tooltip } from "antd";
import { RelationshipSteps } from "../../../api/helpers";
import {FiUserPlus,FiUserX, FiUserCheck} from "react-icons/fi";
import { RequestsDB } from "../../../api/requests/requests";
import { BiUserCheck, BiUserX } from "react-icons/bi";
import "./style.css";

const UserProfile = ()=>{
  const params = useParams();
  const navigate = useNavigate();
  const [toConfirm,setToConfirm] = useState(false);

  const {friendProfileIsReady, friend, relationshipStatus, friendsRequests} = useTracker(()=>{
    const subscribe = Meteor.subscribe('friends-requests.user');
    
    // The user who currently displayed on the browser:
    const friendId = params.user_id;
    const currentUser = Meteor.users.findOne({_id:friendId});

    // Get only the requests that sent to me:
    const allRequests = RequestsDB.find({friend_id:Meteor.userId()}).fetch();
    
    // To figure out the request details:
    // Check if there is a relationship between the current user to the logged-in user:
    const status = RequestsDB.find(
      {
        $or: [
          { user_id: Meteor.userId(), friend_id: friendId },
          { user_id: friendId, friend_id: Meteor.userId()}
        ]
      },
      {
        fields: { 'details': 1 }
      }
      ).fetch();

      return{
        friendProfileIsReady: subscribe.ready(),
        friend:currentUser,
        relationshipStatus:status[0],
        friendsRequests: allRequests
      }
    },[params.user_id]);

  useEffect(()=>{
    if(params.user_id === Meteor.userId()){
      navigate('/profile');
    };

    // If the request has been sent to me, need to confirm the request
    friendsRequests?.map((request)=>{
      if(request.details.status === RelationshipSteps.REQUESTֹ_SENT){
        setToConfirm(true);
      }
    });
  },[friendsRequests,params]);

  const sendFriendRequest = () =>{
    Meteor.call('friends.requests.send', friend, err =>{
      if(err) return alert(err);
      alert('request has been sent');
    })
  };
  const cancelFriendRequest = ()=>{
    Meteor.call('friends.requests.cancel', friend, err =>{
      if(err) return alert(err);
      alert('request has been canceled');
    })
  };
  const approveRequest = ()=>{
    Meteor.call('friends.requests.approve',friend,err=>{
      if(err){
        return console.log(err);
      }
      alert('accepted!');
    })
  };
  const rejectRequest = ()=>{
    Meteor.call('friends.requests.reject',friend,err=>{
      if(err){
        return console.log(err);
      }
      alert('rejected!');
    });
  };

  if(friendProfileIsReady){
    if(!friend) return <h1>User not found</h1>

    return(
      <>
        <h1>{friend.profile.first_name}</h1>
          <>
            {!relationshipStatus 
              ?
                <Tooltip title="Send-Request">
                  <Button shape="circle" icon={<FiUserPlus/>} onClick={sendFriendRequest}/>
                </Tooltip>
              :
                <>
                  {relationshipStatus.details.status === RelationshipSteps.REQUESTֹ_SENT
                    &&
                    <>
                      {!toConfirm 
                      ?
                        <Tooltip title="Cancel-Request">
                          <Button shape="circle" danger icon={<FiUserX/>} onClick={cancelFriendRequest}/>
                        </Tooltip>
                      :
                        <div className="to_confirm_container">
                          <Tooltip title="Approve">
                            <Button shape="circle" icon={<BiUserCheck/>} onClick={approveRequest}/>
                          </Tooltip>
                          <Tooltip title="Denied">
                            <Button shape="circle" danger icon={<BiUserX/>} onClick={rejectRequest}/>
                          </Tooltip>
                        </div>}
                    </>

                  }
                  {relationshipStatus.details.status === RelationshipSteps.APPROVED &&
                    <Button shape="circle" icon={<FiUserCheck/>}/>
                  }
                </>
            }
            {/* {!relationshipStatus &&
              <Tooltip title="Send-Request">
                <Button shape="circle" icon={<FiUserPlus/>} onClick={sendFriendRequest}/>
              </Tooltip>
            } */}

{/* 

            {relationshipStatus.details.status === RelationshipSteps.REQUESTֹ_SENT &&
              <Tooltip title="Cancel-Request">
                <Button shape="circle" danger icon={<FiUserX/>} onClick={cancelFriendRequest}/>
              </Tooltip>
            }
            {relationshipStatus.details.status === RelationshipSteps.APPROVED &&
              <Button shape="circle" icon={<FiUserCheck/>}/>
            }
 */}

          </>
        
        



        {/* {
          relationshipStatus
          ?
          toConfirm
          ?
          <div className="to_confirm_container">
            <Tooltip title="Approve">
              <Button shape="circle" icon={<BiUserCheck/>} onClick={()=>approveRequest}/>
            </Tooltip>
            <Tooltip title="Denied">
              <Button shape="circle" danger icon={<BiUserX/>} onClick={()=>rejectRequest}/>
            </Tooltip>
          </div>
          :
          <Tooltip title="Cancel-Request">
            <Button shape="circle" danger icon={<FiUserX/>} onClick={cancelFriendRequest}/>
          </Tooltip>
          :
          <Tooltip title="Send-Request">
            <Button shape="circle" icon={<FiUserPlus/>} onClick={sendFriendRequest}/>
          </Tooltip>
        } */}
      </>
    );
  }else return <Spin/>
};

export default UserProfile;