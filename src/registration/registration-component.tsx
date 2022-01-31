import { Form, Input, Select } from 'antd';
import React, { useState } from 'react';

export interface RegistrationProps {
    form: any
}
const { Option } = Select;
const RegistrationComponentOriginal = (props: RegistrationProps) => {
    const [state, setState] = useState({
        confirmDirty:false
    });


    const { getFieldDecorator } = props.form;
    const prefixSelector = getFieldDecorator('prefix', {
        initialValue: '91',
      })(
        <Select style={{ width: 70 }}>
          <Option value="91">+91</Option>
          <Option value="92">+92</Option>
        </Select>,
      );

     const validateToNextPassword = (rule:any, value:any, callback: () => void) => {
        const { form } = props;
        if (value && state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      };

     const handleConfirmBlur = (e:any) => {
        const { value } = e.target;
        setState({ confirmDirty: state.confirmDirty || !!value });
      };
    
     const compareToFirstPassword = (rule:any, value:any, callback: any) => {
        const { form } = props;
        if (value && value !== form.getFieldValue('password')) {
          callback('Two passwords that you enter is inconsistent!');
        } else {
          callback();
        }
      };
    return (<Form>
        <Form.Item label="E-mail">
            {getFieldDecorator('email', {
                rules: [
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    }
                ],
            })(<Input />)}
        </Form.Item>
        <Form.Item label="Phone Number">
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Please input your phone number!' }],
          })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
        </Form.Item>
        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                validator: validateToNextPassword,
              },
            ],
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="Confirm Password" hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={handleConfirmBlur} />)}
        </Form.Item>
    </Form>);
};

const RegistrationComponent = Form.create({ name: 'RegistrationComponentOriginal' })(RegistrationComponentOriginal);

export default RegistrationComponent;
