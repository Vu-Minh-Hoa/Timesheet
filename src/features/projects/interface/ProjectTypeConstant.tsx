import { ECreateProjectType, EMemberLevel, EMemberType, EPositionType } from './ProjectTypes';

export const radioOptions = [
  {
    label: 'Time & Material',
    value: ECreateProjectType.TIME_MATERIAL
  },
  {
    label: 'Fixed Fee',
    value: ECreateProjectType.FIXED_FEE
  },
  {
    label: 'Non-Billable',
    value: ECreateProjectType.NON_BILLABLE
  },
  {
    label: 'ODC',
    value: ECreateProjectType.ODC
  },
  {
    label: 'Product',
    value: ECreateProjectType.PRODUCT
  },
  {
    label: 'Training',
    value: ECreateProjectType.TRAINING
  }
];

export const memberTypes = [
  {
    label: 'Staff',
    value: EMemberType.STAFF
  },
  {
    label: 'Internship',
    value: EMemberType.INTERSHIP
  },
  {
    label: 'Collaborator',
    value: EMemberType.COLLABORATOR
  }
];

export const memberPositions = [
  {
    label: 'Member',
    value: EPositionType.MEMBER
  },
  {
    label: 'Project Manager',
    value: EPositionType.PROJECT_MANAGER
  },
  {
    label: 'Shadow',
    value: EPositionType.SHADOW
  },
  {
    label: 'Deactive',
    value: EPositionType.DEACTIVE
  }
];

export const memberLevels = [
  {
    label: 'Intern 0',
    value: EMemberLevel.INTERN_0
  },
  {
    label: 'Intern 1',
    value: EMemberLevel.INTERN_1
  },
  {
    label: 'Intern 2',
    value: EMemberLevel.INTERN_2
  },
  {
    label: 'Prefresher',
    value: EMemberLevel.PREFRESHER
  },
  {
    label: 'Fresher-',
    value: EMemberLevel.FRESHERMINUS
  },
  {
    label: 'Fresher',
    value: EMemberLevel.FRESHER
  },
  {
    label: 'Fresher+',
    value: EMemberLevel.FRESHERPLUS
  },
  {
    label: 'Junior-',
    value: EMemberLevel.JUNIORMINUS
  },
  {
    label: 'Junior',
    value: EMemberLevel.JUNIOR
  },
  {
    label: 'Junior+',
    value: EMemberLevel.JUNIORPLUS
  },
  {
    label: 'Middle-',
    value: EMemberLevel.MIDDLEMINUS
  },
  {
    label: 'Middle',
    value: EMemberLevel.MIDDLE
  },
  {
    label: 'Middle+',
    value: EMemberLevel.MIDDLEPLUS
  },
  {
    label: 'Senior-',
    value: EMemberLevel.SENIORMINUS
  },
  {
    label: 'Senior',
    value: EMemberLevel.SENIOR
  },
  {
    label: 'Senior+',
    value: EMemberLevel.SENIORPLUS
  }
];
