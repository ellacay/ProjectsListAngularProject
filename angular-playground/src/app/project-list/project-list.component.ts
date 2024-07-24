import { Component, Input } from '@angular/core';
import { PROJECTDATA } from '../mock.data';
import { ProjectData } from '../data';
import { filter } from 'rxjs';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css',
})
export class ProjectListComponent {
  @Input() project: ProjectData[] = [];
  @Input() filtered: ProjectData[] = [];
  @Output() newAlert = new EventEmitter<string>();

  addNewAlert(value: string) {
    this.newAlert.emit(value);
  }

  projectData: ProjectData[] = [];

  getProjects(): any[] {
    return this.filtered.length === 0 ? this.project : this.filtered;
  }
}
