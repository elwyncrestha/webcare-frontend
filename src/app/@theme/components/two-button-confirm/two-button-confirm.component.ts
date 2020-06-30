import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { DialogResponse, DialogResponseType } from '../../models/dialog-response';

@Component({
  selector: 'app-two-button-confirm',
  templateUrl: './two-button-confirm.component.html',
  styleUrls: ['./two-button-confirm.component.scss']
})
export class TwoButtonConfirmComponent implements OnInit {
  @Input() public headerText: string;
  @Input() public btnOneText: string;
  @Input() public btnTwoText: string;

  constructor(
    private nbDialogRef: NbDialogRef<TwoButtonConfirmComponent>,
  ) { }

  ngOnInit(): void {
  }

  public btnAction(isBtnOne: boolean) {
    this.nbDialogRef.close(new DialogResponse(isBtnOne ? DialogResponseType.SUCCESS : DialogResponseType.DISMISS, null));
  }

}
