import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer, PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'ActionsNotificationApplicationCustomizerStrings';
import {ActionsMessage} from './ActionsMessage/ActionsMessage';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
// import { setup as pnpSetup } from "@pnp/common";

const LOG_SOURCE: string = 'ActionsNotificationApplicationCustomizer';

export interface IActionsNotificationApplicationCustomizerProperties {
  testMessage: string;
}

export default class ActionsNotificationApplicationCustomizer
  extends BaseApplicationCustomizer<IActionsNotificationApplicationCustomizerProperties> {

  @override
  public onInit(): Promise<void> {
    this.showActionsNotification();
    return super.onInit();

  }

  private showActionsNotification = () => {
    const topPlaceholder = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top);

    const elem = React.createElement(ActionsMessage);
    ReactDOM.render(elem, topPlaceholder.domElement);
  }
}
