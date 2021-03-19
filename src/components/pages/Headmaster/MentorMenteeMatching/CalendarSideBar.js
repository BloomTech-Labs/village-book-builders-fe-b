import { Divider, Dropdown, Layout, Menu, Select } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import { useSelector } from 'react-redux';

export default function CalendarSideBar() {
  const mentees = useSelector(state => state.headmasterReducer.mentees);

  // Publish Menu
  const handleMenuClick = e => {
    console.log('click', e);
  };

  const menu = (
    <Menu onClick={handleMenuClick} style={{ width: '100%' }}>
      <Menu.Item key="1" style={{ width: '100%' }}>
        1st item
      </Menu.Item>
      <Menu.Item key="2">2nd item</Menu.Item>
      <Menu.Item key="3">3rd item</Menu.Item>
    </Menu>
  );

  // computer selection handler
  const handleChange = value => {
    console.log(`COMPUTER Selected ${value}`);
  };

  return (
    <Layout.Sider
      theme="light"
      style={{
        borderRight: '1px solid #f0f0f0',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img
          style={{ padding: '2rem 1rem' }}
          src="/images/vbb-full-logo.png"
          alt="VBB logo"
          width="150"
        />
        <Dropdown.Button
          size="large"
          overlay={menu}
          onClick={() => console.log('PUBLISHED::')}
        >
          Publish & Notify
        </Dropdown.Button>
        <Divider orientation="center" />
        {/* COMPUTERS */}
        <div
          style={{
            width: '100%',
            padding: '0px .5rem 0px .5rem',
          }}
        >
          <Title level={4}>Computers</Title>
          <Select
            defaultValue="1"
            onChange={handleChange}
            style={{ width: '100%' }}
            size="large"
          >
            <Select.Option value="1">Computer 1</Select.Option>
            <Select.Option value="2">Computer 2</Select.Option>
            <Select.Option value="3">Computer 3</Select.Option>
            <Select.Option value="4">Computer 4</Select.Option>
          </Select>
        </div>
      </div>
      <Divider orientation="center" style={{ marginBottom: '0px' }} />
      {/* Unassigned Mentees */}
      <Menu mode="inline">
        <SubMenu key="sub1" title="Unassigned Students">
          {mentees
            .filter(student => student.hasAppointment === false)
            .map(item => (
              <Menu.Item key={`unStu-${item.id}`}>
                {item.first_name} {item.last_name}
              </Menu.Item>
            ))}
        </SubMenu>
      </Menu>
      <Divider
        orientation="center"
        style={{ marginTop: '0px', marginBottom: '0px' }}
      />
      {/* ALL STUDENTS */}
      <Menu mode="inline">
        <SubMenu key="sub1" title="All Students">
          {mentees.map(item => (
            <Menu.Item key={`allStu-${item.id}`}>
              {item.first_name} {item.last_name}
            </Menu.Item>
          ))}
        </SubMenu>
      </Menu>
      <Divider
        orientation="center"
        style={{ marginTop: '.125rem', marginBottom: '0px' }}
      />
      {/* Assigned Students */}
      <Menu mode="inline">
        <SubMenu key="sub1" title="Assigned Students">
          {mentees
            .filter(student => student.hasAppointment === true)
            .map(item => (
              <Menu.Item key={`asgStu-${item.id}`}>
                {item.first_name} {item.last_name}
              </Menu.Item>
            ))}
        </SubMenu>
      </Menu>
    </Layout.Sider>
  );
}
