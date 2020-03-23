import { ICategory } from "./ICategory";

export interface IEmployeeAction {
  Title: string;
  ID: number;
  EventDate: Date;
  ActionCategory: ICategory;
}
