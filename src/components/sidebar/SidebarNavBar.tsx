import React from 'react';
import { AiFillHome, AiFillProject } from 'react-icons/ai';
import './SidebarNavBar.less';
import { useAppSelector } from '../../redux/Hook';
import { NavLink } from 'react-router-dom';

const tablist = [
  {
    name: 'Home',
    path: '/home',
    icon: <AiFillHome />
  },
  {
    name: 'Project',
    path: '/projects',
    icon: <AiFillProject />
  }
];

export const SidebarNavBar = (): JSX.Element => {
  const userInfo = useAppSelector((state) => state.loginSlice.userInfo);

  return (
    <>
      <div className='user_info_container'>
        <img src={userInfo.avatarFullPath} alt='' />
        <div>
          <span> {userInfo.surname} {userInfo.name} </span>
          <span> {userInfo.emailAddress} </span>
        </div>
      </div>
      <ul className='navBar'>
        {tablist.map((item, index) => {
          return (
            <>
              <NavLink
                to={item.path}
                key={index}
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                className={({ isActive }) =>
                  isActive ? 'isActive navBar-item' : 'navBar-item'
                }
              >
                <li>
                  {item.icon}
                  {item.name}
                </li>
              </NavLink>
            </>
          );
        })}
      </ul>
    </>
  );
};
