import React from "react";
import {Meteor} from "meteor/meteor";
import { useTracker } from 'meteor/react-meteor-data'
import { Spin } from "antd";
import { UploadInput } from "./upload-input";
import { Stories } from "./stories";
import { Posts } from "./posts";
import "./style.css";
import { PostsDB } from "../../../api/posts/posts";

const Home = () => {

  const {userIsReady,user, posts} = useTracker(()=>{
    const subscribe = Meteor.subscribe('user');
    const allPosts = PostsDB.find({user_id:Meteor.userId()});
    return{
      userIsReady: subscribe.ready(),
      user: Meteor.user(),
      posts: allPosts.fetch()
    }
  },[]);

  if(userIsReady){
    return(
      <div className="home_main_container">
        <div className="home_inner_container">
          <div className="home_page">
            
            <div className="stories_section">
              <Stories user={user}/>
            </div>

            <div className="upload_input_section">
              <UploadInput user={user} listOfPosts={posts}/>
            </div>

            <div className="posts_section">
              <Posts user={user}/>
            </div>

          </div>

        </div>
      </div>
      );
  }else{
    return <Spin/>
  }
};

export default Home;