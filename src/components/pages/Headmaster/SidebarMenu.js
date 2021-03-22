import {
  BookOutlined,
  CalendarOutlined,
  FormOutlined,
  HomeOutlined,
  LogoutOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Menu } from 'antd';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function SidebarMenu({ profile }) {
  return (
    <>
      <Menu mode="inline" defaultSelectedKeys={['1']}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '2rem 1rem',
          }}
        >
          <Avatar style={{ color: '#FF914D' }} icon={<UserOutlined />} />
          <div style={{ fontSize: '.75rem', padding: '1rem' }}>
            {profile.last_name || 'Headmaster'}
          </div>
        </div>
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <NavLink to="/dashboard">Home</NavLink>
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
          <NavLink to="/profile">Profile</NavLink>
        </Menu.Item>
        <Menu.Item key="3" icon={<CalendarOutlined />}>
          <NavLink to="/mentor-pairings">Mentee List</NavLink>
        </Menu.Item>
        <Menu.Item key="4" icon={<UnorderedListOutlined />}>
          <NavLink to="/mentor-list">Mentor List</NavLink>
        </Menu.Item>
        <Menu.Item key="5" icon={<BookOutlined />}>
          <NavLink to="/school-village">School/Village</NavLink>
        </Menu.Item>
        <Menu.Item key="6" icon={<FormOutlined />}>
          <NavLink to="/student-search">Student Registration</NavLink>
        </Menu.Item>
        <Menu.Item key="7">
          <NavLink to="/sessions-by-library">Get problems</NavLink>
        </Menu.Item>
        <Menu.Item key="8" icon={<LogoutOutlined />}>
          <Link to="/logout">Logout</Link>
        </Menu.Item>
      </Menu>
      <div>
        <img
          style={{ padding: '2rem 1rem' }}
          src="/images/vbb-full-logo.png"
          alt="VBB logo"
          width="150"
        />
      </div>
    </>
  );
}

export default SidebarMenu;
