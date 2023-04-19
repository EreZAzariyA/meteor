import React from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from 'meteor/react-meteor-data'
import { Empty, Menu, Spin } from "antd";
import { getFullName } from "../../../api/helpers";

const Contacts = () => {

  const { friends, friendsAreReady } = useTracker(() => {
    const subscribe = Meteor.subscribe('friends.user');
    const friends = Meteor.call('friends.user', (err) => {
      if(err) {
        console.log(err);
        return;
      }
    });

    return {
      friendsAreReady: subscribe.ready(),
      friends: friends
    }
  },[]);

  const items = [
    {
      label: <h3 style={{color: 'black'}}>Contacts</h3>,
      type: 'group',
    }
  ];

  const items2 = friends ? friends.map((friend)=>{
    return { label: getFullName(friend), key: friend?._id }
  }) : [{label: <Empty description="No Contacts" />, disabled: true, className: 'empty-menu-label'}];

  const list = [...items, ...items2];

  if(friendsAreReady) {
    return(
      <Menu
        mode="inline"
        items={list}
      />
    );
  } else return <Spin/>
};

export default Contacts;