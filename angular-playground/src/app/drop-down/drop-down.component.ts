import { Component, Input } from '@angular/core';
import { ProjectData } from '../data';
import { HeaderData } from '../header';
import { FilterArray } from '../filter-array-interface';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrl: './drop-down.component.css',
})
export class DropDownComponent {
  @Input() project: ProjectData[] = [];
  @Input() headers: HeaderData[] = [];
  @Input() selectedFilters: FilterArray[] = [];
  @Output() FilterArrayParams: EventEmitter<Array<FilterArray>> =
    new EventEmitter();

  filterArray: FilterArray[] = [];

  filterResults: ProjectData[] = [];
  selectedCategory: string = '';

  checkboxStates: { [category: string]: { [id: number]: boolean } } = {};

  filteredArray: FilterArray[] = [];

  toggleList(category: string) {
    this.selectedCategory = category;

    if (!this.checkboxStates[category]) {
      this.checkboxStates[category] = {};
    }
  }

  addFilter(id: number, category: string, item: string, event: Event) {
    if (event.target instanceof HTMLInputElement) {
      const checked = event.target.checked;
     this.checkboxStates[category][id] = checked;

      for (const cat in this.checkboxStates) {
        for (const itemId in this.checkboxStates[cat]) {
          this.filteredArray.push({
            ID: +itemId,
            Category: cat,
            Item: item,
            Checked: this.checkboxStates[cat][+itemId],
          });
        }
      }

   
      this.filterArray.splice(0, this.filterArray.length);
      this.filterArray.push({
        ID: id,
        Category: category,
        Item: item,
        Checked: checked,
      });
      this.FilterArrayParams.emit(this.filterArray);
    }

  
  }
  transform(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  transforms(value: string): string | null {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
