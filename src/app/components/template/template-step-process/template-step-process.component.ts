import { Component, OnInit, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-template-step-process",
  templateUrl: "./template-step-process.component.html",
  styleUrls: ["./template-step-process.component.css"]
})
export class TemplateStepProcessComponent implements OnInit {
  @Input("templateContainer") templateContainer: FormGroup;
  constructor() {}

  ngOnInit() {}
}
