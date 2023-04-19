import React, { useEffect, useState } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from 'meteor/react-meteor-data';
import { Badge, Button, Dropdown, Image, Spin, Tooltip, Empty } from "antd";
import {IoIosNotificationsOutline} from "react-icons/io";
import {AiOutlineCheckCircle,AiOutlineCloseCircle,AiOutlineUser} from "react-icons/ai";
import { RequestsDB } from "../../../../api/requests/requests";
import { RelationshipSteps, RequestsType } from "../../../../api/helpers";
import { NavLink } from "react-router-dom";
import "./style.css";

const Notifications = ()=>{
  const [count,setCount] = useState('');

  const {notificationsAreReady, friendRequests,requests, sentUsers} = useTracker(()=>{
    const subscribe = Meteor.subscribe('friends-requests.user');
    const allRequests = RequestsDB.find({friend_id:Meteor.userId()}).fetch()
    const friendsRequests = allRequests.filter((request)=>{
      return request.details.type === RequestsType.Friendship && request.details.status === RelationshipSteps.REQUESTֹ_SENT
    })
    const getSentUsers = friendsRequests.map((friendRequest)=>{
      return Meteor.users.find({_id: friendRequest.user_id}).fetch()[0]
    })
    return{
      notificationsAreReady:subscribe.ready(),
      friendRequests:friendsRequests,
      requests:allRequests,
      sentUsers: getSentUsers
    }
  },[]);

  useEffect(()=>{
    const count = friendRequests?.length;
    setCount(count);
  },[friendRequests]);

  const rejectRequest=(userToReject)=>{
    Meteor.call('friends.requests.reject',userToReject,err=>{
      if(err){
        return console.log(err);
      }
      alert('rejected!');
    });
  }

  const acceptRequest = (userToApprove)=>{
    Meteor.call('friends.requests.approve',userToApprove,err=>{
      if(err){
        return console.log(err);
      }
      alert('accepted!');
    })
  }


  const items = sentUsers.length > 0 ? sentUsers.map((user)=>{
    return{
      label:
        <div className="user_label">
          <div className="name">
            <NavLink to={`/profile/${user._id}`}>
              {user.profile.first_name + ' ' + user.profile.last_name}
            </NavLink>
          </div>
          <div className="actions">
            <Tooltip title="Accept">
              <Button size="large" shape="circle" type="text" icon={<AiOutlineCheckCircle/>} onClick={()=>acceptRequest(user)}/>
            </Tooltip>
            <Tooltip title='Reject'>
              <Button size="large" danger shape="circle" type="text" icon={<AiOutlineCloseCircle/>} onClick={()=>rejectRequest(user)}/>
            </Tooltip>
          </div>
        </div>,
      key:user._id,
      icon: user.profile.image_profile ? <Image src={user.profile.image_profile}/> : <AiOutlineUser size={'20px'}/>
    }
  }):[{label:<Empty />,key:'empty'}];


  if(notificationsAreReady){
    return(
      <Badge count={count}>
        <Dropdown menu={{items}} placement="bottomLeft" arrow trigger={['click','hover']}>
          <IoIosNotificationsOutline color="darkblue" size={'30px'} onClick={()=>setCount('')}/>
        </Dropdown>
      </Badge>
    );
  }else return <Spin/>
};

export default Notifications;