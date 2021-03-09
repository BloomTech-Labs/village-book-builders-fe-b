import React from 'react';
import Login from './Login';
import 'antd/dist/antd.css';
import { PageHeader, Button, Layout } from 'antd';

/**
 * This Component contains the Login form as well.
 */
function LoginHeader() {
  const { Content } = Layout;

  return (
    <div>
      <Layout>
        <Content>
          <PageHeader
            title={
              <img
                src="/images/vbb-full-logo.png"
                alt="VBB logo"
                width="100"
              ></img>
            }
            style={{ padding: '1rem' }}
            extra={[
              <Button key="1">
                <a href="https://www.villagebookbuilders.org/">VBB Home</a>
              </Button>,
              <Button key="2" type="primary">
                <a href="/register">Register</a>
              </Button>,
            ]}
          ></PageHeader>
        </Content>
      </Layout>
      {/* Login Form */}
      <Login />
    </div>
  );
}
export default LoginHeader;
