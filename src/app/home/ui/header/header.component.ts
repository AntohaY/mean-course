import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar'
import { RouterModule } from '@angular/router';
@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.scss'],
    standalone: true,
    imports: [MatToolbarModule, RouterModule, MatButtonModule]
})

export class HeaderComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}