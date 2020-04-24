import * as React from 'react';
import { IEmployeeAction } from '../../code/model/IEmployeeAction';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import styles from './ActionsList.module.scss';
import { Separator } from 'office-ui-fabric-react/lib/Separator';

import { MSGraphClientFactory} from "@microsoft/sp-http";
import { Dialog } from '@microsoft/sp-dialog';
export interface IActionsListProps {
  actions: Array<IEmployeeAction>;
  graphApiFactory?: MSGraphClientFactory;
}

export const ActionsList = (props: IActionsListProps) => {



    const onCalendarClick = async (action: IEmployeeAction) => {
      const client = await props.graphApiFactory.getClient();
      await client.api("/me/calendar/events").post({
        "subject": action.Title,
        "body": {
          "contentType": "HTML",
          "content": "Acción para el empleado"
        },
        "start": {
            "dateTime": action.EventDate,
            "timeZone": "Europe/Berlin"
        },
        "end": {
            "dateTime": action.EventDate,
            "timeZone": "Europe/Berlin"
        }
      });
      Dialog.alert("Evento creado!");
    }


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
            <Icon iconName="Calendar" onClick={() => onCalendarClick(action)} />
            {new Date(action.EventDate).toLocaleDateString()}
          </>}
        </td>
      </tr>)}
    </table>
    </div>);
};
