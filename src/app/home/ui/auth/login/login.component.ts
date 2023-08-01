import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss'],
    standalone: true,
    imports: [MatButtonModule, MatCardModule, MatInputModule, MatProgressSpinnerModule, FormsModule]
})

export class LoginComponent implements OnInit {
    isLoading = false;

    constructor() { }

    ngOnInit() { }

    onLogin(form: NgForm) {
        
    }
}