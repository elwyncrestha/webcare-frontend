import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {
  UserService,
  DoctorService,
  PatientService,
  AppointmentService,
} from 'src/app/@core/services';
import { User, Doctor, Patient, Appointment } from 'src/app/@core/models';
import { LocalStorageUtils, EnumUtils, ObjectUtils } from 'src/app/@core/utils';
import { UserType, Gender, AppointmentStatus } from 'src/app/@core/enums';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/@theme/services/toast.service';
import { Alert, AlertType } from 'src/app/@theme/models/alert';
import { ScrollNavService } from 'src/app/@theme/services/scroll-nav.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @ViewChild('patientAppointmentDiv')
  private patientAppointmentDiv: ElementRef;

  public user: User;
  public doctor: Doctor;
  public patient: Patient;
  public UserType = UserType;
  public EnumUtils = EnumUtils;
  public Gender = Gender;
  public patientAppointments: Appointment[];
  public AppointmentStatus = AppointmentStatus;
  public queueScrollToAppointment = false;

  constructor(
    private userService: UserService,
    private doctorService: DoctorService,
    private patientService: PatientService,
    private router: Router,
    private toastService: ToastService,
    private appointmentService: AppointmentService,
    private scrollNavService: ScrollNavService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const filter = {
      'user.id': LocalStorageUtils.getStorage().userId,
    };
    switch (LocalStorageUtils.getStorage().userType) {
      case EnumUtils.getEnum(UserType, UserType.DOCTOR):
        this.doctorService.getOneWithSearchObject(filter).subscribe(
          (response: any) => {
            this.doctor = response.detail;
            this.user = this.doctor.user;
          },
          (error) => {
            console.error(error);
            this.toastService.show(
              new Alert(AlertType.ERROR, 'Failed to fetch doctor details')
            );
          }
        );
        break;
      case EnumUtils.getEnum(UserType, UserType.PATIENT):
        this.patientService.getOneWithSearchObject(filter).subscribe(
          (response: any) => {
            this.patient = response.detail;
            this.user = this.patient.user;
            this.fetchPatientAppointment(this.patient.id);
            // scroll to patient appointment report if there is scroll parameter
            const scrollToReport = this.activatedRoute.snapshot.queryParams
              .scrollToReport;
            if (scrollToReport === 'true') {
              this.scrollToPatientAppointmentReport(this);
            }
          },
          (error) => {
            console.error(error);
            this.toastService.show(
              new Alert(AlertType.ERROR, 'Failed to fetch patient details')
            );
          }
        );
        break;
      default:
        this.userService.getAuthenticated().subscribe(
          (response: any) => {
            this.user = response.detail;
          },
          (error) => {
            console.error(error);
            this.toastService.show(
              new Alert(AlertType.ERROR, 'Failed to fetch user details')
            );
          }
        );
    }
  }

  private scrollToPatientAppointmentReport(component: ProfileComponent): void {
    if (
      ObjectUtils.isEmpty(component.patientAppointmentDiv) &&
      !component.queueScrollToAppointment
    ) {
      component.queueScrollToAppointment = true;
      setTimeout(
        () => component.scrollToPatientAppointmentReport(component),
        500
      );
      return;
    }
    component.scrollNavService.scrollNavigateTo(
      component.patientAppointmentDiv
    );
    component.queueScrollToAppointment = false;
  }

  public report(appointment: Appointment) {
    this.router.navigate([`/feature/report/appointment/${appointment.id}`]);
  }

  private fetchPatientAppointment(patientId: number): void {
    const filter = { 'patient.id': patientId.toString() };
    this.appointmentService.getAllWithSearchObject(filter).subscribe(
      (response: any) => {
        this.patientAppointments = response.detail;
      },
      (error) => {
        console.error(error);
        this.toastService.show(
          new Alert(AlertType.ERROR, 'Failed to fetch appointments')
        );
      }
    );
  }
}
