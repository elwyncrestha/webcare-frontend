import { Component, OnInit, Input } from '@angular/core';
import { Patient } from 'src/app/@core/models';
import { Action } from 'src/app/@theme/models/action.enum';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EnumUtils, ObjectUtils } from 'src/app/@core/utils';
import { NbDialogConfig, NbDialogRef } from '@nebular/theme';
import { PatientService } from 'src/app/@core/services';
import { ToastService } from 'src/app/@theme/services/toast.service';
import { Alert, AlertType } from 'src/app/@theme/models/alert';
import {
  DialogResponse,
  DialogResponseType,
} from 'src/app/@theme/models/dialog-response';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss'],
})
export class PatientFormComponent implements OnInit {
  @Input() public model: Patient;
  @Input() public action: Action;
  public spinner = false;
  public form: FormGroup;
  public EnumUtils = EnumUtils;
  public Action: Action;

  constructor(
    public nbDialogRef: NbDialogRef<PatientFormComponent>,
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private toastService: ToastService
  ) {}

  get age() {
    return this.form.get('age');
  }
  ngOnInit(): void {
    this.buildForm();
  }

  public submit(): void {
    this.spinner = true;
    this.model = this.form.value as Patient;
    this.patientService.save(this.model).subscribe(
      (response: any) => {
        this.toastService.show(
          new Alert(
            AlertType.SUCCESS,
            `Patient ${this.action.toLowerCase()} successful`
          )
        );
        this.spinner = false;
        this.nbDialogRef.close(
          new DialogResponse(DialogResponseType.SUCCESS, response)
        );
      },
      (error) => {
        console.error(error);
        this.toastService.show(
          new Alert(
            AlertType.ERROR,
            `Failed to ${this.action.toLowerCase()} patient`
          )
        );
        this.spinner = false;
        this.nbDialogRef.close(
          new DialogResponse(DialogResponseType.ERROR, error)
        );
      }
    );
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      id: [ObjectUtils.setUndefinedIfNull(this.model.id)],
      version: [ObjectUtils.setUndefinedIfNull(this.model.version)],
      user: [ObjectUtils.setUndefinedIfNull(this.model.user)],
      age: [
        ObjectUtils.setUndefinedIfNull(this.model.age),
        [Validators.required],
      ],
    });
  }
}
