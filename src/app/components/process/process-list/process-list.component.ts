import { Component, OnInit } from "@angular/core";
import { TemplateService } from "src/app/services/template.service";
import { Process } from "src/app/models/process";
import { ProcessService } from "src/app/services/process.service";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-process-list",
  templateUrl: "./process-list.component.html",
  styleUrls: ["./process-list.component.css"]
})
export class ProcessListComponent implements OnInit {
  templates$;
  selectedTemplate;

  constructor(
    private templateService: TemplateService,
    private processService: ProcessService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.templates$ = this.templateService.getAll();
  }

  startProcess(template) {
    this.selectedTemplate = template;
  }

  onProcessUpdated(data) {}
}
