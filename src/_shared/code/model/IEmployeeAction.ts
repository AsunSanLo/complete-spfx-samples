import { ICategory } from "./ICategory";

export interface IEmployeeAction {
  Title: string;
  ID: number;
  EventDate: string;
  ActionCategory: ICategory;
}
