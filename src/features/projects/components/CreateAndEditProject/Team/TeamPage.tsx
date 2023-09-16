import { Button } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../redux/Hook';
import { getAllBranchAction, getUserNotPaggingAction } from '../../../action/projectAction';
import { EPositionType } from '../../../interface/ProjectTypes';
import { getCurrentPage, setSelectedMemberPositionType, setTeamTabData } from '../../../projectReducer/ProjectReducer';
import { SelectedMembers } from './SelectedTeam/SelectedTeam';
import { UnselectedMembers } from './UnselectedTeam/UnselectedTeam';
import './TeamPage.less';

export const TeamPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.projectReducer.currentPage);
  const isLoading = useAppSelector((state) => state.projectReducer.isLoading);
  const selectedMemberList = useAppSelector((state) => state.projectReducer.selectedMemberList);
  const navigate = useNavigate();
  const { projectId } = useParams();
  const loadTeamData = async (): Promise<void> => {
    await dispatch(getAllBranchAction());
    await dispatch(getUserNotPaggingAction());
    dispatch(setSelectedMemberPositionType());
  };

  useEffect(() => {
    void loadTeamData();
  }, []);

  const nextCondition =
    selectedMemberList.length > 0 &&
    selectedMemberList.some(
      member => member.positionType === EPositionType.PROJECT_MANAGER
    );

  const handlePrev = (): void => {
    navigate(-1);
    dispatch(getCurrentPage(currentPage - 1));
  };

  const handleNext = (): void => {
    const memberInProject = selectedMemberList.map(member => {
      return {
        type: member.positionType,
        userId: member.id
      };
    });
    if (nextCondition) {
      dispatch(setTeamTabData(memberInProject));
      if (projectId != null) {
        navigate(`/projects/edit/${projectId}/task`, { state: projectId });
      } else navigate('/projects/create/task');
      dispatch(getCurrentPage(currentPage + 1));
    }
  };

  return (
    <main className='team-member-container'>
      <div className="member-container">
        <SelectedMembers />
        <UnselectedMembers />
      </div>
      {!isLoading && (
        <div className="button-action-container">
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
