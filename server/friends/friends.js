import { Meteor } from "meteor/meteor";
import { FriendsDB } from "../../imports/api/friends/friends";
import { RelationshipSteps } from "../../imports/api/helpers";

Meteor.publish('friends',()=>{
  if(!Meteor.user()) throw new Meteor.Error('No-user');
  return FriendsDB.find({});
});

Meteor.publish('friends.user',()=>{
  if(!Meteor.user()) throw new Meteor.Error('No-user');
  return FriendsDB.find(this.userId);
});

Meteor.methods({
  'friends.user'(){
    return FriendsDB.find(this.userId);
  },
  'friends.sent.request'(friend){
    FriendsDB.upsert({user_id: this.userId, friend_id:friend._id},{
      $set:{
        "status": RelationshipSteps.REQUESTֹ_SENT
      }
    })
  },
  'friends.accept.request'(user_id){
    FriendsDB.upsert({friend_id: this.userId,user_id:user_id},{
      $set:{
        "status": RelationshipSteps.APPROVED
      }
    })
  },
  'friends.reject.request'(user_id){
    FriendsDB.upsert({friend_id: this.userId,user_id:user_id},{
      $set:{
        "status": RelationshipSteps.REJECTED
      }
    })
  },
  '.friends.block.user'(){

  }
});