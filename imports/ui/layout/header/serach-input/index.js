import React, {useState} from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from 'meteor/react-meteor-data'
import { AutoComplete, Spin } from "antd";
import { useNavigate } from "react-router-dom";

const SearchInput = ()=>{
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();

  const {usersAreReady,users } = useTracker (()=>{
    const subscribe = Meteor.subscribe('user');
    const usersList = Meteor.users.find({}).fetch();
    return{
      usersAreReady: subscribe.ready(),
      users: usersList
    };
  },[]);
  
  const onSearch = (searchText) => {
    if(searchText) {
      // Remove the current user from the list:
      const newList = users.filter(u=>u._id !== Meteor.userId());
      const list = newList.filter((user) => {
        searchText.toLowerCase()
        return JSON.stringify(user.profile.first_name).toLowerCase().includes(searchText)
        ||
        JSON.stringify(user.profile.last_name).toLowerCase().includes(searchText)
      });
      setOptions(list.map((option) => {
        return {value: option.profile.first_name +' '+ option.profile.last_name , ...option}
      }));
    }
  };
  
  const onSelect = (data,option) => {
    navigate(`/profile/${option._id}`);
  };

  if(usersAreReady){
    return(
      <div className="search_input_main_container">
        <div className="search_input_main_container">
          <AutoComplete
            allowClear
            options={options}
            style={{
              width: 200,
            }}
            onSelect={onSelect}
            onSearch={onSearch}  placeholder="Search"/>
        </div>
      </div>
    );
  } else return <Spin/>
};

export default SearchInput