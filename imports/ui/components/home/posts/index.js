import React, { lazy, useEffect, useState } from "react";
import {Meteor} from "meteor/meteor";
import { useTracker } from 'meteor/react-meteor-data'
import { PostsDB } from "../../../../api/posts/posts";
import { FriendsDB } from "../../../../api/friends/friends";
import { Card, Spin } from "antd";
import "./style.css";

const PostCard = lazy(()=>import('./post-card/index'));


export const Posts = ({user})=>{

  const [allPosts,setAllPosts] = useState([]);

  const {postsAreReady, posts, friendsPosts, friendsPostsAreReady} = useTracker(()=>{
    const subscribe = Meteor.subscribe('posts');
    const subscribeFriends = Meteor.subscribe('user.friends');
    const userId = user._id;
    const myPosts = PostsDB.find({user_id:userId}).fetch();
    const allFriends = FriendsDB.find({user_id: userId},{fields:{'friendsList':1}}).fetch()[0]?.friendsList;
    const friendsPosts = allFriends?.map((friend)=>{
      return PostsDB.find({user_id:friend.friend_id},{fields:{'posts':1}}).fetch()[0];
    });
    const allFriendsPosts = friendsPosts ? friendsPosts[0]?.posts : undefined;
    return {
      postsAreReady:subscribe.ready(),
      posts:myPosts[0]?.posts,
      friendsPostsAreReady:subscribeFriends.ready(),
      friendsPosts: allFriendsPosts
    }
  },[]);
  

  useEffect(()=>{
    if(posts && friendsPosts){
      const list = posts.concat(friendsPosts);
      setAllPosts(list);
    }else if(!posts && friendsPosts){
      setAllPosts(friendsPosts);
    }else if(posts && !friendsPosts){
      setAllPosts(posts)
    }else setAllPosts(undefined);
  },[friendsPosts,posts]);


  if(postsAreReady){
    return(
      <div className="posts_main_container">
        <div className="posts_inner_container">
          <div className="posts">
            {allPosts
            ?
              allPosts
              ?.filter(post=>post)
              ?.sort((a,b)=>{return new Date(b.dateCreated) - new Date(a.dateCreated)})
              ?.map((post)=>
                <PostCard key={post.id} post={post}/>
              )
            :
              Array(4).fill(null).map((_, index) => 
                <Card className="mt-10" key={index}>
                  <p>No post</p>
                </Card>
              )
            }
          </div>
        </div>
      </div>
    );
  } else return <Spin/>
};