/* eslint-disable indent */
import { Avatar, List, Select, Tag } from 'antd';
import VirtualList from 'rc-virtual-list';
import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { v4 } from 'uuid';
import { useAppDispatch } from '../../../../../../redux/Hook';
import { memberPositions, memberTypes, memberLevels } from '../../../../interface/ProjectTypeConstant';
import { EMemberLevel, EMemberType, EPositionType, IUserNotPagging } from '../../../../interface/ProjectTypes';
import { selectMember, setMemberPosition, unselectMember } from '../../../../projectReducer/ProjectReducer';
import './MemberList.less';

interface Props {
  members: IUserNotPagging[]
  isSelected: boolean
}

const { Item } = List;
const { Option } = Select;
const ContainerHeight = 400;

export const MemberList = (props: Props): JSX.Element => {
  const { members, isSelected } = props;
  const dispatch = useAppDispatch();

  const handleSelectMember = (member: IUserNotPagging): void => {
    dispatch(selectMember(member));
  };

  const handleUnselectedMember = (member: IUserNotPagging): void => {
    dispatch(unselectMember(member));
  };

  const renderMemberType = (memberType: EMemberType): string => {
    const type = memberTypes.find(type => type.value === memberType);
    return type === undefined ? '' : type.label;
  };

  const renderMemberLevel = (memberLevel: EMemberLevel): string => {
    const level = memberLevels.find(level => level.value === memberLevel);
    return level === undefined ? '' : level.label;
  };

  const renderMemberTypeTagColor = (memberType: EMemberType): string => {
    switch (memberType) {
      case EMemberType.INTERSHIP:
        return 'internship';
      case EMemberType.COLLABORATOR:
        return 'collab';
      default:
        return 'default';
    }
  };
  const renderMemberLevelTagColor = (
    memberLevel: EMemberLevel
  ): string => {
    switch (memberLevel) {
      case EMemberLevel.INTERN_0:
        return 'intern-0';
      case EMemberLevel.INTERN_1:
        return 'intern-1';
      case EMemberLevel.INTERN_2:
        return 'intern-2';
      case EMemberLevel.PREFRESHER:
        return 'pre-fresher';
      case EMemberLevel.FRESHERMINUS:
        return 'fresher-minus';
      case EMemberLevel.FRESHER:
        return 'fresher';
      case EMemberLevel.FRESHERPLUS:
        return 'fresher-plus';
      case EMemberLevel.MIDDLEMINUS:
        return 'middle-minus';
      case EMemberLevel.MIDDLE:
        return 'middle';
      case EMemberLevel.MIDDLEPLUS:
        return 'middle-plus';
      default:
        return 'default';
    }
  };

  const handleMemberPositionChange = (
    value: EPositionType,
    member: IUserNotPagging
  ): void => {
    dispatch(
      setMemberPosition({
        id: member.id,
        positionType: value
      })
    );
  };

  return (
    <List size="large">
      <VirtualList
        data={members}
        height={ContainerHeight}
        itemHeight={47}
        itemKey="id"
      >
        {member => (
          <Item key={member.id}>
            {!isSelected && (
              <button
                onClick={() => handleSelectMember(member)}
                className="unselected-btn"
              >
                {<FaChevronLeft size={20} />}
              </button>
            )}
            <Item.Meta
              avatar={
                <Avatar size="large" icon={<UserOutlined />} alt="Member" />
              }
              title={
                <div >
                  <span>{member.name}</span>
                  <div >
                    {member.type !== null
                      ? (<Tag className={renderMemberTypeTagColor(member.type)}>{renderMemberType(member.type)}</Tag>)
                      : null}
                    {member.level !== null
                      ? (<Tag className={renderMemberLevelTagColor(member.level)}>{renderMemberLevel(member.level)}</Tag>)
                      : null}
                  </div>
                </div>
              }
              description={member.emailAddress}
            />
            {isSelected && (
              <div className='selected-member-action'>
                <Select
                  style={{ width: '100px' }}
                  dropdownMatchSelectWidth={false}
                  value={member.positionType}
                  onChange={value => handleMemberPositionChange(value, member)}
                >
                  {memberPositions.map(pos => (
                    <Option key={v4()} value={pos.value}>
                      {pos.label}
                    </Option>
                  ))}
                </Select>
                <button
                  onClick={() => handleUnselectedMember(member)}
                >
                  {<FaChevronRight size={20} />}
                </button>
              </div>
            )}
          </Item>
        )}
      </VirtualList>
    </List>
  );
};
