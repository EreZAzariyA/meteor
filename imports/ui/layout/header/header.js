import React, { lazy, Suspense } from "react";
import { Button, Dropdown, Spin } from "antd";
import { VscAccount } from "react-icons/vsc";
import { Logo,Logout, useResize } from "../../../api/helpers";
import SearchInput from "./serach-input";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Notifications = lazy(()=>import('./notifications/index'));
const Bookmarks = lazy(()=>import('./bookmarks/index'));

export const Header = ()=>{
  const {isResponsive} = useResize();
  const navigate = useNavigate();

  const logout = ()=>{
    logout();
    navigate('/');
  }

  const items = [
    {
      key: 'logout',
      label: <Button onClick={Logout} type="link" danger>Logout</Button>
    }
  ];

  return(
    <div className="header_main_container">
      <div className="header_inner_container">

        <div className="left_side_container">
          <div className="left_side">

            <div className="logo">
              <Logo/>
            </div>

            {isResponsive &&
              <div className="profile_menu_dropdown">
                <Suspense fallback={<Spin/>}>
                  <Bookmarks/>
                </Suspense>
              </div> 
            }
          </div>
        </div>
        

        
        <div className="center">
          <div className="search_box">
            <SearchInput/>
          </div>
        </div>



        <div className="right_side_container">
          <div className="right_side">

            <div className="notifications">
              <Suspense fallback={<Spin/>}>
                <Notifications/>
              </Suspense>
            </div>
    
            <div className="auth">
              <Dropdown menu={{items}} placement="bottomLeft" arrow trigger={['click','hover']}>
                <VscAccount color="darkblue" size={'30px'}/>
              </Dropdown>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}