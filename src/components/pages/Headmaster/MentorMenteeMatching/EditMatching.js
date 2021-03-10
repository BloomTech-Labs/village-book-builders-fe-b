import { connect } from 'react-redux';
import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import {
  Form,
  Layout,
  Button,
  Select,
  DatePicker,
  TimePicker,
  Modal,
} from 'antd';

const EditMatching = props => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form, setForm] = useState({
    date: '',
    start: '',
    end: '',
    type: 'success',
    content: '',
  });

  // Modal
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  //Modal

  function onChange(time, timeString) {
    console.log(time, timeString);
  }

  const [componentSize, setComponentSize] = useState();

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <>
      <Button type="primary" onClick={showModal} style={{ margin: '20px' }}>
        Edit
      </Button>

      <Layout>
        <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
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
            style={{
              background: '#FFDCC3',
              border: '#FFDCC3 solid 2px',
              padding: '10px',
              borderRadius: '10px',
            }}
          >
            <div style={{ width: '100%' }}>
              <Form.Item label="Mentor">
                <Select>
                  <Select.Option value="demo">Rob</Select.Option>
                  <Select.Option value="demo">Kasi</Select.Option>
                  <Select.Option value="demo">Mark</Select.Option>
                </Select>
              </Form.Item>
            </div>

            <div style={{ width: '100%' }}>
              <Form.Item label="Mentee">
                <Select>
                  <Select.Option value="demo">Remon</Select.Option>
                  <Select.Option value="demo">Jose</Select.Option>
                  <Select.Option value="demo">Ethan</Select.Option>
                  <Select.Option value="demo">Thierno</Select.Option>
                </Select>
              </Form.Item>
            </div>

            <div style={{ width: '100%' }}>
              <Form.Item label="Date">
                <DatePicker />
              </Form.Item>
            </div>

            <div
              style={{
                padding: '5px',
                margin: '10px',
                marginLeft: '5%',
                display: 'flex',
                flexWrap: ' wrap',
              }}
            >
              <Form.Item label="Start">
                <TimePicker
                  use12Hours
                  format="h:mm A"
                  onChange={onChange}
                  style={{ width: 140 }}
                />
              </Form.Item>
              <Form.Item label="End">
                <TimePicker
                  use12Hours
                  format="h:mm A"
                  onChange={onChange}
                  style={{ width: 140 }}
                />
              </Form.Item>
            </div>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}
              >
                Save
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Layout>
    </>
  );
};

export default EditMatching;
