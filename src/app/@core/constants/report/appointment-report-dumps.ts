import { Appointment } from '../../models';

export class AppointmentReportDumps {
  public static createReport1(appointment: Appointment) {
    return `
    <h2>Patient Medical Report</h2><p><strong>This form is to be completed by the respective
  appointment's doctor.</strong></p><h4>Private &amp; Confidential</h4>
<figure class="table">
  <table>
    <thead>
    <tr>
      <th>Name</th>
      <th>Age</th>
      <th>Gender</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>${appointment?.patient?.user?.name}</td>
      <td>${appointment?.patient?.age}</td>
      <td>${appointment?.patient?.user?.gender}</td>
    </tr>
    </tbody>
  </table>
</figure>
<figure class="table">
  <table>
    <thead>
    <tr>
      <th>When was s/he examined?</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>&nbsp;</td>
    </tr>
    </tbody>
  </table>
</figure>
<figure class="table">
  <table>
    <thead>
    <tr>
      <th>Reason for medical diagnosis (if any)</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>&nbsp;</td>
    </tr>
    </tbody>
  </table>
</figure>
<figure class="table">
  <table>
    <thead>
    <tr>
      <th>Past medical history (if known)</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>&nbsp;</td>
    </tr>
    </tbody>
  </table>
</figure>
<figure class="table">
  <table>
    <thead>
    <tr>
      <th>Current clinical condition</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>&nbsp;</td>
    </tr>
    </tbody>
  </table>
</figure>
<figure class="table">
  <table>
    <thead>
    <tr>
      <th>Relevant laboratory results, x-rays, etc</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>&nbsp;</td>
    </tr>
    </tbody>
  </table>
</figure>
<figure class="table">
  <table>
    <thead>
    <tr>
      <th>Current medication</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>&nbsp;</td>
    </tr>
    </tbody>
  </table>
</figure>
<figure class="table">
  <table>
    <thead>
    <tr>
      <th>Arrangements to follow up</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>&nbsp;</td>
    </tr>
    </tbody>
  </table>
</figure>
<figure class="table">
  <table>
    <tbody>
    <tr>
      <th>Doctor Name</th>
      <td>${appointment?.doctor?.user?.name}</td>
    </tr>
    <tr>
      <th>Doctor Email</th>
      <td>${appointment?.doctor?.user?.email}</td>
    </tr>
    <tr>
      <th>Doctor Contact Number</th>
      <td>${appointment?.doctor?.user?.contactNumber}</td>
    </tr>
    <tr>
      <th>Date</th>
      <td>&nbsp;</td>
    </tr>
    </tbody>
  </table>
</figure>
    `;
  }
}
