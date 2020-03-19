import * as React from 'react';
import styles from './ActionsMessage.module.scss';
import { Button, PrimaryButton } from 'office-ui-fabric-react/lib/Button';

export class ActionsMessage extends React.Component<{}, {}> {

  public render() {
    return  (<div className={styles.ActionsMessage}>
      <span>Take a look at our new employee actions: </span>
      <PrimaryButton style={{backgroundColor: "red"}} href="https://sanlotest.sharepoint.com/sites/talleres-team/lists/EmployeesActions" >View actions</PrimaryButton>
    </div>);
  }
}
