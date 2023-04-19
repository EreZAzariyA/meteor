import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import UserRouter from '../imports/ui/user-router.js';


Meteor.startup(() => {
  if(Meteor.isClient){
    render(<UserRouter />, document.getElementById('react-target'));
  };
});
