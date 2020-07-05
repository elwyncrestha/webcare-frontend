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
import {
  DialogResponse,
  DialogResponseType,
} from 'src/app/@theme/models/dialog-response';
import { Department } from 'src/app/@core/models/department/department.model';
import { Doctor } from 'src/app/@core/models';
import { DepartmentService } from 'src/app/@core/services/department/department.service';
import { DoctorService } from 'src/app/@core/services';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
})
export class AppointmentComponent implements OnInit {
  public model: Appointment;
  public action: Action;
  public spinner = false;
  public form: FormGroup;
  public EnumUtils = EnumUtils;
  public Action = Action;
  public genderPairs = EnumUtils.pairs(Gender);
  public departmentList: Department[] = [];
  public doctorList: Doctor[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private appointmentService: AppointmentService,
    private toastService: ToastService,
    private departmentService: DepartmentService,
    private doctorService: DoctorService
  ) {}

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

  get appointmentTime() {
    return this.form.get('appointmentTime');
  }

  ngOnInit(): void {
    this.buildForm();
    this.departmentService.getAllUnauthenticated().subscribe(
      (response: any) => {
        this.departmentList = response.detail;
      },
      (error) => {
        console.error(error);
        this.toastService.show(
          new Alert(AlertType.ERROR, 'Failed to load departments')
        );
      }
    );
  }

  public submit(): void {
    this.spinner = true;
    this.model = this.form.value as Appointment;
    this.appointmentService.save(this.model).subscribe(
      (response: any) => {
        this.toastService.show(
          new Alert(
            AlertType.SUCCESS,
            `Appointment ${this.action.toLowerCase()} successful`
          )
        );
        this.spinner = false;
      },
      (error) => {
        console.error(error);
        this.toastService.show(
          new Alert(
            AlertType.ERROR,
            `Failed to ${this.action.toLowerCase()} appointment`
          )
        );
        this.spinner = false;
      }
    );
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      id: [ObjectUtils.setUndefinedIfNull(this.model?.id)],
      version: [ObjectUtils.setUndefinedIfNull(this.model?.version)],
      name: [
        ObjectUtils.setUndefinedIfNull(this.model?.patient?.user?.name),
        [Validators.required],
      ],
      address: [
        ObjectUtils.setUndefinedIfNull(this.model?.patient?.user?.address),
        [Validators.required],
      ],
      email: [
        ObjectUtils.setUndefinedIfNull(this.model?.patient?.user?.email),
        [Validators.required],
      ],
      gender: [
        ObjectUtils.setUndefinedIfNull(this.model?.patient?.user?.gender),
        [Validators.required],
      ],
      age: [
        ObjectUtils.setUndefinedIfNull(this.model?.patient?.age),
        [Validators.required],
      ],
      department: [
        ObjectUtils.setUndefinedIfNull(this.model?.department),
        [Validators.required],
      ],
      doctor: [
        ObjectUtils.setUndefinedIfNull(this.model?.doctor),
        [Validators.required],
      ],
      appointmentDate: [
        ObjectUtils.setUndefinedIfNull(this.model?.appointmentDate),
        [Validators.required],
      ],
      appointmentTime: [
        ObjectUtils.setUndefinedIfNull(this.model?.appointmentTime),
        [Validators.required],
      ],
    });
    // populate the doctor list when selected department changes
    this.department.valueChanges.subscribe((value: Department) => {
      const filter = {
        'department.id': value?.id?.toString(),
      };
      this.doctorService
        .getAllWithSearchObjectUnauthenticated(filter)
        .subscribe(
          (response: any) => {
            this.doctorList = response.detail;
          },
          (error) => {
            console.error(error);
            this.toastService.show(
              new Alert(AlertType.ERROR, 'Failed to load doctors')
            );
          }
        );
    });
  }
}
