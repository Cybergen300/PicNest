import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {Link} from 'react-router-dom';
import camera from '../camera.png'
import home from '../home.png'
import chat from '../chat.png'
import user from '../user.png'
import './Navbar.css'


class Navbar extends Component {

  render() {
    return (
      <nav className="navbar fixed-top flex-md-nowrap p-2 shadow bg-light">

          <div
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            target="_blank"
            rel="noopener noreferrer"
          >
            <NavLink to= '/'>
              <img src={camera} width="40" height="40" className="d-inline-block " alt="camera_icon" />
              <h3 className="d-inline-block align-top ml-3 mt-1">
                Picnest
              </h3>
            </NavLink>
          </div>

        <ul className="navbar-nav px-3 flex-row">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <Link to = {{ pathname :'/', 
                          aboutProps: {
                          name: 'TEST'
                          }
                        }}>

            <img title = 'home' className='mr-0' width='60' height='60' src={home} alt= "home_icon"/>
            </Link>
          </li>
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <Link to = {{pathname:'/Textchat',
                        }}>
              <img title = 'messenger' className='mr-3 mt-3' width='30' height='30' src={chat} alt= "chat_icon"/>
            </Link>
          </li>
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <Link to = {{pathname: '/AccountSettings',
            aboutProps:{
                name: 'TEST1'
              }
            }}>
              <img title = 'settings' className='mr-5 mt-3' width='30' height='30' src={user} alt ="account_icon"/>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}


export default Navbar;