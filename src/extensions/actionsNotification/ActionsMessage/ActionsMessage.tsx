import * as React from 'react';
import styles from './ActionsMessage.module.scss';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
export interface IActionsMessageProps {
  siteUrl: string;
}
export class ActionsMessage extends React.Component<IActionsMessageProps, {}> {

  public render() {
    return  (<div className={styles.ActionsMessage}>
      <span>Échale un vistazo a nuestras acciones para el empleado: </span>
      <PrimaryButton style={{backgroundColor: "red"}} href={`${this.props.siteUrl}/lists/EmployeesActions`}>Ver acciones</PrimaryButton>
    </div>);
  }
}
