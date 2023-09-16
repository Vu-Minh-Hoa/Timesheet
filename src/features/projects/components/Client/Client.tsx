import React from 'react';
import { List } from 'antd';
import { ClientProjectList } from '../ClientProjectList/ClientProjectList';
import './Client.less';

interface IClient {
  clientName: string
}

export const Client = (props: IClient): JSX.Element => {
  const { clientName } = props;
  return (
    <div>
      <List header={
        <div className='client-name'>
          {clientName}
        </div>
      }>
        <ClientProjectList clientName={clientName} />
      </List>
    </div>
  );
};
