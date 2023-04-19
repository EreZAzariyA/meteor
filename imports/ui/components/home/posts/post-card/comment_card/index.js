import React from "react";
import {Meteor} from "meteor/meteor";
import { useTracker } from 'meteor/react-meteor-data';
import { Card, Image } from "antd";
import {BiUserCircle} from "react-icons/bi";
import "./style.css";

const CommentCard = ({comment})=>{

  const {commentedUser} = useTracker(()=>{
    const user = Meteor.users.find({_id:comment.user_id}).fetch();
    return{
      commentedUser:user
    }
  },[]);
  
  return(
    <Card type="inner" size="small" className="comment_card">
      <p>
        <BiUserCircle size={'20px'}/>
        {commentedUser[0].profile.first_name}
      </p>
      <p>
        {comment.text}
      </p>
    </Card>
  );
}

export default CommentCard;
