import { Button, Checkbox, Input } from 'antd';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../redux/Hook';
import { addProjectAction } from '../../../action/projectAction';
import { getCurrentPage, resetCurrentProjectData, setNotificationTabData } from '../../../projectReducer/ProjectReducer';
import './NotificationPage.less';

export const NotificationPage = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { projectId } = useParams();
  const currentProject = useAppSelector((state) => state.projectReducer.currentProject);
  const currentPage = useAppSelector((state) => state.projectReducer.currentPage);
  const [komuId, setKomuId] = useState(projectId != null ? currentProject.komuChannelId : '');
  const [isChecked, setIsChecked] = useState(projectId != null ? currentProject.isNotifyToKomu : false);
  const isLoading = useAppSelector((state) => state.projectReducer.isLoading);

  const handleToggleCheckbox = (): void => {
    setIsChecked(!(isChecked ?? false));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setKomuId(e.target.value);
  };

  const handlePrev = (): void => {
    navigate(-1);
    dispatch(getCurrentPage(currentPage - 1));
  };

  const handleSave = async (): Promise<void> => {
    dispatch(setNotificationTabData({
      isNotifyToKomu: isChecked,
      komuChannelId: komuId
    }));
    if (projectId != null) await dispatch(addProjectAction(currentProject));
    else await dispatch(addProjectAction(currentProject));
    dispatch(resetCurrentProjectData());
    dispatch(getCurrentPage(0));
    navigate('/projects');
  };

  return (
    <main className='notification-container'>
      <Checkbox
        checked={isChecked}
        onChange={handleToggleCheckbox}
      >
        <span className="font-medium">Send notification to Komu</span>
      </Checkbox>
      <Input
        disabled={!(isChecked ?? false)}
        value={komuId}
        placeholder='Komu channel ID'
        size='large'
        onChange={handleInputChange}
      />
      <div className='notification-action-btn'>
        <Button disabled={isLoading} shape="round" onClick={handlePrev} size="large">
          Prev
        </Button>
        <Button
          role='savePageBtn'
          type='primary'
          loading={isLoading}
          shape="round"
          onClick={() => { void handleSave(); }}
          size="large"
        >
          Save
        </Button>
      </div>
    </main>
  );
};
