import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { AppointmentReportService } from 'src/app/@core/services';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/@theme/services/toast.service';
import { Alert, AlertType } from 'src/app/@theme/models/alert';
import { AppointmentReport, Appointment } from 'src/app/@core/models';
import { Location } from '@angular/common';
import { LocalStorageUtils, EnumUtils, ObjectUtils } from 'src/app/@core/utils';
import { UserType } from 'src/app/@core/enums';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AppointmentReportDumps } from 'src/app/@core/constants';
import { ScrollNavService } from 'src/app/@theme/services/scroll-nav.service';

@Component({
  selector: 'app-appointment-report',
  templateUrl: './appointment-report.component.html',
  styleUrls: ['./appointment-report.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppointmentReportComponent implements OnInit {
  @ViewChild('topDiv') private topDiv: ElementRef;

  public spinner = false;
  public appointmentReport: AppointmentReport;
  public isDoctor = false;
  public cardFlipped = false;
  public editor = ClassicEditor;
  public form: FormGroup;
  private appointmentId: number;

  constructor(
    private appointmentReportService: AppointmentReportService,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private location: Location,
    private formBuilder: FormBuilder,
    private scrollNavService: ScrollNavService
  ) {}

  ngOnInit(): void {
    this.isDoctor =
      LocalStorageUtils.getStorage().userType ===
      EnumUtils.getEnum(UserType, UserType.DOCTOR);
    this.appointmentId = this.activatedRoute.snapshot.params.id;
    this.buildForm();
    this.fetchAppointmentData();
  }

  public goBack(): void {
    this.location.back();
  }

  public submit() {
    this.spinner = true;
    this.appointmentReportService.save(this.form.value).subscribe(
      () => {
        this.spinner = false;
        this.toastService.show(
          new Alert(AlertType.SUCCESS, 'Successfully saved the report')
        );
        this.fetchAppointmentData();
        this.flipCard(false);
      },
      (error) => {
        console.error(error);
        this.toastService.show(
          new Alert(AlertType.ERROR, 'Failed to save the report')
        );
        this.spinner = false;
      }
    );
  }

  public flipCard(flip: boolean) {
    this.cardFlipped = flip;
    this.scrollNavService.scrollNavigateTo(this.topDiv);
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      id: [ObjectUtils.setUndefinedIfNull(this.appointmentReport?.id)],
      version: [
        ObjectUtils.setUndefinedIfNull(this.appointmentReport?.version),
      ],
      appointment: [
        ObjectUtils.setInputOrElseNext(this.appointmentReport?.appointment, {
          id: this.appointmentId,
        } as Appointment),
      ],
      data: [
        ObjectUtils.setInputOrElseNext(
          this.appointmentReport?.data,
          AppointmentReportDumps.report1
        ),
      ],
    });
  }

  private fetchAppointmentData(): void {
    this.spinner = true;
    const filter = { 'appointment.id': this.appointmentId };
    this.appointmentReportService.getOneWithSearchObject(filter).subscribe(
      (response: any) => {
        this.appointmentReport = response.detail;
        this.buildForm();
        this.spinner = false;
      },
      (error) => {
        if (error.status === 404) {
          this.toastService.show(
            new Alert(AlertType.INFO, 'Report has not been created yet')
          );
        } else {
          console.error(error);
          this.toastService.show(
            new Alert(AlertType.ERROR, 'Error loading report')
          );
        }
        this.spinner = false;
      }
    );
  }
}
