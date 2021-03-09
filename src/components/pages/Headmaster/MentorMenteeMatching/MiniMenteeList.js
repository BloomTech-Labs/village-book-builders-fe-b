import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Divider, List, Avatar } from 'antd';
import MenteeAssignmentStatusIcon from '../Mentees/MenteeAssignmentStatusIcon';
import { fetchMentees } from '../../../../state/actions/index';

const MiniMenteeList = props => {
  const { fetchMentees } = props;

  useEffect(() => {
    fetchMentees();
  }, [fetchMentees]);

  return (
    <div className="miniList">
      <h2>Mentee List</h2>
      <div>
        <Divider />
        <List
          itemLayout="vertical"
          size="small"
          dataSource={props.mentees}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: false,
          }}
          renderItem={item => (
            <List.Item extra={<MenteeAssignmentStatusIcon mentee={item} />}>
              <List.Item.Meta
                avatar={<Avatar src={item.mentor_picture} />}
                title={`${item.first_name} ${item.last_name}`}
                description={`Primary Language: ${item.primary_language}`}
              />
            </List.Item>
          )}
        />
        <Divider />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isloading: state.headmasterReducer.isLoading,
    mentees: state.headmasterReducer.mentees,
  };
};

export default connect(mapStateToProps, { fetchMentees })(MiniMenteeList);
