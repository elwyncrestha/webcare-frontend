import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../base/services';
import { Inventory } from '../../models/inventory/inventory.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService extends BaseService<Inventory>{

  static API = 'v1/inventory';

  constructor(readonly http: HttpClient) { super(http); }

  protected getApi(): string {
    return InventoryService.API;
  }
}
