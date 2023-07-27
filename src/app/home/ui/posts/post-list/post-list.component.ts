import { Component, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
    selector: 'app-post-list',
    templateUrl: 'post-list.component.html',
    styleUrls: ['post-list.component.scss'],
    standalone: true,
    imports: [MatExpansionModule]
})

export class PostListComponent implements OnInit {
    posts = [
        {title: 'First Post', content: 'Content first post'},
        {title: 'Second Post', content: 'Content second post'},
        {title: 'Third Post', content: 'Content third post'}
    ];
    constructor() { }

    ngOnInit() { }
}