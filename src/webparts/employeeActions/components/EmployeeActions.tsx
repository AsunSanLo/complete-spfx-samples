import * as React from 'react';
import { IEmployeeActionsProps } from './IEmployeeActionsProps';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists/web";
import "@pnp/sp/items";
import { override } from '@microsoft/decorators';
import { IEmployeeAction } from '../code/model/IEmployeeAction';
import { Separator } from 'office-ui-fabric-react/lib/Separator';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Dropdown, IDropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { DatePicker } from 'office-ui-fabric-react/lib/DatePicker';
import { ActionsList } from './ActionsList/ActionsList';
import { ICategory } from '../code/model/ICategory';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { NewAction } from '../code/model/NewAction';

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
    }
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
      .select("ID, Title, MeetingDate, ActionCategory/ID, ActionCategory/Title").expand("ActionCategory/Id")
      .get<IEmployeeAction[]>().then(data => {
        this.setState({ actions: data });
      });
  }

  public save = () => {
    alert("ACTION TO SAVE: " + JSON.stringify(this._newAction));
    sp.web.lists.getByTitle("EmployeesActions").items.add(this._newAction).then(() => {
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
      <div>
        <ActionsList actions={this.state.actions} />

        <Separator>Añadir acción para el empleado</Separator>
        <div>

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
          <PrimaryButton text="Añadir" onClick={this.save} />
        </div>
      </div>
    );
  }
}
