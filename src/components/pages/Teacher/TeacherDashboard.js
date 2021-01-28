import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Link,
  NavLink,
  // Redirect,
  // BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import TeacherHome from './TeacherHome';
import TeacherProfile from '../Teacher/TeacherProfile';
import TeacherProfileForm from '../Teacher/TeacherProfileForm';
import StudentSearch from '../Student/StudentSearch';
import { fetchTeacherProfile } from '../../../state/actions';
import { Drawer, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import '../../../styles/Dashboard.css';
import {
  menuButton,
  menuIcon,
  menuMove,
  Dashboard,
} from '../../../styles/Dashboard.style';
import Logout from '../../Logout.js';

const TeacherDashboard = props => {
  const [visible, setVisible] = useState(true);
  const [desktop, setDesktop] = useState(true);
  const { profile } = props;

  useEffect(() => {
    props.fetchTeacherProfile(0); // change this later with login
  }, []);
  console.log(profile);

  useEffect(() => {
    if (window.innerWidth <= 800 || document.documentElement.width <= 800) {
      setDesktop(false);
      setVisible(false);
    } else {
      setDesktop(true);
    }
  }, []);

  const onClose = () => {
    setVisible(false);
  };

  // Todo: this needs to be converted to a mediaquery and removed from here
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 800 || document.documentElement.width <= 800) {
      setDesktop(false);
      setVisible(false);
    } else {
      setDesktop(true);
      setVisible(true);
    }
  });

  return (
    <div>
      <Dashboard>
        <Switch>
          <Route exact path="/dashboard" component={TeacherHome} />
          <Route exact path="/profile" component={TeacherProfile} />
          <Route path="/profile/edit/:id" component={TeacherProfileForm} />
          <Route path="/student-search" component={StudentSearch} />
          <Route path="/logout" component={Logout} />
        </Switch>
      </Dashboard>

      {desktop ? null : (
        // inline style to force animation
        <div style={visible ? menuMove : menuIcon}>
          <Button
            type="primary"
            style={menuButton} // inline style to override Ant Design
            onClick={() => setVisible(!visible)}
            icon={<MenuOutlined />}
          >
            Menu
          </Button>
        </div>
      )}
      <div>
        <Drawer
          placement={desktop ? 'left' : 'bottom'}
          closable={false}
          onClose={onClose}
          visible={visible}
          mask={false}
          width={desktop ? 300 : 500}
          height={500}
        >
          <img src="/images/vbb-full-logo.png" alt="VBB logo" width="200"></img>
          <h2 style={{ padding: '2rem 0 1rem 0', fontSize: '1rem' }}>
            Hello,{' '}
            <span
              style={{ color: ' #FF914D' }}
            >{`${profile.first_name} ${profile.last_name}`}</span>
          </h2>

          <NavLink to="/dashboard" onClick={() => setVisible(true)}>
            <button className="btn l2-btn menuLinks">Home</button>
          </NavLink>
          <NavLink to="/profile" onClick={() => setVisible(true)}>
            <button className="btn l2-btn menuLinks">Profile</button>
          </NavLink>
          <NavLink to="/student-search" onClick={() => setVisible(true)}>
            <button className="btn l2-btn menuLinks">
              Student Registration
            </button>
          </NavLink>
          <Link to="/logout" onClick={() => setVisible(true)}>
            <button className="btn l2-btn menuLinks">Logout</button>
          </Link>
        </Drawer>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loggedIn: state.authReducer.loggedIn,
    userId: state.authReducer.userId,
    role: state.authReducer.role,
    profile: state.teacherReducer.teacherProfile,
  };
};

export default connect(mapStateToProps, { fetchTeacherProfile })(
  TeacherDashboard
);
