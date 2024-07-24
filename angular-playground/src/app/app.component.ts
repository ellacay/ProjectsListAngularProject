import { Component } from '@angular/core';
import { HEADERDATA } from './headers.data';
import { HeaderData } from './header';
import { FilterArray } from './filter-array-interface';
import e from 'express';
import { ProjectData } from './data';
import { PROJECTDATA } from './mock.data';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',

  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-playground';
  projectData: ProjectData[] = [];
  headerData: HeaderData[] = [];

  filterResults: ProjectData[] = [];
  queryResults: ProjectData[] = [];
  filterOption: FilterArray[] = [];
  filterOptions: FilterArray[] = [];
  filterArray: ProjectData[] = [];
  column = [];
  isDuplicate: Boolean = false;

  ngOnInit(): void {
    this.projectData = PROJECTDATA;
    this.headerData = HEADERDATA;
  }

  addFilterArray(filter: Array<FilterArray>) {
    this.filterOption = filter;

    if (this.filterResults.length > 0) {
      this.areIdsPresentInArray();
    }

    if (!this.isDuplicate) {

      this.filterOptions.push(...this.filterOption);

      this.functionFilterData(
        this.filterOption[0].Category,
        this.filterOption[0].Item
      );
    }
  }

  areIdsPresentInArray() {
    const Column = this.filterOptions.map(
      (item) => item.Item as keyof ProjectData
    );

    if (Column.includes(this.filterOption[0].Item as keyof ProjectData)) {
      this.isDuplicate = true;


      const updatedItems: FilterArray[] = this.filterOptions.filter(
        (item) =>
          item.Category !== this.filterOption[0].Category &&
          item.Item !== this.filterOption[0].Item
      );

      this.filterOptions = updatedItems;

      for (let i in updatedItems) {
        this.queryResults = this.projectData.filter(
          (item) =>
            item[updatedItems[i].Category as keyof ProjectData] ===
            updatedItems[i].Item
        );

        this.filterResults.splice(0, this.filterResults.length);
        this.filterResults.push(...this.queryResults);
      }

      return true;
    } else {
      this.isDuplicate = false;
      return false;
    }
  }

  functionFilterData(Category: string, Item: string): void {
    if (this.filterResults.length === 0) {
      this.queryResults = this.projectData.filter(
        (item) => item[Category as keyof ProjectData] === Item
      );
      this.filterResults.push(...this.queryResults);
    } else {
      this.queryResults = this.filterResults.filter(
        (item) => item[Category as keyof ProjectData] === Item
      );
      this.filterResults.splice(0, this.filterResults.length);
      this.filterResults.push(...this.queryResults);
    }
  }
}
