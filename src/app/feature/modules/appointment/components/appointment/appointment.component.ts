import { Component, OnInit } from '@angular/core';
import { EnumUtils, ObjectUtils } from 'src/app/@core/utils';
import { Gender } from 'src/app/@core/enums';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppointmentService } from 'src/app/@core/services/appointment/appointment.service';
import { ToastService } from 'src/app/@theme/services/toast.service';
import { Action } from 'src/app/@theme/models/action.enum';
import { Appointment } from 'src/app/@core/models/appointment/appointment.model';
import { Alert, AlertType } from 'src/app/@theme/models/alert';
import { NbDialogRef } from '@nebular/theme';
import { DialogResponse, DialogResponseType } from 'src/app/@theme/models/dialog-response';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
  public model: Appointment
  public action: Action
  public spinner = false;
  public form: FormGroup;
  public EnumUtils = EnumUtils;
  public Action = Action;
  public genderPairs = EnumUtils.pairs(Gender);

  constructor(
    public nbDialogRef: NbDialogRef<AppointmentComponent>,
    private formBuilder: FormBuilder,
    private appointmentService: AppointmentService,
    private toastService: ToastService,
  ) { }


  get name() {
    return this.form.get('name');
  }

  get address() {
    return this.form.get('address');
  }

  get email() {
    return this.form.get('email');
  }

  get gender() {
    return this.form.get('gender');
  }

  get age() {
    return this.form.get('age');
  }

  get department() {
    return this.form.get('department');
  }

  get doctor() {
    return this.form.get('doctor');
  }

  get appointmentDate() {
    return this.form.get('appointmentDate');
  }

  get preferredTime() {
    return this.form.get('preferredTime');
  }


  ngOnInit(): void {
    this.buildForm();
  }
  
  public submit(): void {
    this.spinner = true;
    this.model = this.form.value as Appointment;
    this.appointmentService.save(this.model).subscribe((response: any) => {
      this.toastService.show(new Alert(AlertType.SUCCESS, `Appointment ${this.action.toLowerCase()} successful`));
      this.spinner = false;
      this.nbDialogRef.close(new DialogResponse(DialogResponseType.SUCCESS, response));
    }, error => {
      console.error(error);
      this.toastService.show(new Alert(AlertType.ERROR, `Failed to ${this.action.toLowerCase()} appointment`));
      this.spinner = false;
      this.nbDialogRef.close(new DialogResponse(DialogResponseType.ERROR, error));
    });
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      id: [ObjectUtils.setUndefinedIfNull(this.model.id)],
      version: [ObjectUtils.setUndefinedIfNull(this.model.version)],
      name: [
        ObjectUtils.setUndefinedIfNull(this.model.name),
        [Validators.required]
      ],
      address: [
        ObjectUtils.setUndefinedIfNull(this.model.address),
        [Validators.required]
      ],
      email: [
        ObjectUtils.setUndefinedIfNull(this.model.email),
        [Validators.required]
      ],
      gender: [
        ObjectUtils.setUndefinedIfNull(this.model.gender),
        [Validators.required]
      ],
      age: [
        ObjectUtils.setUndefinedIfNull(this.model.age),
        [Validators.required]
      ],
      department: [
        ObjectUtils.setUndefinedIfNull(this.model.department),
        [Validators.required]
      ],
      doctor: [
        ObjectUtils.setUndefinedIfNull(this.model.doctor),
        [Validators.required]
      ],
      appointmentDate: [
        ObjectUtils.setUndefinedIfNull(this.model.appointmentDate),
        [Validators.required]
      ],
      preferredTime: [
        ObjectUtils.setUndefinedIfNull(this.model.preferredTime),
        [Validators.required]
      ]
    });
  }

}
