import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

import { AlertService, AuthenticationService } from '../../_services/index';



@Component({
    moduleId: module.id,
    selector: 'app-login-p',
    templateUrl: 'login-p.component.html',
    styleUrls: ['login-p.component.css']
})

export class LoginPComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'home';
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);

                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
