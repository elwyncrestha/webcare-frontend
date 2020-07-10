import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Gender } from 'src/app/@core/enums';
import { Doctor } from 'src/app/@core/models';
import { Appointment } from 'src/app/@core/models/appointment/appointment.model';
import { Department } from 'src/app/@core/models/department/department.model';
import {
  DepartmentService,
  DoctorService,
  PatientService,
} from 'src/app/@core/services';
import { AppointmentService } from 'src/app/@core/services/appointment/appointment.service';
import { EnumUtils, ObjectUtils } from 'src/app/@core/utils';
import { Action } from 'src/app/@theme/models/action.enum';
import { Alert, AlertType } from 'src/app/@theme/models/alert';
import { ToastService } from 'src/app/@theme/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
})
export class AppointmentComponent implements OnInit {
  public model: Appointment;
  public spinner = false;
  public form: FormGroup;
  public EnumUtils = EnumUtils;
  public Action = Action;
  public genderPairs = EnumUtils.pairs(Gender);
  public departmentList: Department[] = [];
  public doctorList: Doctor[] = [];
  public verified = false;
  public TODAY_DATE = new Date();

  constructor(
    private formBuilder: FormBuilder,
    private appointmentService: AppointmentService,
    private toastService: ToastService,
    private departmentService: DepartmentService,
    private doctorService: DoctorService,
    private patientService: PatientService,
    private router: Router
  ) {}

  get id() {
    return this.form.get('id');
  }

  get name() {
    return this.form.get('name');
  }

  get address() {
    return this.form.get('address');
  }

  get contactNumber() {
    return this.form.get('contactNumber');
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
    this.model.appointmentDate = this.appointmentDate.value;
    this.model.appointmentTime = this.appointmentTime.value;
    this.model.department = this.department.value;
    this.model.doctor = this.doctor.value;
    if (ObjectUtils.isEmpty(this.model.patient)) {
      this.model.patient = {
        age: Number(this.age.value),
        user: {
          name: this.name.value,
          address: this.address.value,
          contactNumber: this.contactNumber.value,
          email: this.email.value,
          gender: this.gender.value,
        },
      };
    }
    this.appointmentService.saveUnauthenticated(this.model).subscribe(
      () => {
        this.toastService.show(
          new Alert(AlertType.SUCCESS, `Appointment created successful`)
        );
        this.spinner = false;
        setTimeout(() => this.router.navigate(['/login']), 500);
      },
      (error) => {
        console.error(error);
        this.toastService.show(
          new Alert(AlertType.ERROR, `Failed to create appointment`)
        );
        this.spinner = false;
      }
    );
  }

  public searchByPatientId() {
    if (ObjectUtils.isEmpty(this.id.value)) {
      this.toastService.show(
        new Alert(AlertType.WARNING, 'Please enter ID first')
      );
      return;
    }
    this.patientService.getByIdUnauthenticated(Number(this.id.value)).subscribe(
      (response: any) => {
        this.model = { patient: response.detail };
        this.buildForm();
        this.verified = true;
      },
      (error) => {
        console.error(error);
        if (error.status === 404) {
          this.toastService.show(
            new Alert(AlertType.INFO, 'No existing patient! Create new one')
          );
          return;
        }
        this.toastService.show(
          new Alert(AlertType.ERROR, 'Sorry encountered problem')
        );
      }
    );
  }

  public appointNewPatient() {
    this.verified = true;
    this.model = new Appointment();
    this.buildForm();
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
      contactNumber: [
        ObjectUtils.setUndefinedIfNull(
          this.model?.patient?.user?.contactNumber
        ),
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
    // disable user fields if existing
    if (!ObjectUtils.isEmpty(this.model?.patient?.id)) {
      this.name.disable();
      this.address.disable();
      this.contactNumber.disable();
      this.email.disable();
      this.gender.disable(); // gender disabled from template as well
      this.age.disable();
    }
    // populate the doctor list when selected department changes
    this.department.valueChanges.subscribe((value: Department) => {
      const filter = {
        'department.id': value?.id?.toString(),
      };
      this.doctor.setValue(undefined);
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
