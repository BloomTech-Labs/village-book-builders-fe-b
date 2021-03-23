import { Button, Dropdown, Menu, PageHeader } from 'antd';
import React from 'react';
import { AiOutlineDown, AiOutlineMenuUnfold } from 'react-icons/ai';

/**
 *  Top navigation bar for headmaster
 * @param {Object} props.profile Headmaster Profile information
 * @param {()=>void} props.onClose Function to toggle the left drawer for site nav
 * @returns React Element
 */
export default function HeadmasterHeader({ profile, onClose }) {
  return (
    <>
      <PageHeader
        theme="light"
        onBack={() => onClose()}
        backIcon={<AiOutlineMenuUnfold />}
        title={`Hello, Headmaster ${profile.last_name || ''}`}
        avatar={{
          src: 'https://picsum.photos/100',
        }}
        extra={[
          <Button key="3">Scheduler</Button>,
          <Button key="2">Calendar</Button>,
          <Dropdown
            key="more"
            overlay={
              <Menu>
                <Menu.Item>
                  <a href="/logout">Logout</a>
                </Menu.Item>
              </Menu>
            }
          >
            <Button key="1" type="primary">
              <span
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {profile.first_name}{' '}
                <AiOutlineDown style={{ marginLeft: '5px' }} />
              </span>
            </Button>
          </Dropdown>,
        ]}
      />
    </>
  );
}
