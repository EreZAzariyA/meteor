import React from "react";
import { Avatar, Card, Image } from "antd";
import {CiUser} from "react-icons/ci";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;

const FriendCard = ({friend})=>{
  return(
    <Card
    style={{width:'300px'}}
    className="friend_card"
    hoverable
    cover={
        friend.profile?.profile_img
      ?
        friend.profile.profile_img
      :
        <Image src='https://www.vhv.rs/dpng/d/526-5265689_username-user-icon-png-transparent-png.png'/>
      }
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Meta
        avatar={<Avatar src={<CiUser/>}/>}
        title={friend.profile.first_name}
        description="This is the description"
      />

    </Card>
  )
};

export default FriendCard;