import { Meteor } from "meteor/meteor";
import { RequestsDB } from "../../imports/api/requests/requests";
import { FriendsDB } from "../../imports/api/friends/friends";
import { checkFriendshipStatus, RelationshipSteps, RequestsType } from "../../imports/api/helpers";


Meteor.publish('friends-requests.all',(()=>{
  return RequestsDB.find({});
}));

Meteor.publish('friends-requests.user',(()=>{
  return RequestsDB.find({
    $or: [
      { 'user_id': Meteor.userId() },
      { 'friend_id': Meteor.userId() }
    ]
  });
}));

Meteor.methods({
  'friends.requests.send'(friendToSend){
    checkFriendshipStatus(Meteor.userId(),friendToSend._id);
    RequestsDB.upsert(
      {
        'user_id':this.userId,
        'friend_id':friendToSend._id,
      },
      {
        $set:{
          'details':{
            'type':RequestsType.Friendship,
            'status':RelationshipSteps.REQUESTֹ_SENT,
            'dateSent': new Date().toJSON()
          }
        }
      }
    );
  },'friends.requests.cancel'(userToCancelReq){
    RequestsDB.remove(
      {
        'user_id':this.userId,
        'friend_id':userToCancelReq._id,
      }
    );
  },
  'friends.requests.approve'(userToApprove){
    if (!userToApprove || !userToApprove._id) {
      throw new Error("Invalid userToApprove argument");
    }
    RequestsDB.upsert(
      {
        'user_id':userToApprove._id,
        'friend_id':this.userId,
      },
      {
        $set:{
          'details.status':RelationshipSteps.APPROVED,
          'details.dateApproved': new Date().toJSON()
        }
      }
    );
    FriendsDB.upsert({user_id:this.userId},{
      $push:{
        'friendsList':{
          'friend_id':userToApprove._id,
          'fromDate':new Date().toJSON()
        }
      }
    })
    FriendsDB.upsert({user_id:userToApprove._id},{
      $push:{
        'friendsList':{
          'friend_id':this.userId,
          'fromDate':new Date().toJSON()
        }
      }
    })
  },
  'friends.requests.reject'(userToReject){
    RequestsDB.update(
      {
        'user_id':userToReject._id,
        'friend_id':this.userId,
      },
      {
        $set:{
          'details.status':RelationshipSteps.REJECTED,
          'details.dateRejected': new Date().toJSON()
        }
      }
    );
  }
})