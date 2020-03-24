import * as React from 'react';
import { IEmployeeAction } from '../../../_shared/code/model/IEmployeeAction';
import Modal from 'office-ui-fabric-react/lib/Modal';
import { ActionsList } from '../../../_shared/components/ActionsList/ActionsList';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists/web";
import "@pnp/sp/items";
import { override } from '@microsoft/decorators';


export interface IActionsModalProps {
  categoryId: number;
}

export interface IActionsModalState {
  actions: Array<IEmployeeAction>;
  showModal: boolean;
}

export class ActionsModal extends React.Component<IActionsModalProps, IActionsModalState> {


  public constructor(props) {
    super(props);
    this.state = {
      actions: [],
      showModal: true
    };
  }

  @override
  public componentDidMount(): void {
    sp.web.lists.getByTitle("EmployeesActions").items
      .select("ID, Title, EventDate, ActionCategory/ID, ActionCategory/Title").expand("ActionCategory/Id")
      .filter(`ActionCategory/ID eq ${this.props.categoryId}`).get().then(data => {
        this.setState({ actions: data });
      });
  }


  public render() {
    return <Modal
      isOpen={this.state.showModal}
      onDismiss={() => this.setState({ showModal: false })}
    >
      <div style={{ margin: 24 }}>
        <ActionsList actions={this.state.actions} />
      </div>
    </Modal>;
  }
}
