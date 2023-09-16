import { CaretRightOutlined } from '@ant-design/icons';
import { Checkbox, Collapse, Divider, Input, Skeleton } from 'antd';
import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../../../../redux/Hook';
import { EPositionType } from '../../../../interface/ProjectTypes';
import { MemberList } from '../MemberList/MemberList';
import './SelectedTeam';

const { Panel } = Collapse;
const { Search } = Input;

export const SelectedMembers = (): JSX.Element => {
  const { projectId } = useParams();
  const selectedMemberList = useAppSelector((state) => state.projectReducer.selectedMemberList);
  const isLoading = useAppSelector((state) => state.projectReducer.isLoading);
  const [filterChecked, setFilterChecked] = useState(false);
  const [query, setQuery] = useState('');

  const handleShowChange = (): void => {
    setFilterChecked(!filterChecked);
  };

  const listFilteredSelectedMember = useMemo(() => {
    if (filterChecked) {
      return selectedMemberList.filter(
        member => member.positionType === EPositionType.DEACTIVE
      );
    } else {
      return selectedMemberList.filter(
        member => member.positionType !== EPositionType.DEACTIVE
      );
    }
  }, [filterChecked, selectedMemberList]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };

  return (
    <Collapse
      defaultActiveKey={['1']}
      style={{ float: 'left', width: '55%' }}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive === true ? 90 : 0} />
      )}
      className="site-collapse-custom-collapse"
    >
      <Panel header="Team" key="1" className="site-collapse-custom-panel">
        <div className="member-filter">
          <Checkbox checked={filterChecked} onChange={handleShowChange}>
            Show deactive member
          </Checkbox>
          <Search
            placeholder="Search by name, email"
            style={{ width: 300 }}
            onChange={e => handleSearch(e)}
            value={query}
            allowClear
          />
        </div>
        <Divider />
        <Skeleton
          paragraph={{ rows: 6 }}
          avatar
          loading={isLoading && projectId != null}
          active
        />
        {!isLoading && (
          <MemberList
            members={listFilteredSelectedMember.filter(
              member =>
                member.name.toLowerCase().includes(query.toLowerCase()) ||
                member.emailAddress.toLowerCase().includes(query.toLowerCase())
            )}
            isSelected={true}
          />
        )}
      </Panel>
    </Collapse>
  );
};
