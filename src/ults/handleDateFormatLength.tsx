import moment, { Moment } from 'moment';

import { ETimeUnit } from '../features/projects/interface/ProjectTypes';

export const handleStartDate = (timeUnit: ETimeUnit, substractCount: number): string | Moment => {
  switch (timeUnit) {
    case ETimeUnit.WEEK:
      return moment().subtract(substractCount, 'weeks').startOf('isoWeek');

    case ETimeUnit.MONTH:
      return moment().subtract(substractCount, 'months').startOf('month');

    case ETimeUnit.QUARTER:
      return moment().subtract(substractCount, 'Q').startOf('quarter');

    case ETimeUnit.YEAR:
      return moment().subtract(substractCount, 'years').startOf('years');

    default:
      return '';
  }
};

export const handleEndDate = (timeUnit: ETimeUnit, substractCount: number): string | Moment => {
  switch (timeUnit) {
    case ETimeUnit.WEEK:
      return moment().subtract(substractCount, 'weeks').endOf('isoWeek');

    case ETimeUnit.MONTH:
      return moment().subtract(substractCount, 'months').endOf('month');

    case ETimeUnit.QUARTER:
      return moment().subtract(substractCount, 'Q').endOf('quarter');

    case ETimeUnit.YEAR:
      return moment().subtract(substractCount, 'years').endOf('years');

    default:
      return '';
  }
};

export const handleDateTitle = (
  startDate: string | Moment,
  endDate: string | Moment,
  timeUnit: ETimeUnit,
  isCustomTime: boolean
): string => {
  switch (timeUnit) {
    case ETimeUnit.WEEK:
      return (
        ETimeUnit.WEEK +
        ' : ' +
        moment(startDate).format('D') +
        ' - ' +
        moment(endDate).format('D MMM YYYY')
      );

    case ETimeUnit.MONTH:
      return (
        ETimeUnit.MONTH +
        ' : ' +
        moment(startDate).format('D') +
        ' - ' +
        moment(endDate).format('D MMM YYYY')
      );

    case ETimeUnit.QUARTER:
      return (
        ETimeUnit.QUARTER +
        ' : ' +
        moment(startDate).format('D MMM') +
        ' - ' +
        moment(endDate).format('D MMM YYYY')
      );

    case ETimeUnit.YEAR:
      return (
        ETimeUnit.YEAR +
        ' : ' +
        moment(startDate).format('D MMM') +
        ' - ' +
        moment(endDate).format('D MMM YYYY')
      );

    case ETimeUnit.ALL_TIME:
      return (
        ETimeUnit.ALL_TIME
      );

    case ETimeUnit.CUSTOM_TIME:
      if (isCustomTime) return ETimeUnit.CUSTOM_TIME;
      return (
        moment(startDate).format('D MMM YYYY') +
        ' - ' +
        moment(endDate).format('D MMM YYYY')
      );

    default:
      return '';
  }
};

export const formatDateQuery = (time: Moment | string): string => {
  if (time === '') return time;
  return moment(time).format('YYYY-MM-DD');
};
