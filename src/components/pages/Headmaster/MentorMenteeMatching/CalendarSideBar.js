import { Divider, Dropdown, Layout, Menu, Select } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as CA from '../../../../state/actions';

const { Sider } = Layout;

export default function CalendarSideBar() {
  const dispatch = useDispatch();
  const { unsavedChanges, computerId } = useSelector(state => state.CalReducer);
  const mentees = useSelector(state => state.headmasterReducer.mentees);

  // Publish Menu
  const handleMenuClick = e => {
    console.log('click', e);
  };

  //! this caused computedMatch error but still works
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">1st menu item</Menu.Item>
      <Menu.Item key="2">2nd menu item</Menu.Item>
      <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
  );

  let totalComputers = [];
  // need a property on the library for computerCount
  for (let i = 0; i < 8; i++) {
    totalComputers[i] = i + 1;
  }
  // computer selection handler
  const handleChange = value => {
    dispatch(CA.changeCalComputerIdFilter(value));
  };

  return (
    <Sider
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
          disabled={!unsavedChanges}
          overlay={menu}
          onClick={() => console.log('PUBLISHED::')}
        >
          {unsavedChanges ? 'Publish & Notify' : 'No Edits Made'}
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
            defaultValue={computerId}
            onChange={handleChange}
            style={{ width: '100%' }}
            size="large"
          >
            {totalComputers.map(comp => (
              <Select.Option key={comp} value={comp} style={{ width: '100%' }}>
                Computer {comp}
              </Select.Option>
            ))}
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
    </Sider>
  );
}
