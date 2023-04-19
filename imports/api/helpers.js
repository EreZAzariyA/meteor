import React from "react";
import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom";
import { Meteor } from "meteor/meteor";

export const isAdmin = (user) => {
  return user && user.admin;
};

export const Logout = () => {
  Meteor.logout(err=>{
    if(err){
      alert(err);
    };
  });
};

export const ErrorsTypes = {
  AUTH: {
    REGISTER: {
      EMAIL_EXIST: "Email already exist.",
      EMAIL_NOT_VALID: "This is not a valid email address.",
      EMAIL_OR_PASSWORD_INCORRECT: "Email or password are incorrect.",
      MISSING_FIELDS: 'Some fields are missing.'
    },
    LOGIN: {
      EMAIL_NOT_VALID: "This is not a valid email address.",
      EMAIL_OR_PASSWORD_INCORRECT: "Email or password are incorrect.",
    }
  },
  APP_JSON_MISSING: "Server requires application/json. We don't share our API.",
};

export const Messages = {
  DURATION: 1.5,
  AUTH: {
    MESSAGE: {
      SUCCESS: 'Authentication Success',
      ERROR: 'Authentication Error',
    },
    DESCRIPTION: {
      SUCCESS:{
        REGISTER: 'Registered successfully',
        LOGIN: 'Connected',
        LOGOUT: 'Logout Successfully'
      },
      ERROR: {
        REGISTER: '',
        LOGIN: 'Incorrect email or password'
      }
    }

  }
}

export const checkFriendshipStatus = (user_id,friend_id)=>{
  if(user_id === friend_id){
    throw new Meteor.Error('Cant send request to yourself');
  }else if(!Meteor.users.find({_id:friend_id}).fetch()){
    throw new Meteor.Error('User not found');
  }
};

export const ListType = {
  Friends: "Friends",
  Posts:"Posts",
  Saved:"Saved"
}

export const RequestsType = {
  Friendship: "Friendship",
  Game: "Game",
  LiveStreaming: "LiveStreaming"
}

export const RelationshipSteps = {
  REQUESTֹ_SENT: "REQUESTֹ_SENT",
  WAITING_FOR_RESPONSE: "WAITING_FOR_RESPONSE",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  BLOCKED: "BLOCKED"
};

export const validateFieldsAndSpaces = (valueToCheck) => {
  const regexp = /^\S.*\S$/;

  for (const [key, value] of Object.entries(valueToCheck)) {
    if(!value){
      throw new Meteor.Error(`Some fields are missing`);
    }
    if(!value.match(regexp)){
      throw new Meteor.Error(`Keep trying 😁`);
    }
  };
  return true;
}


export const useResize = () => {
  const [screenSize, setScreenSize] = useState({
    width: 0,
    height: 0,
    isMobile: false,
    isResponsive: false
  })

  const updateSize = () => {
    setScreenSize({
      width: window.innerWidth,
      height: window.innerHeight,
      isMobile: window.innerWidth < 768,
      isResponsive: window.innerWidth < 992
    })
  }

  useEffect(() => {
    window.addEventListener("resize", updateSize)
    updateSize()

    return () => {
      window.removeEventListener("resize", updateSize)
    }
  }, [])

  return screenSize;
}


export const Logo =()=>{
  return(
    <div className="logo_container">
      <NavLink to={'/home'}>
        <div className="logo">
          E.A
        </div>
      </NavLink>
    </div>
  )
}

export const getFullName = (user)=>{
  const fullName = user.profile.first_name + " " + user.profile.last_name;
  return fullName;
};

export const getError = (err)=> {
  if(typeof err === "string") return err;
  if(typeof err.response?.data === "string") return err.response.data; // axios: 401, 403, 500
  if(Array.isArray(err.response?.data)) return err.response.data[0]; // axios: 400 - array of errors
  if(typeof err.message === "string") return err.message;
  return "Some error, please try again.";
};