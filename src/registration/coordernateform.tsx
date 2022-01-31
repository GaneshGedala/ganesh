import React from 'react';
import { Form, Select, Input, Button } from 'antd';

const { Option } = Select;
 function CoordernateForm(props:any
) {
    const handleSubmit = (e:any) => {
    e.preventDefault();
    props.form.validateFields((err:any, values:any) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  const handleSelectChange = (value:any) => {
    console.log(value);
    props.form.setFieldsValue({
      note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
    });
  };
    const { getFieldDecorator } = props.form;
  return(
  <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={handleSubmit}>
    <Form.Item label="Note">
      {getFieldDecorator('note', {
        rules: [{ required: true, message: 'Please input your note!' }],
      })(<Input />)}
    </Form.Item>
    <Form.Item label="Gender">
      {getFieldDecorator('gender', {
        rules: [{ required: true, message: 'Please select your gender!' }],
      })(
        <Select
          placeholder="Select a option and change input text above"
          onChange={handleSelectChange}
        >
          <Option value="male">male</Option>
          <Option value="female">female</Option>
        </Select>,
      )}
    </Form.Item>
    <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
      
  );
}
const WrappedApp = Form.create({ name: 'coordinated' })(CoordernateForm);
export default WrappedApp;