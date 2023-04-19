import { Meteor } from "meteor/meteor";
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
  'register'(user) {
    const userId = Accounts.createUser({
      email:user.email,
      password: user.password,
      profile:{
        first_name:user.first_name,
        last_name:user.last_name
      }
    });
    return userId;
  }
});

