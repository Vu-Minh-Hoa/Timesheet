import { Button, DatePicker, DatePickerProps, Form, Modal } from 'antd';
import { Moment } from 'moment';
import React, { Dispatch, SetStateAction, useState } from 'react';

interface Props {
  isModalActive: boolean
  setIsModalActive: Dispatch<SetStateAction<boolean>>
  handleCustomDate: Function
}

const { Item } = Form;

export const CustomTimeModal = (props: Props): JSX.Element => {
  const { isModalActive, setIsModalActive, handleCustomDate } = props;
  const [startDate, setStartDate] = useState<Moment | String>('');
  const [endDate, setEndDate] = useState('');
  const dateFormat = 'YYYY/MM/DD';
  const [form] = Form.useForm();

  const handleCancel = (): void => {
    setIsModalActive(!isModalActive);
    form.resetFields();
  };

  const onChangeStartDate: DatePickerProps['onChange'] = (date, dateString) => {
    setStartDate(dateString);
  };

  const onChangeEndDate: DatePickerProps['onChange'] = (date, dateString) => {
    setEndDate(dateString);
  };

  const handleSave = (): void => {
    handleCustomDate(startDate, endDate);
    handleCancel();
    form.resetFields();
  };

  return (
    <Modal
      title="Custom Time"
      width={300}
      open={isModalActive}
      onCancel={handleCancel}
      footer={null}
      closable={false}
    >
      <Form
        size="large"
        initialValues={{ startDate: null, endDate: null }}
        onFinish={handleSave}
        form={form}
      >
        <Item
          name="startDate"
          rules={[{ required: true, message: 'Please select start date!' }]}
        >
          <DatePicker
            onChange={onChangeStartDate}
            format={dateFormat}
            style={{ width: '252px' }}
            placeholder="From date"
          />
        </Item>
        <Item
          name="endDate"
          rules={[{ required: true, message: 'Please select end date!' }]}
        >
          <DatePicker
            onChange={onChangeEndDate}
            format={dateFormat}
            style={{ width: '252px' }}
            placeholder="To date"
          />
        </Item>
        <Item>
          <div>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </div>
        </Item>
      </Form>
    </Modal>
  );
};
