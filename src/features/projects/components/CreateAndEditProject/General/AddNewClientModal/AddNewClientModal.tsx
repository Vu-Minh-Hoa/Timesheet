import { Button, Form, Input, Modal } from 'antd';
import React, { Dispatch, SetStateAction } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../redux/Hook';
import { addNewCustomerAction } from '../../../../action/projectAction';
import { IAddNewClient } from '../../../../interface/ProjectTypes';
import './AddNewClientModal.less';

interface props {
  setIsAddNewClient: Dispatch<SetStateAction<boolean>>
  isAddNewClient: boolean
}

export const AddNewClientModal = (props: props): JSX.Element => {
  const { isAddNewClient, setIsAddNewClient } = props;
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.projectReducer.isLoading);

  const handleCancel = (): void => {
    setIsAddNewClient(!isAddNewClient);
  };

  const [form] = Form.useForm();
  const initialValues = {
    name: '',
    code: '',
    address: ''
  };

  const handleSave = async ({ name, code, address }: IAddNewClient): Promise<void> => {
    await dispatch(addNewCustomerAction({ name, code, address }));
    handleCancel();
    form.resetFields();
  };

  return (
    <Modal
      title="New client"
      width={500}
      open={isAddNewClient}
      onCancel={handleCancel}
      footer={null}
      closable={false}
    >
      <Form
        size="large"
        labelCol={{ span: 4 }}
        labelAlign="left"
        form={form}
        initialValues={initialValues}
        onFinish={(values) => { void handleSave(values); }}
        autoComplete="off"
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please enter client name!' }]}
        >
          <Input size="large" placeholder="Enter name" />
        </Form.Item>
        <Form.Item
          name="code"
          label="Code"
          rules={[{ required: true, message: 'Please enter client code!' }]}
        >
          <Input size="large" placeholder="Enter code" />
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
        >
          <Input size="large" placeholder="Enter address" />
        </Form.Item>
        <Form.Item>
          <div>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Save
            </Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};
