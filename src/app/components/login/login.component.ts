import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppUtils, LocalStorage, LocalStorageUtils } from 'src/app/@core/utils';
import { UserService } from 'src/app/@core/services';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/@core/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  spinner = false;
  message: string;

  constructor(
    private router: Router,
    private http: HttpClient,
    private userService: UserService,
    private formBuilder: FormBuilder) {
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: [undefined, [Validators.required]],
      password: [undefined, [Validators.required]],
    });
  }

  submit(): void {
    this.spinner = true;
    const securityUrl = `${environment.URL}/oauth/token`;
    const body = `grant_type=password&username=${this.username.value}&password=${this.password.value}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic d2ViX2NhcmU6Y2FyZSN3ZWI=',
    });
    this.http.post(securityUrl, body, { headers }).subscribe((data: any) => {
      const storage = LocalStorageUtils.getStorage();
      storage.at = data.access_token;
      storage.rt = data.refresh_token;
      storage.ty = data.token_type;
      storage.et = data.expires_in;
      LocalStorageUtils.setStorage(storage);

      this.userService.getAuthenticated().subscribe((response: any) => {
        const user: User = response.detail;
        const userStorage: LocalStorage = LocalStorageUtils.getStorage();
        userStorage.userId = (user.id).toString();
        userStorage.username = user.username;
        userStorage.userFullName = user.name;
        LocalStorageUtils.setStorage(userStorage);

        this.router.navigate(['/feature/dashboard']);
      });
    },
      error => {
        console.error(error);
        this.spinner = false;
        this.message = 'INVALID USERNAME OR PASSWORD';
      },
    );
  }

}
