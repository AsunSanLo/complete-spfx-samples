import { Log } from '@microsoft/sp-core-library';
import { override } from '@microsoft/decorators';
import * as React from 'react';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import styles from './ActionsProgress.module.scss';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists/web";
import "@pnp/sp/items";


export interface IActionsProgressProps {
  categoryId: number;
  goal: number;
}

export interface IActionsProgressState {
  actionsCount: number;
  loading:boolean;
}


export default class ActionsProgress extends React.Component<IActionsProgressProps, IActionsProgressState> {

  constructor(props) {
    super(props);

    this.state = {
      actionsCount: 0,
      loading: true
    };
  }

  @override
  public componentDidMount(): void {
    sp.web.lists.getByTitle("EmployeesActions").items.filter(`ActionCategory/ID eq ${this.props.categoryId}`).get().then(data => {
      this.setState({ actionsCount: data.length, loading: false});
    });
  }

  @override
  public render(): React.ReactElement<{}> {
    return (
      <div>
        { this.state.loading && <Spinner /> }
        { !this.state.loading && <ProgressIndicator description={`${this.state.actionsCount} acciones realizadas`} percentComplete={this.state.actionsCount / this.props.goal} /> }
      </div>
    );
  }
}
