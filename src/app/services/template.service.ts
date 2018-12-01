import { Injectable } from "@angular/core";
import { Template } from "../models/template";
import { Subject, from } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { map, tap } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";
import * as _ from "lodash";
import { FormHelper } from "../components/template/form-helper";
import { FormGroup, FormArray, FormControl } from "@angular/forms";
import { formArrayNameProvider } from "@angular/forms/src/directives/reactive_directives/form_group_name";
import { FieldVisibility } from "../models/enums";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root"
})
export class TemplateService {
  containerForm: FormGroup;

  tableName = "Templates";
  templates: Template[] = [];
  usersChange: Subject<Template[]> = new Subject();
  serverUrl = environment["api"] + "templates/";

  users;
  templateForm$: BehaviorSubject<any>;
  // containerForm = new FormHelper().getContainer();

  constructor(private http: HttpClient, private userService: UserService) {
    this.userService.getAll().subscribe(data => (this.users = data));
  }

  createNewTemplate() {
    this.containerForm = new FormHelper().getContainer();
    this.templateForm$ = new BehaviorSubject(null);

    this.templateForm$.subscribe(data => {
      if (data && this.containerForm && this.containerForm.get("steps")) {
        const steps: FormArray = this.containerForm.get("steps") as FormArray;
        let flatData = this.flattenData(data);
        for (let i = 0; i < steps.controls.length; i++) {
          const step = steps.controls[i];
          this.syncStep(step, flatData);
        }
      }
    });

    return this.containerForm;
  }

  getEmptyStep() {
    let step = new FormHelper().getEmptyStep();
    let data = this.templateForm$.value;
    let flatData = this.flattenData(data);
    return this.syncStep(step, flatData);
  }

  flattenData(data) {
    let flatData = [];
    if (data && data.sections) {
      for (let i = 0; i < data.sections.length; i++) {
        const section = data.sections[i];
        if (section) {
          for (let j = 0; j < section.fields.length; j++) {
            const field = section.fields[j];
            if (field) {
              flatData.push({
                controlUiId: field.controlUiId,
                visibility: FieldVisibility.Editable
              });
            }
          }
        }
      }
    }
    return flatData;
  }

  syncStep(step, flatData) {
    let dataCopy = _.cloneDeep(flatData);

    if (step) {
      if (step.get("fieldsVisibility") && step.get("fieldsVisibility").value) {
        for (let i = 0; i < dataCopy.length; i++) {
          let newField = dataCopy[i];
          let existingField = step
            .get("fieldsVisibility")
            .value.find(f => f.controlUiId == newField.controlUiId);
          if (existingField) {
            newField.visibility = existingField.visibility;
          }
        }
      }
      step.patchValue({
        fieldsVisibility: dataCopy
      });
    }
    return step;
  }

  getAll() {
    return this.http.get<Template[]>(this.serverUrl);
  }

  get(id: number) {
    let url = `${this.serverUrl}/${id}`;
    return this.http.get(url);
  }

  add(obj: Template) {
    let toBeSaved = this.reformatProperties(obj);
    this.containerForm = null;
    this.templateForm$ = null;
    return this.http.post(this.serverUrl, toBeSaved);
  }

  reformatProperties(templateObj) {
    let newTemplate = _.cloneDeep(templateObj);

    for (let index = 0; index < newTemplate.steps.length; index++) {
      newTemplate.steps[index].order = index;
    }

    if (newTemplate.dataForm) {
      newTemplate.sections = newTemplate.dataForm.sections;
      delete newTemplate.dataForm;
    }
    if (newTemplate.sections) {
      for (let i = 0; i < newTemplate.sections.length; i++) {
        const section = newTemplate.sections[i];
        section.controls = section.fields;
        delete section.fields;
      }
    }

    var stepControlRelatiobObj = [];

    for (let i = 0; i < newTemplate.steps.length; i++) {
      const step = newTemplate.steps[i];
      stepControlRelatiobObj.push({
        stepUiId: step.stepUiId,
        controls: step.fieldsVisibility
      });
      delete step.fieldsVisibility;
    }

    return {
      template: newTemplate,
      controlConfig: stepControlRelatiobObj
    };
  }

  getUserName(userId) {
    if (userId) {
      return this.users.find(u => u.id == userId).name;
    }
  }
}
