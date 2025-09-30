import { Component } from '@angular/core';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  imports: [Button, RouterLink],
  templateUrl: './page-not-found.html',
  styleUrl: './page-not-found.scss'
})
export class PageNotFound {

}
