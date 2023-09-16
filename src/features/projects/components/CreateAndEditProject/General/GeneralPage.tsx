import { Button, Checkbox, DatePicker, Form, Input, Radio, Select } from 'antd';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../redux/Hook';
import { radioOptions } from '../../../interface/ProjectTypeConstant';
import { FieldData } from 'rc-field-form/es/interface';
import { ECreateProjectType, ICurrentProject } from '../../../interface/ProjectTypes';
import { AddNewClientModal } from './AddNewClientModal/AddNewClientModal';
import { getCurrentPage, setGeneralTabData } from '../../../projectReducer/ProjectReducer';
import './GeneralPage.less';
import { getAllCustomerAction } from '../../../action/projectAction';

const dateFormat = 'DD/MM/YYYY';

const initialValues = [
  { name: 'customerId', value: null },
  { name: 'name', value: '' },
  { name: 'code', value: '' },
  { name: 'timeStart', value: '' },
  { name: 'timeEnd', value: '' },
  { name: 'note', value: '' },
  { name: 'isAllUserBelongTo', value: false },
  { name: 'projectType', value: ECreateProjectType.TIME_MATERIAL }
];

export const GeneralPage = (): JSX.Element => {
  const isLoading = useAppSelector((state) => state.projectReducer.isLoading);
  const customerList = useAppSelector((state) => state.projectReducer.clientList);
  const currentProject = useAppSelector((state) => state.projectReducer.currentProject);
  const currentPage = useAppSelector((state) => state.projectReducer.currentPage);
  const [isAddNewClient, setIsAddNewClient] = useState(false);
  const dispatch = useAppDispatch();
  const [currentField, setCurrentField] = useState<FieldData[]>(initialValues);
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [form] = Form.useForm();

  const handleFieldChange = (changedFields: FieldData[]): void => {
    setCurrentField([
      { name: changedFields[0].name, value: changedFields[0].value }
    ]);
  };

  const loadCustomerList = async (): Promise<void> => {
    await dispatch(getAllCustomerAction());
  };

  const handleNext = (value: ICurrentProject): void => {
    dispatch(
      setGeneralTabData({
        ...value,
        timeStart: moment(value.timeStart).format(),
        timeEnd: moment(value.timeEnd).format(),
        id: projectId
      })
    );
    if (projectId != null) {
      navigate(`/projects/edit/${projectId}/team`, {
        state: projectId
      });
    } else navigate('/projects/create/team');
    dispatch(getCurrentPage(currentPage + 1));
  };

  useEffect(() => {
    void loadCustomerList();
    if (projectId != null) {
      setCurrentField([
        { name: 'customerId', value: currentProject.customerId },
        { name: 'name', value: currentProject.name },
        { name: 'code', value: currentProject.code },
        { name: 'timeStart', value: moment(currentProject.timeStart) },
        { name: 'timeEnd', value: moment(currentProject.timeEnd) },
        { name: 'note', value: currentProject.note },
        {
          name: 'isAllUserBelongTo',
          value: currentProject.isAllUserBelongTo
        },
        { name: 'projectType', value: currentProject.projectType }
      ]);
    }
  }, []);

  return (
    <main className='general-page-container'>
      <Form
        size="large"
        labelCol={{ span: 3 }}
        labelAlign="left"
        wrapperCol={{ span: 20 }}
        fields={currentField}
        onFieldsChange={handleFieldChange}
        onFinish={handleNext}
        autoComplete="off"
        form={form}
      >
        <Form.Item label="Client">
          <div className="client">
            <Form.Item
              name="customerId"
              rules={[{ required: true, message: 'Please select a client!' }]}
              style={{ width: '90%' }}
            >
              <Select
                disabled={isLoading}
                placeholder="Choose a client..."
              >
                {customerList.map(client => (
                  <Select.Option key={client.id} value={client.id}>
                    {client.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Button
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              type="primary"
              size="large"
              onClick={() => setIsAddNewClient(true)}
            >
              <span className="text-base font-medium">+ New Client</span>
            </Button>
          </div>
        </Form.Item>

        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Please enter project name!' }]}
          label="Project Name"
        >
          <Input placeholder="Project name" />
        </Form.Item>

        <Form.Item
          name="code"
          rules={[{ required: true, message: 'Please enter project code!' }]}
          label="Project Code"
          wrapperCol={{ span: 20 }}
        >
          <Input placeholder="Project code" />
        </Form.Item>

        <Form.Item label="Date">
          <div className="date">
            <Form.Item
              name="timeStart"
              rules={[{ required: true, message: 'Please select start date!' }]}
              valuePropName="value"
            >
              <DatePicker format={dateFormat} placeholder="Start at" />
            </Form.Item>
            <span className="mb-7">to</span>
            <Form.Item
              name="timeEnd"
              rules={[{ required: true, message: 'Please select end date!' }]}
              valuePropName="value"
            >
              <DatePicker format={dateFormat} placeholder="End at" />
            </Form.Item>
          </div>
        </Form.Item>

        <Form.Item name="note" label="Note">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item name="isAllUserBelongTo" label="All User" valuePropName="checked">
          <Checkbox>
            Auto add user as a member of this project when creating new user
          </Checkbox>
        </Form.Item>

        <Form.Item name="projectType" label="Project Type">
          <Radio.Group
            options={radioOptions}
            optionType="button"
            buttonStyle="solid"
            size="large"
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 15 }}>
          <Button name="nextPageBtn" role="nextPageBtn" type="primary" size="large" htmlType="submit">
            Next
          </Button>
        </Form.Item>
      </Form>
      <AddNewClientModal setIsAddNewClient={setIsAddNewClient} isAddNewClient={isAddNewClient} />
    </main>
  );
};
