import { Component, OnInit } from '@angular/core';
import { TemplateService } from 'src/app/services/template.service';

@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.css']
})
export class TemplateListComponent implements OnInit {
  constructor(private templateService: TemplateService) {}

  templates$;

  ngOnInit() {
    this.templates$ = this.templateService.getAll();
  }
}
