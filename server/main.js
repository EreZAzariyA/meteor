import { Meteor } from 'meteor/meteor';
import "./user/user";
import "./users/users";
import "./friends/friends";
import "./posts/posts";
import "./requests/requests";
import "./friends-requests/friends-requests";

if(Meteor.isServer){

  Meteor.startup(async () => {
    const text = `Server starting, isProduction: ${Meteor.isProduction}...`;
    console.info(text);
  });

}
