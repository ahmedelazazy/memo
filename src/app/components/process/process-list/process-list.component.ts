import { Component, OnInit } from '@angular/core';
import { TemplateService } from 'src/app/services/template.service';
import { Process } from 'src/app/models/process';
import { ProcessService } from 'src/app/services/process.service';

@Component({
  selector: 'app-process-list',
  templateUrl: './process-list.component.html',
  styleUrls: ['./process-list.component.css']
})
export class ProcessListComponent implements OnInit {

  templates;

  constructor(private templateService: TemplateService, private processService: ProcessService) { }

  ngOnInit() {
    this.templates = this.templateService.getAll();
  }

  startProcess(template) {
    let process = new Process();
    process.template = { ...template };
    process.init();
    this.processService.save(process);
  }

}
