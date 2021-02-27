import { connect } from 'react-redux';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Form, Button, Select, DatePicker, TimePicker } from 'antd';

const initialState = {
  date: '',
  type: 'success',
  content: '',
};

function onChange(time, timeString) {
  console.log(time, timeString);
}

const EditMatching = props => {
  const [componentSize, setComponentSize] = useState;

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <Form.Item label="Edit" name="size"></Form.Item>

        <Form.Item label="Mentor">
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Mentee">
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Date">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Time">
          <TimePicker
            use12Hours
            format="h:mm A"
            onChange={onChange}
            style={{ width: 140 }}
          />
          <TimePicker
            use12Hours
            format="h:mm A"
            onChange={onChange}
            style={{ width: 140 }}
          />
        </Form.Item>
        <Form.Item>
          <Button>Save</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default connect(EditMatching);
