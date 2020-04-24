import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'EmployeeActionsWebPartStrings';
import EmployeeActions from './components/EmployeeActions';
import { IEmployeeActionsProps } from './components/IEmployeeActionsProps';
import { setup as pnpSetup } from "@pnp/common";
import { override } from '@microsoft/decorators';
import { MSGraphClientFactory} from "@microsoft/sp-http";

export interface IEmployeeActionsWebPartProps {
  description: string;
}

export default class EmployeeActionsWebPart extends BaseClientSideWebPart <IEmployeeActionsWebPartProps> {


  @override
  public onInit(): Promise<void> {
    return super.onInit().then(_ => {
      pnpSetup({
        spfxContext: this.context
      });
    });
  }

  public render(): void {
    const graphFactory = this.context.serviceScope.consume(MSGraphClientFactory.serviceKey);


    const element: React.ReactElement<IEmployeeActionsProps> = React.createElement(
      EmployeeActions,
      {
        graphFactory: graphFactory
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
