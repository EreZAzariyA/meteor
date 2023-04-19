import { Meteor } from "meteor/meteor";
import { RequestsDB } from "../../imports/api/requests/requests";

Meteor.publish('requests.all',(()=>{
  return RequestsDB.find({});
}));