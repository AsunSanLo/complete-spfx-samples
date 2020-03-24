import * as React from 'react';
import { IEmployeeAction } from '../../code/model/IEmployeeAction';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import styles from './ActionsList.module.scss';
import { Separator } from 'office-ui-fabric-react/lib/Separator';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
export interface IActionsListProps {
  actions: Array<IEmployeeAction>;
}

export const ActionsList = (props: IActionsListProps) => {

    return (<div>
      <Separator>Acciones para el empleado</Separator>
      <table className={styles.actionsTable}>
      {props.actions.map(action => <tr>
        <td>
          <Icon iconName="Tag" />
          {action.ActionCategory.Title}
          </td>
        <td>{action.Title}</td>
        <td>
          {action.EventDate && <>
            <Icon iconName="Calendar" />
            {new Date(action.EventDate).toLocaleDateString()}
          </>}
        </td>
      </tr>)}
    </table>
    </div>);
};
