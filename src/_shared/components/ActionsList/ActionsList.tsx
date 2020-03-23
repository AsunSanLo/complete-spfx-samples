import * as React from 'react';
import { IEmployeeAction } from '../../code/model/IEmployeeAction';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

export interface IActionsListProps {
  actions: Array<IEmployeeAction>
}

export const ActionsList = (props: IActionsListProps) => {

    return (<table>
      {props.actions.map(action => <tr>
        <td>{action.ActionCategory.Title}</td>
        <td>{action.Title}</td>
        <td>
          {action.EventDate && <>
            <Icon iconName="Calendar" />
            {action.EventDate}
          </>}
        </td>
      </tr>)}
    </table>);
}
