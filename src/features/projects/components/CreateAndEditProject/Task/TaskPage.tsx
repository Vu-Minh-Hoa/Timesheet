import { Button } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Spinner } from '../../../../../components/spinner/Spinner';
import { useAppDispatch, useAppSelector } from '../../../../../redux/Hook';
import { getAllTasksAction } from '../../../action/projectAction';
import { filterTaskInCurrentProject, getCurrentPage, setTaskTabData } from '../../../projectReducer/ProjectReducer';
import { SelectedTaskTable } from './SelectedTask/SelectedTask';
import { UnselectedTaskTable } from './UnselectedTask/UnselectedTask';
import './TaskPage.less';

export const TaskPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.projectReducer.isLoading);
  const selectedTaskList = useAppSelector((state) => state.projectReducer.selectedTaskList);
  const currentPage = useAppSelector((state) => state.projectReducer.currentPage);
  const navigate = useNavigate();
  const { projectId } = useParams();
  const loadTaskData = async (): Promise<void> => {
    await dispatch(getAllTasksAction());
    if (projectId != null) {
      dispatch(filterTaskInCurrentProject());
    }
  };

  useEffect(() => {
    void loadTaskData();
  }, []);

  const nextCondition = selectedTaskList.length > 0;

  const handlePrev = (): void => {
    navigate(-1);
    dispatch(getCurrentPage(currentPage - 1));
  };

  const handleNext = (): void => {
    const taskInProject = selectedTaskList.map(task => {
      return {
        billable: task.billable,
        taskId: task.id
      };
    });
    if (nextCondition) {
      dispatch(setTaskTabData(taskInProject));
      if (projectId != null) {
        navigate(`/projects/edit/${projectId}/notification`, { state: projectId });
      } else navigate('/projects/create/notification');
    }
    dispatch(getCurrentPage(currentPage + 1));
  };

  return (
    <main>
      {isLoading && (
        <div className='task-spinner-container'>
          <Spinner />
        </div>
      )}
      {!isLoading && <SelectedTaskTable />}
      {!isLoading && <UnselectedTaskTable />}
      {!isLoading && (
        <div className='task-page-action-btn'>
          <Button shape="round" onClick={handlePrev} size="large">
            Prev
          </Button>
          <Button
            shape="round"
            disabled={!nextCondition}
            onClick={handleNext}
            size="large"
            type="primary"
            role="nextPageBtn"
            name="nextPageBtn"
          >
            Next
          </Button>
        </div>
      )}
    </main>
  );
};
