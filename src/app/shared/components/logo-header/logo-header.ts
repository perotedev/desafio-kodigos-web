import { Component } from '@angular/core';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-logo-header',
  imports: [],
  templateUrl: './logo-header.html',
  styleUrl: './logo-header.scss'
})
export class LogoHeader {
  public readonly appName: string = environment.appName;
}
