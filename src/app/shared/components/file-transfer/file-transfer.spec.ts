import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileTransfer } from './file-transfer';

describe('FileTransfer', () => {
  let component: FileTransfer;
  let fixture: ComponentFixture<FileTransfer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileTransfer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileTransfer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
