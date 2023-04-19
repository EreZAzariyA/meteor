import { Meteor } from "meteor/meteor";
import { FriendsDB } from "../../imports/api/friends/friends";
import { PostsDB } from "../../imports/api/posts/posts";
import { StoriesDB } from "../../imports/api/stories/stories";


Meteor.publish('users.all', () => {
  return Meteor.users.find({});
});
Meteor.publish('user', () => {
  return Meteor.users.find(this.userId);
});

Meteor.publish('user.friends',()=>{
  if(!Meteor.user()) throw new Meteor.Error('No-user');
  return FriendsDB.find(this.userId);
});

Meteor.publish('user.posts',() =>{
  if(!Meteor.user()) throw new Meteor.Error('No User');
  return PostsDB.find(this.userId);
});

Meteor.publish('user.stories',()=>{
  return StoriesDB.find(this.userId);
});
