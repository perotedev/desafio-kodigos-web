import {Component, inject} from '@angular/core';
import {FileUpload, FileUploadEvent} from 'primeng/fileupload';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-service-order-files',
  imports: [
    FileUpload
  ],
  templateUrl: './service-order-files.html',
  styleUrl: './service-order-files.scss'
})
export class ServiceOrderFiles {
  private readonly _messageService: MessageService = inject(MessageService);
  public uploadedFiles: any[] = [];

  public onUpload(event:FileUploadEvent) {
    for(let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this._messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }
}
