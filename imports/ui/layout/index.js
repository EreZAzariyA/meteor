import React, { lazy } from "react";
import { Layout } from "antd";
import { Header } from "./header/header";
import { useResize } from "../../api/helpers";
import { Routing } from "./routing";
import "./layout.css";

const Bookmarks = lazy(()=>import('../components/bookmarks/index'));
const Contacts = lazy(()=>import('../components/contacts/index'));

const { Content, Sider} = Layout;

const App = ()=>{
  const { isMobile, isResponsive } = useResize();

  return(
      <Layout className='main_layout'>
        <div className="header">
          <Header/>
        </div>

        <Layout style={!isResponsive
          ?
            { marginLeft: '25em',marginRight: '14.5em' }
          :
            !isMobile
          ?
          { marginRight: '14.5em'} : {}}
        >
          {!isResponsive &&
            <Sider theme="light" 
              width={350}
              className="profile_sider"
            >
              <Bookmarks />
            </Sider>
          }

          <Content>
            <Routing/>
          </Content>

          {!isMobile &&
            <Sider 
              theme="light" 
              width={200} 
              className="seconde-sider"
            >
              <Contacts />
            </Sider>
          }
        </Layout>
      </Layout>
  )
};

export default App;
