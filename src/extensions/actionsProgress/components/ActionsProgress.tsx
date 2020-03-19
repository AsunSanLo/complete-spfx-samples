import { Log } from '@microsoft/sp-core-library';
import { override } from '@microsoft/decorators';
import * as React from 'react';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
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
  actions: Array<any>;
  showActions: boolean;
}

const LOG_SOURCE: string = 'ActionsProgress';

export default class ActionsProgress extends React.Component<IActionsProgressProps, IActionsProgressState> {


  constructor(props) {
    super(props);

    this.state = {
      actions: [],
      showActions: false
    }
  }

  @override
  public componentDidMount(): void {
    sp.web.lists.getByTitle("EmployeesActions").items.filter(`ActionCategory/ID eq ${this.props.categoryId}`).get().then(data => {
      this.setState({ actions: data});
    })
  }


  public showActions = () => {
    this.setState({ showActions: true });
  }
  public hideActions = () => {
    this.setState({ showActions: false });
  }


  @override
  public render(): React.ReactElement<{}> {
    return (
      <div onClick={this.showActions} >
        <ProgressIndicator description={`${this.state.actions.length} acciones realizadas`} percentComplete={this.state.actions.length / this.props.goal} />
        <Modal
          isOpen={this.state.showActions}
          onDismiss={this.hideActions}
          isBlocking={false}
          className={styles.ActionsList}
        >
          <h1>Acciones realizadas</h1>
          <h2>Conjunto de acciones realizadas para los empleados:</h2>
          <div>
            {this.state.actions.map(action => <div className={styles.Action}>{action.Title}</div>)}
          </div>
        </Modal>
      </div>

    );
  }
}
