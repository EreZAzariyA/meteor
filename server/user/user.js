import { Meteor } from "meteor/meteor";
import { FriendsDB } from "../../imports/api/friends/friends";
import { PostsDB } from "../../imports/api/posts/posts";
import { StoriesDB } from "../../imports/api/stories/stories";


Meteor.publish('user', () => {
  return Meteor.users.find({ '_id': Meteor.userId() });
});

Meteor.publish('user.friends',()=>{
  if(!Meteor.user()) throw new Meteor.Error('No-user');
  return FriendsDB.find({user_id:Meteor.userId()});
});

Meteor.publish('user.posts',() =>{
  if(!Meteor.user()) throw new Meteor.Error('No User');
  return PostsDB.find({user_id:Meteor.userId()});
});

Meteor.publish('stories.user',()=>{
  return StoriesDB.find({'user._id':Meteor.userId()});
});
