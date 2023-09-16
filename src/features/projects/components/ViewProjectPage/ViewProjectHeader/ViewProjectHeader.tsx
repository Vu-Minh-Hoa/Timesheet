import { Button, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import './ViewProjectHeader.less';
import { ETimeUnit } from '../../../interface/ProjectTypes';
import {
  formatDateQuery,
  handleDateTitle,
  handleEndDate,
  handleStartDate
} from '../../../../../ults/HandleDateFormatLength';
import { useAppDispatch } from '../../../../../redux/Hook';
import {
  getTimesheetStatisticTasksAction,
  getTimesheetStatisticTeamsAction
} from '../../../action/projectAction';
import { useNavigate, useParams } from 'react-router-dom';
import { resetCurrentProjectData } from '../../../projectReducer/ProjectReducer';
import { CustomTimeModal } from '../ViewProjectCustomeTimeModal/ViewProjectCustomeTimeModal';
import { Moment } from 'moment';

export const ViewProjectHeader = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [timeUnit, setTimeUnit] = useState(ETimeUnit.WEEK);
  const [subtractCount, setSubtractCount] = useState(0);
  const [isModalActive, setIsModalActive] = useState(false);
  const [startDate, setStartDate] = useState(
    handleStartDate(timeUnit, subtractCount)
  );
  const [endDate, setEndDate] = useState(
    handleEndDate(timeUnit, subtractCount)
  );

  const handleCustomDate = (
    customeStartDate: Moment,
    customeEndDate: Moment
  ): void => {
    setStartDate(customeStartDate);
    setEndDate(customeEndDate);
  };

  const handleTimeToggle = (unit: number): void => {
    setSubtractCount(subtractCount + unit);
    setStartDate(handleStartDate(timeUnit, subtractCount + unit));
    setEndDate(handleEndDate(timeUnit, subtractCount + unit));
  };

  const handleTimeFilterChange = (unit: ETimeUnit): void => {
    setTimeUnit(unit);

    if (unit === ETimeUnit.CUSTOM_TIME) setIsModalActive(true);
    else {
      setStartDate(handleStartDate(unit, subtractCount));
      setEndDate(handleEndDate(unit, subtractCount));
    }
  };
  const items = [
    {
      value: ETimeUnit.WEEK,
      label: ETimeUnit.WEEK
    },
    {
      value: ETimeUnit.MONTH,
      label: ETimeUnit.MONTH
    },
    {
      value: ETimeUnit.QUARTER,
      label: ETimeUnit.QUARTER
    },
    {
      value: ETimeUnit.YEAR,
      label: ETimeUnit.YEAR
    },
    {
      value: ETimeUnit.ALL_TIME,
      label: ETimeUnit.ALL_TIME
    },
    {
      value: ETimeUnit.CUSTOM_TIME,
      label: ETimeUnit.CUSTOM_TIME
    }
  ];

  const handleBack = (): void => {
    dispatch(resetCurrentProjectData());
    navigate('/projects');
  };

  const loadViewProjectData = async (): Promise<void> => {
    await dispatch(
      getTimesheetStatisticTasksAction({
        projectId: Number(projectId),
        startDate: formatDateQuery(startDate),
        endDate: formatDateQuery(endDate)
      })
    );
    await dispatch(
      getTimesheetStatisticTeamsAction({
        projectId: Number(projectId),
        startDate: formatDateQuery(startDate),
        endDate: formatDateQuery(endDate)
      })
    );
  };

  useEffect(() => {
    void loadViewProjectData();
  }, [startDate, endDate]);

  return (
    <>
      <div className='view-project-header-container'>
        <Button onClick={() => handleBack()}>Back</Button>
        <div className='time-action-container'>
          <div className='time-length'>
            <div className='time-action-btns'>
              <Button
                onClick={() => handleTimeToggle(1)}
                size='large'
                icon={<LeftOutlined />}
              />
              <Button
                onClick={() => handleTimeToggle(-1)}
                size='large'
                icon={<RightOutlined />}
              />
            </div>
            <span>
              {' '}
              {handleDateTitle(
                startDate,
                endDate,
                timeUnit,
                isModalActive
              )}{' '}
            </span>
          </div>
          <div className='time-filter'>
            <Select
              onSelect={handleTimeFilterChange}
              size='large'
              defaultValue={ETimeUnit.WEEK}
              style={{ width: 150 }}
              options={items}
            />
            <Button size='large' type='primary'>
              {' '}
              Export{' '}
            </Button>
          </div>
        </div>
      </div>
      <CustomTimeModal
        isModalActive={isModalActive}
        setIsModalActive={setIsModalActive}
        handleCustomDate={handleCustomDate}
      />
    </>
  );
};
