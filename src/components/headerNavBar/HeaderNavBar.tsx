import React, { useState } from 'react';
import './HeaderNavBar.less';
import { Menu, Switch } from 'antd';
import { NavLink } from 'react-router-dom';
import companyLogo from '../../assets/img/nccsoft_vietnam_logo.png';
import { BsFillMoonFill, BsThreeDotsVertical } from 'react-icons/bs';
import { IoExitOutline } from 'react-icons/io5';
import { removeAccessToken } from '../../ults/LocalStorage';
import { useAppDispatch } from '../../redux/Hook';
import { logout } from '../../features/authen/loginReducer/LoginReducer';

interface Props {
  handleChangeTheme: React.Dispatch<React.SetStateAction<boolean>>
}

export const HeaderNavBar = (props: Props): JSX.Element => {
  const { handleChangeTheme } = props;
  const dispatch = useAppDispatch();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const handleLogout = (): void => {
    removeAccessToken();
    dispatch(logout());
  };

  const handleCheckDarkMode = (isChecked: boolean): void => {
    setIsDarkMode(isChecked);
    handleChangeTheme(isChecked);
  };

  return (
    <>
      <NavLink to='/home'>
        <div className='company_logo'>
          <img src={companyLogo} alt='NCC logo' />
          <span> Timesheets </span>
        </div>
      </NavLink>
      <Menu className='navBar_container'
        mode='horizontal'
        triggerSubMenuAction='click'
      >
        <Menu.SubMenu popupClassName={isDarkMode ? 'dark-theme' : ''} className='user-setting' icon={<BsThreeDotsVertical />} style={{ top: '0px' }}>
          <div className='toggle_theme'>
            <span>
              <BsFillMoonFill />
            </span>
            <Switch onChange={handleCheckDarkMode} />
          </div>
          <Menu.Item className='user-setting-item' onClick={handleLogout}>Logout <IoExitOutline /></Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </>
  );
};
