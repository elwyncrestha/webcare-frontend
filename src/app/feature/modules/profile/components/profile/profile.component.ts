import { Component, OnInit } from '@angular/core';
import {
  UserService,
  DoctorService,
  PatientService,
} from 'src/app/@core/services';
import { User, Doctor, Patient } from 'src/app/@core/models';
import { LocalStorageUtils, EnumUtils } from 'src/app/@core/utils';
import { UserType, Gender } from 'src/app/@core/enums';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public user: User;
  public doctor: Doctor;
  public patient: Patient;
  public UserType = UserType;
  public EnumUtils = EnumUtils;
  public Gender = Gender;

  constructor(
    private userService: UserService,
    private doctorService: DoctorService,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    const filter = {
      'user.id': LocalStorageUtils.getStorage().userId,
    };
    switch (LocalStorageUtils.getStorage().userType) {
      case EnumUtils.getEnum(UserType, UserType.DOCTOR):
        this.doctorService
          .getOneWithSearchObject(filter)
          .subscribe((response: any) => {
            this.doctor = response.detail;
            this.user = this.doctor.user;
          });
        break;
      case EnumUtils.getEnum(UserType, UserType.PATIENT):
        this.patientService
          .getOneWithSearchObject(filter)
          .subscribe((response: any) => {
            this.patient = response.detail;
            this.user = this.patient.user;
          });
        break;
      default:
        this.userService.getAuthenticated().subscribe((response: any) => {
          this.user = response.detail;
        });
    }
  }
}
