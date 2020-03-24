import * as React from 'react';
import { IEmployeeActionsProps } from './IEmployeeActionsProps';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists/web";
import "@pnp/sp/items";
import { override } from '@microsoft/decorators';
import { IEmployeeAction } from '../../../_shared/code/model/IEmployeeAction';
import { Separator } from 'office-ui-fabric-react/lib/Separator';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { DatePicker } from 'office-ui-fabric-react/lib/DatePicker';
import { ActionsList } from '../../../_shared/components/ActionsList/ActionsList';
import { ICategory } from '../../../_shared/code/model/ICategory';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { NewAction } from '../../../_shared/code/model/NewAction';
import styles from './EmployeeActions.module.scss';

export interface IEmployeeActionsState {
  actions: Array<IEmployeeAction>;
  categories: Array<ICategory>;
}

export default class EmployeeActions extends React.Component<IEmployeeActionsProps, IEmployeeActionsState> {

  private _newAction: NewAction = new NewAction();

  public constructor(props) {
    super(props);
    this.state = {
      actions: [],
      categories: [],
    };
  }

  @override
  public componentDidMount() {

    sp.web.lists.getByTitle("EmployeesCategories").items.getAll().then(data => {
      this.setState({ categories: data });
    });
    this.loadActions();

  }

  public loadActions = () => {
    sp.web.lists.getByTitle("EmployeesActions")
      .items
      .select("ID, Title, EventDate, ActionCategory/ID, ActionCategory/Title")
      .expand("ActionCategory/Id")
      .get<IEmployeeAction[]>().then(data => {
        this.setState({ actions: data });
      });
  }

  public save = () => {
    sp.web.lists.getByTitle("EmployeesActions")
    .items
    .add(this._newAction)
    .then(() => {
      this.loadActions();
    });
  }

  public onCategoryChange = (event, option: IDropdownOption) => {
    this._newAction.ActionCategoryId = option.key.valueOf() as number;
  }
  public onTitleChange = (event, value: string) => {
    this._newAction.Title = value;
  }

  public onDateChange = (date: Date) => {
    this._newAction.EventDate = date;
  }

  public render(): React.ReactElement<IEmployeeActionsProps> {
    return (
      <div className={styles.employeeActions}>
        <ActionsList actions={this.state.actions} />
        <br/><br/>
        <Separator>Añadir acción para el empleado</Separator>
        <div className={styles.actionForm}>

          <Dropdown
            label="Categoría"
            onChange={this.onCategoryChange}
            options={this.state.categories.map(category => {
              return {
                key: category.ID,
                text: category.Title
              } as IDropdownOption;
            })}
          />
          <TextField label="Descripción" onChange={this.onTitleChange} />
          <DatePicker
            placeholder="Seleccionar una fecha..."
            label="Día del evento"
            onSelectDate={this.onDateChange}
          />
          <br/>
          <PrimaryButton text="Añadir" onClick={this.save} />
        </div>
      </div>
    );
  }
}
