import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseListViewCommandSet,
  Command,
  IListViewCommandSetListViewUpdatedParameters,
  IListViewCommandSetExecuteEventParameters
} from '@microsoft/sp-listview-extensibility';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'ShowActionsCommandSetStrings';
import { IEmployeeActionsProps } from '../../webparts/employeeActions/components/IEmployeeActionsProps';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { setup as pnpSetup } from "@pnp/common";
import {ActionsModal} from './components/ActionsModal';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IShowActionsCommandSetProperties {
  // This is an example; replace with your own properties
  sampleTextOne: string;
  sampleTextTwo: string;
}

const LOG_SOURCE: string = 'ShowActionsCommandSet';

export default class ShowActionsCommandSet extends BaseListViewCommandSet<IShowActionsCommandSetProperties> {

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, 'Initialized ShowActionsCommandSet');
    return super.onInit().then(_ => {
      pnpSetup({
        spfxContext: this.context
      });
    });
  }

  @override
  public onListViewUpdated(event: IListViewCommandSetListViewUpdatedParameters): void {
    const showActionsCommand: Command = this.tryGetCommand('ShowCategoryActions');
    if (showActionsCommand) {
      showActionsCommand.visible = event.selectedRows.length === 1;
    }
  }

  @override
  public onExecute(event: IListViewCommandSetExecuteEventParameters): void {

    if (event.itemId === "ShowCategoryActions") {
      const selectedRow = event.selectedRows[0];
      const categoryId = selectedRow.getValueByName("ID");
      this.showActionsModal(categoryId);
    }
  }

  public showActionsModal = (categoryId: number)  => {

    const commandDomElement = document.body.appendChild(document.createElement("div"));
    const element: React.ReactElement<IEmployeeActionsProps> = React.createElement(
      ActionsModal,
      {
        categoryId: categoryId
      }
    );

    ReactDom.render(element, commandDomElement);
  }
}
