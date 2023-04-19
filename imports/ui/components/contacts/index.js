import React from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from 'meteor/react-meteor-data'
import { Empty, Menu, Spin } from "antd";
import { getFullName } from "../../../api/helpers";
import { FriendsDB } from "../../../api/friends/friends";

const Contacts = () => {

  const { friends, friendsAreReady } = useTracker(() => {
    const subscribe = Meteor.subscribe('user.friends');
    const friends = FriendsDB.find(Meteor.userId());
    return {
      friendsAreReady: subscribe.ready(),
      friends: friends.fetch()
    }
  },[]);

  const items = [
    {
      label: <h3 style={{color: 'black'}}>Contacts</h3>,
      type: 'group',
    },
      friends.length > 0
    ?
      friends.forEach((friend) => (
        { label: getFullName(friend), key: friend?._id }
      ))
    :
      {label: <Empty description="No Contacts" />, disabled: true, className: 'empty-menu-label'}
    ];

  if(friendsAreReady) {
    return(
      <Menu
        mode="inline"
        items={items}
      />
    );
  } else return <Spin/>
};

export default Contacts;