import React from "react";
import {Meteor} from "meteor/meteor";
import {useTracker} from "meteor/react-meteor-data"
import { StoriesDB } from "../../../../api/stories/stories";
import { Card, Carousel, Spin } from "antd";
import "./style.css";
import { StoriesSlider } from "./stories-slider/stories-slider";

export const Stories = ({user})=>{
  
  const {storiesAreReady,stories} = useTracker(()=>{
    const subscribe = Meteor.subscribe('stories.user');
    const allStories = StoriesDB.find({'user.id': user._id});
    return{
      storiesAreReady: subscribe.ready(),
      stories: allStories.fetch()
    }
  },[]);

  if(storiesAreReady){
    return(
      <div className="stories_main_container">
        <div className="stories_inner_container">
          <div className="stories">
            <div className="stories_slider">
              <StoriesSlider stories={stories}/>
            </div>

          </div>
        </div>
      </div>
      );
    }else {
      return <Spin/>
    };
};