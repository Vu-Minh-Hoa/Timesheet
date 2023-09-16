import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, Divider, Input, Select, Skeleton, Space } from 'antd';
import React, { useMemo, useState } from 'react';
import { v4 } from 'uuid';
import { useAppSelector } from '../../../../../../redux/Hook';
import { memberTypes } from '../../../../interface/ProjectTypeConstant';
import { MemberList } from '../MemberList/MemberList';

const { Panel } = Collapse;
const { Search } = Input;
const { Option } = Select;

export const UnselectedMembers = (): JSX.Element => {
  const [filteredMemberByBranch, setFilteredMemberByBranch] = useState('all');
  const [filteredMemberByType, setFilteredMemberByType] = useState('all');
  const [filteredMemberBySearch, setFilteredMemberBySearch] = useState('');

  const handleFilteredBranchChange = (value: string): void => {
    setFilteredMemberByBranch(value);
  };

  const handleFilteredTypeChange = (value: string): void => {
    setFilteredMemberByType(value);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFilteredMemberBySearch(e.target.value);
  };

  const isLoading = useAppSelector((state) => state.projectReducer.isLoading);
  const listBranch = useAppSelector((state) => state.projectReducer.listBranch);
  const listUnselectedMember = useAppSelector((state) => state.projectReducer.unselectedMemberList);

  const reusultMemberByBranchMemo = useMemo(() => {
    if (filteredMemberByBranch !== 'all') {
      return listUnselectedMember.filter(
        member => member.branch?.toString() === filteredMemberByBranch
      );
    } else {
      return listUnselectedMember;
    }
  }, [filteredMemberByBranch, listUnselectedMember]);

  const resultMemberByTypeMemo = useMemo(() => {
    if (filteredMemberByType !== 'all') {
      return reusultMemberByBranchMemo.filter(
        member => member.type?.toString() === filteredMemberByType
      );
    } else {
      return reusultMemberByBranchMemo;
    }
  }, [filteredMemberByType, reusultMemberByBranchMemo]);

  const members = resultMemberByTypeMemo.filter(
    member =>
      member.name
        .toLowerCase()
        .includes(filteredMemberBySearch.toLowerCase()) ||
      member.emailAddress
        .toLowerCase()
        .includes(filteredMemberBySearch.toLowerCase())
  );

  return (
    <Collapse
      defaultActiveKey={['1']}
      style={{ float: 'right', width: '44%' }}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive === true ? 90 : 0} />
      )}
      className="site-collapse-custom-collapse"
    >
      <Panel
        header="Select team member"
        key="1"
        className="site-collapse-custom-panel"
      >
        <Space align="center">
          <Select
            showSearch
            placeholder="Branch"
            style={{ width: '100px' }}
            dropdownMatchSelectWidth={false}
            disabled={isLoading}
            value={filteredMemberByBranch}
            onChange={handleFilteredBranchChange}
            optionFilterProp="label"
            filterOption={(input, option) =>
              (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())
            }
            options={[{ value: 'all', label: 'All' }].concat(
              listBranch.map(branch => ({
                value: branch.id.toString(),
                label: branch.displayName
              }))
            )}
          ></Select>
          <Select
            placeholder="Type"
            style={{ width: '100px' }}
            dropdownMatchSelectWidth={false}
            disabled={isLoading}
            value={filteredMemberByType}
            onChange={handleFilteredTypeChange}
          >
            <Option key={v4()} value="all">
              All
            </Option>
            {memberTypes.map(type => (
              <Option key={v4()} value={type.value.toString()}>
                {type.label}
              </Option>
            ))}
          </Select>
          <Search
            placeholder="Search by name, email"
            loading={isLoading}
            disabled={isLoading}
            onChange={e => handleSearch(e)}
            value={filteredMemberBySearch}
            allowClear
          ></Search>
        </Space>
        <Divider />
        <Skeleton
          paragraph={{ rows: 5 }}
          avatar
          loading={isLoading}
          active
        />
        {!isLoading && (
          <MemberList members={members} isSelected={false} />
        )}
      </Panel>
    </Collapse>
  );
};
