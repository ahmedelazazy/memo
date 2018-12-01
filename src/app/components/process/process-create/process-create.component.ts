import { Component, OnInit, Input, ViewContainerRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TemplateService } from "src/app/services/template.service";
import { Process } from "src/app/models/process";
import { ProcessService } from "src/app/services/process.service";
import { AuthService } from "src/app/services/auth.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
  selector: "app-process-create",
  templateUrl: "./process-create.component.html",
  styleUrls: ["./process-create.component.css"]
})
export class ProcessCreateComponent implements OnInit {
  template$;
  showError = false;
  isEdit = false;
  process = new Process();
  id;
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private templateService: TemplateService,
    private processService: ProcessService,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) {
    this.route.params.subscribe(params => {
      this.id = params["id"];
      this.template$ = this.templateService.get(this.id);
    });
  }

  ngOnInit() {}

  addProcess(f, templateId) {
    this.submitted = true;
    if (f.invalid) {
      this.toastrService.error("Some fields have invalid values");
      return;
    }

    this.process.userId = this.authService.user.id;
    this.process.templateId = templateId;
    this.processService.add(this.process).subscribe(
      () => {
        this.toastrService.success("Data saved successfully");
        this.router.navigate(["/process"]);
      },
      error => {
        this.toastrService.error("Error wile saving");
        console.error(error);
      }
    );
  }
}
