import { Meteor } from "meteor/meteor";
import { PostsDB } from "../../imports/api/posts/posts";
import { Random } from 'meteor/random';

Meteor.publish('posts',() =>{
  if(!Meteor.user()) throw new Meteor.Error('No User');
  return PostsDB.find({});
});


Meteor.methods({
  'posts.create'({postToSave, userId}){
    PostsDB.upsert(
      { user_id: userId },
      {
        $push: {
          posts: { $each: postToSave }
        }
      }
    );
  },
  'posts.addComment'({ post_id, postId,commentText, userId }) {
    PostsDB.update(
      { _id: post_id, 'posts.id':postId},
      {
        $push: {
          "posts.$.comments": {
            id: Random.id(),
            text: commentText,
            user_id: userId,
            created_at: new Date()
          }
        }
      }
    );
  }
});