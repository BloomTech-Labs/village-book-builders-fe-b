import React, { useEffect, useState } from 'react';
import { Button, Divider, Input, Modal, List, Avatar } from 'antd';
import { connect } from 'react-redux';
import { checkToken, fetchMentees } from '../../../../state/actions/index';
import MenteeForm from './MenteeForm';
import MenteeProfile from './MenteeProfile';
import '../../../../style.css';
import MenteeAssignmentStatusIcon from './MenteeAssignmentStatusIcon';
import KeyIconStatus from './KeyIconStatus';
const Mentees = props => {
  let menteesSelection = [...props.mentees];
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [currentMentee, setCurrentMentee] = useState({});

  const editingHandler = (e, menteeData) => {
    if (showModal) {
      // Closing Modal
      setShowModal(false);
      setCurrentMentee({});
      setEditing(false);
    } else {
      // Opening Modal
      setShowModal(true);
      setCurrentMentee(menteeData);
      setEditing(true);
    }
  };

  const searchHandler = e => setSearch(e.target.value);
  const moreInfoHandler = (e, menteeData) => {
    if (showModal) {
      // Closing Modal
      setShowModal(false);
      setCurrentMentee({});
      setEditing(false);
    } else {
      // Opening Modal
      setShowModal(true);
      setCurrentMentee(menteeData);
    }
  };

  // filter out based on searchInput
  menteesSelection = menteesSelection.filter(mentee => {
    const fullname = `${mentee.first_name} ${mentee.last_name}`.toLowerCase();
    if (fullname.includes(search.toLowerCase())) {
      return mentee;
    }
    return null;
  });

  useEffect(() => {
    props.fetchMentees();
  }, [props]);

  return (
    <div className="menteeContainer">
      <h1 id="menteeTitle">Mentee Management</h1>
      <div className="exploreWrapper">
        <Input.Search
          value={search}
          placeholder="Search by Name"
          style={{ width: '80%', alignSelf: 'center' }}
          onChange={searchHandler}
        />
        <Divider />
        <List
          itemLayout="horizontal"
          size="small"
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: false,
          }}
          dataSource={menteesSelection}
          renderItem={item => (
            <List.Item
              actions={[
                <Button
                  onClick={e => moreInfoHandler(e, item)}
                  // className="listItemButton"
                  size="middle"
                  type="default"
                >
                  More Info
                </Button>,
                <Button
                  onClick={e => editingHandler(e, item)}
                  // className="listItemButton"
                  danger
                  size="middle"
                  type="default"
                >
                  Edit
                </Button>,
                <MenteeAssignmentStatusIcon mentee={item} />,
              ]}
            >
              <div className="listItemWrapper">
                <div className="listItemMeta">
                  <List.Item.Meta
                    avatar={<Avatar src={item.mentee_picture} />}
                    title={item.first_name + ' ' + item.last_name}
                    description={item.academic_description}
                  />
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>
      <Modal
        className="menteeModal"
        visible={showModal}
        title="Mentee Profile"
        onCancel={moreInfoHandler}
        maskClosable
        destroyOnClose
        okText="Submit"
        footer={[
          <Button
            key="back"
            onClick={editing ? editingHandler : moreInfoHandler}
          >
            Return
          </Button>,
          <Button
            key="submit"
            onClick={editing ? editingHandler : moreInfoHandler}
          >
            Submit
          </Button>,
        ]}
      >
        {editing ? (
          <MenteeForm currentMentee={currentMentee} />
        ) : (
          <MenteeProfile currentMentee={currentMentee} />
        )}
      </Modal>
      <KeyIconStatus />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    mentees: state.headmasterReducer.mentees,
    userId: state.authReducer.userId,
    role: state.authReducer.role,
  };
};

export default connect(mapStateToProps, { checkToken, fetchMentees })(Mentees);
