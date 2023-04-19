import React, { useEffect, useState } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from 'meteor/react-meteor-data'
import { Button, Dropdown, Image, Spin, Tabs,Tooltip } from "antd";
import { Header } from "../../../layout/header/header";
import { getFullName, RelationshipSteps, useResize } from "../../../../api/helpers";
import { AiOutlineStar, AiOutlineUser } from "react-icons/ai";
import { FriendsDB } from "../../../../api/friends/friends";
import { Link, useParams } from "react-router-dom";
import { RequestsDB } from "../../../../api/requests/requests";
import {FiUserPlus,FiUserX} from "react-icons/fi";
import { BiUserCheck, BiUserX } from "react-icons/bi";

import "./style.css";
import { BsMessenger } from "react-icons/bs";

const Profile = ()=>{
  const {isMobile, isResponsive} = useResize();
  const params = useParams();
  const [toConfirm,setToConfirm] = useState(false);
  const [hasRelationship,setHasRelationship] = useState(false);

  const {userIsReady, user, friends, myProfile, requests} = useTracker(()=>{
    const subscribe = Meteor.subscribe('user');
    const thisUser = Meteor.users.find({_id:params.user_id}).fetch();
    Meteor.subscribe('friends');
    Meteor.subscribe('requests.all');
    const userFriends = FriendsDB.find({'user_id':Meteor.userId()},{fields:{'friendsList':1}}).fetch();
    const allRequests = RequestsDB.find(
      {
        $or: [
          { user_id: Meteor.userId(), friend_id: params.user_id },
          { user_id: params.user_id, friend_id: Meteor.userId()}
        ]
      }).fetch();
    return{
      userIsReady: subscribe.ready(),
      user: thisUser[0],
      friends: userFriends[0]?.friendsList,
      myProfile: Meteor.userId() === thisUser[0]._id ? true : false,
      requests: allRequests
    }
  },[params.user_id]);


  useEffect(()=>{
    if(!myProfile){
        if(requests.length > 0){
          setHasRelationship(true);
          checkRelationshipStatus();
        }else{
          setHasRelationship(false);
        }
    }
  },[myProfile,params.user_id,requests]);

  const checkRelationshipStatus =()=>{
    const { friend_id } = requests[0];
    if(friend_id === Meteor.userId()){
      setToConfirm(true);
    }else{
      setToConfirm(false);
    }
  }

  const tabs = [
    {label: "Posts", key: 'posts', children: <h1>posts</h1>},
    {label: "About", key: 'about', children: <h1>About</h1>},
    {label: "Friends", key: 'friends', children: <h1>Friends</h1>},
    {label: "Photos", key: 'photos', children: <h1>Photos</h1>},
  ];
  const dropdownItems = [
    {label:'Favorites',key:'favorites',icon:<AiOutlineStar size='20'/>},
    {label:'Unfriends',key:'unfriends',icon:<BiUserX size='20'/>},
  ]

  const sendFriendRequest = () =>{
    Meteor.call('friends.requests.send', user, err =>{
      if(err) return alert(err);
      alert('request has been sent');
    })
  };
  const cancelFriendRequest = ()=>{
    Meteor.call('friends.requests.cancel', user, err =>{
      if(err) return alert(err);
      alert('request has been canceled');
    })
  };
  const approveRequest = ()=>{
    Meteor.call('friends.requests.approve',user,err=>{
      if(err){
        return console.log(err);
      }
      alert('accepted!');
    })
  };
  const rejectRequest = ()=>{
    Meteor.call('friends.requests.reject',user,err=>{
      if(err){
        return console.log(err);
      }
      alert('rejected!');
    });
  };

  if(userIsReady){
    return(
      <>
        <Header />
          <div
            className="profile-container d-flex flex-d-column align-items-center"
            style={{padding:'0 5px 5px'}}
          >
            <div
              className="profile-head d-flex flex-d-column"
              style={isMobile ? {width:'100%'} : isResponsive ? {width:'90%'} : {width:'80%'}}
              >
              <Image
                className="cover"
                style={{width:'100%',height:'250px'}}
                src={user.profile.cover_img || 'https://i.pinimg.com/originals/20/ab/34/20ab3479a8b0eb6b36728652ef1443c0.jpg'}
                alt={`${getFullName(user)}_cover_img`}
              />

              <div className="user-details d-flex flex-d-row gap-10">
                <div className="profile-img">
                  {user.profile?.profile_img
                  ?
                    <Image className="img" src={user.profile.profile_img} alt={`${getFullName(user)}_profile_img`}/>
                  :
                    <AiOutlineUser size={'60px'} />
                  }
                </div>

                <div className="details lh-10">
                  <p>{getFullName(user)}</p>
                  <p>{friends ? friends.length + ' Friends' : 'No Friends'}</p>
                </div>
              </div>
            </div>

            {!myProfile &&
              <div className="d-flex flex-d-row gap-5">
                {!hasRelationship &&
                  <div className="send-request">
                    <Tooltip title="Send-Request">
                      <Button type="primary" icon={<FiUserPlus size='20' className="mr-5"/>} onClick=  {sendFriendRequest}>
                        Add friend
                      </Button>
                    </Tooltip>
                  </div>
                }

                {hasRelationship &&
                  <>
                    {requests[0]?.details.status === RelationshipSteps.REQUESTֹ_SENT
                    && (!toConfirm
                      ?
                        <Tooltip title="Cancel-Request">
                          <Button type="primary" danger icon={<FiUserX size='20' className="mr-5"/>} onClick={cancelFriendRequest}>Cancel-request</Button>
                        </Tooltip>
                      :
                        <div className="to_confirm_container d-flex gap-5">
                          <Tooltip title="Approve">
                            <Button type="primary" icon={<BiUserCheck size='20' className="mr-5"/>} onClick={approveRequest}>Approve</Button>
                          </Tooltip>
                          <Tooltip title="Denied">
                            <Button danger icon={<BiUserX size='20' className="mr-5"/>} onClick={rejectRequest}>Denied</Button>
                          </Tooltip>
                        </div>
                      )
                    }

                    {requests[0]?.details.status === RelationshipSteps.APPROVED
                      &&
                    (
                      <Dropdown trigger={'click'} menu={{items: dropdownItems}} arrow>
                        <Button icon={<BiUserCheck size='20' className="mr-5"/>}>Friends</Button>
                      </Dropdown>
                    )}
                  </>
                }
                  
                
                <Button icon={<BsMessenger size='15' className="mr-5"/>}>Message</Button>
              </div>

            }

            <Tabs
              style={isMobile ? {width:'100%'} : isResponsive ? {width:'90%'} : {width:'80%'}}
              className="mt-10"
              mode="horizontal"
              items={tabs}
              tabBarExtraContent={myProfile ? <Button type="primary">
              <Link to={`/edit-profile/${user._id}`}>Edit-Profile</Link>
              </Button> : ''}
            />

          </div>
      </>
    );
  }else return <Spin />
};

export default Profile;
