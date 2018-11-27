import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from '../../app.component';
import { NgModule } from '@angular/core';
import { EmailService } from 'src/app/services/email.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-email-composer',
  templateUrl: './email-composer.component.html',
  styleUrls: ['./email-composer.component.scss']
})

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class EmailComposerComponent implements OnInit {
  formCheckbox: FormGroup;
  form: FormGroup;
  defaultSetting: boolean;
  showLogoPanelOnOver = false;
  showEditHeadingPanel = false;
  loading: boolean; 
  posts: any[];
  vendor: any;
  content: any;
  vendor_id: any;
  section_type: any;
  email_type: any;
  uploadData: any;
  contentLogo: any;
  showFieldPanel: boolean;
  showEditFooterPanel: boolean;
  editorContent: boolean;
  selectedFile: File;
  token: any;
  fields: any;
  updated: any;
  mailLogo: any;
  mailBodySection: any;
  mailBodyContent: any;
  mailFooterSection: any;
  footerBodyContent: any;
  mailLogoSection: any;
  vendorSetting: any;
  vendorSettingData: any;
  logoUrl: string;

  viewMode = '';

  settingPage = {
    pageSetting: false,
    headerSetting: false,
    bodySetting: false,
    footerSetting: false,
    logoUpdate: false,
    pageSettingSection: true,
  };

  constructor(private fb: FormBuilder, private services: EmailService) {
    this.vendor_id = 3;
  }

  submit() {
    const selectedOrderIds = this.formCheckbox.value.fields; 
    this.loading = true ;  
    this.updated = {
      first_name : selectedOrderIds[0].length < 0 ? this.vendorSettingData.first_name : selectedOrderIds[0],
      last_name : selectedOrderIds[1],
      email : selectedOrderIds[2],
      bvn : selectedOrderIds[3],
      address : selectedOrderIds[4],
      phone : selectedOrderIds[5],
      account_number : selectedOrderIds[6]
 } 

    const saveUpdated = JSON.stringify(this.updated);
    this.createForm();

    
    this.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb21wYW55RW1haWwiOiJ0b3BlYXBwc0BnbWFpbC5jb20iLCJjb21wYW55cGhvbmUiOiIwOTA2NzU0NzIzMiIsImNvbXBhbnlOYW1lIjoiS1lDIEFGUklDQSIsImlzX3N1cGVyX2FkbWluIjoxLCJpZCI6MjMyLCJzdGF0dXMiOnRydWUsInN1Y2Nlc3MiOiJDcmVhdGVkIHN1Y2Nlc3NmdWwifQ.JhPRD0aqoxkZ6UEyqfQZNQugMnboPxCuFJ4wQGLgA6k';
    
    const uploadData = new FormData();
    uploadData.append('vendor_id', this.vendor_id);
    uploadData.append('setting_data', saveUpdated);
    uploadData.append('token', this.token);

    this.services.addSetting(uploadData)
      .subscribe(onUpdateBodyContent => {
        this.loading = false;
        console.log(onUpdateBodyContent);
        Swal(
          'Good job!',
          'Updated',
          'success'
        )
      }); 
    
  }

  insertTextAtCursor(text) {
    const doc = document as any;
    var sel, range;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            range.insertNode( document.createTextNode(text) );
        }
    } else if (doc.selection && doc.selection.createRange) {
      doc.selection.createRange().text = text;
    }
  }

  @ViewChild('fileInput') fileInput: ElementRef;

  createForm() {
    this.form = this.fb.group({
      avatar: [null , Validators.required]
    });
  }



  updateBodyContentForm = new FormGroup({
    bodyContent: new  FormControl('', [
      Validators.required    
    ]),
  });

  updateFooterContentForm = new FormGroup({
    footerContent: new  FormControl('', [
      Validators.required
    ]),
  });

  updateUserFieldContentForm = new FormGroup({
    firstName: new  FormControl(''),
    lastName: new  FormControl(''),
    phoneNumber: new  FormControl(''),
    email: new  FormControl(''),
    address: new  FormControl(''),
    loanAmount: new  FormControl(''),
    dateDue: new  FormControl(''),
    bvn: new  FormControl(),
    accountNumber: new  FormControl(''),
    accountName: new  FormControl(''),
    bankName: new  FormControl(''),
  });

  onUpdateBodyContent(file){
    this.loading = true;
    this.email_type = 3;
    this.section_type = 3;
    this.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb21wYW55RW1haWwiOiJ0b3BlYXBwc0BnbWFpbC5jb20iLCJjb21wYW55cGhvbmUiOiIwOTA2NzU0NzIzMiIsImNvbXBhbnlOYW1lIjoiS1lDIEFGUklDQSIsImlzX3N1cGVyX2FkbWluIjoxLCJpZCI6MjMyLCJzdGF0dXMiOnRydWUsInN1Y2Nlc3MiOiJDcmVhdGVkIHN1Y2Nlc3NmdWwifQ.JhPRD0aqoxkZ6UEyqfQZNQugMnboPxCuFJ4wQGLgA6k';

    const uploadData = new FormData();
    uploadData.append('content', file);
    uploadData.append('vendor_id', this.vendor_id);
    uploadData.append('email_type', this.email_type);
    uploadData.append('section_type', this.section_type);
    uploadData.append('token', this.token);

    this.services.addContent(uploadData)
    .subscribe(onUpdateBodyContent => {
      this.loading = false;
      Swal({
        position: 'top-end',
        type: 'success',
        title: onUpdateBodyContent.message,
        showConfirmButton: false,
        timer: 1500
      })

    });
  }

  onUpdateFooterContent(file){
    this.loading = true;
    this.email_type = 3;
    this.section_type = 4;
    this.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb21wYW55RW1haWwiOiJ0b3BlYXBwc0BnbWFpbC5jb20iLCJjb21wYW55cGhvbmUiOiIwOTA2NzU0NzIzMiIsImNvbXBhbnlOYW1lIjoiS1lDIEFGUklDQSIsImlzX3N1cGVyX2FkbWluIjoxLCJpZCI6MjMyLCJzdGF0dXMiOnRydWUsInN1Y2Nlc3MiOiJDcmVhdGVkIHN1Y2Nlc3NmdWwifQ.JhPRD0aqoxkZ6UEyqfQZNQugMnboPxCuFJ4wQGLgA6k';

    const uploadData = new FormData();
    uploadData.append('content', file);
    uploadData.append('vendor_id', this.vendor_id);
    uploadData.append('email_type', this.email_type);
    uploadData.append('section_type', this.section_type);
    uploadData.append('token', this.token);

    this.services.addContent(uploadData)
    .subscribe(onUpdateBodyContent => {
      this.loading = false;
      console.log(onUpdateBodyContent);
      Swal({
        position: 'top-end',
        type: 'success',
        title: onUpdateBodyContent.message,
        showConfirmButton: false,
        timer: 1500
      })

    });
  }
   

  ngOnInit() {

    this.createForm();
    this.email_type = 3;
    this.mailBodySection = 3;
    this.mailLogoSection = 2;
    this.mailFooterSection = 4;
    this.defaultSetting = true;
    this.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb21wYW55RW1haWwiOiJ0b3BlYXBwc0BnbWFpbC5jb20iLCJjb21wYW55cGhvbmUiOiIwOTA2NzU0NzIzMiIsImNvbXBhbnlOYW1lIjoiS1lDIEFGUklDQSIsImlzX3N1cGVyX2FkbWluIjoxLCJpZCI6MjMyLCJzdGF0dXMiOnRydWUsInN1Y2Nlc3MiOiJDcmVhdGVkIHN1Y2Nlc3NmdWwifQ.JhPRD0aqoxkZ6UEyqfQZNQugMnboPxCuFJ4wQGLgA6k';
    
    const uploadData = new FormData();
    uploadData.append('vendor_id', this.vendor_id);
    uploadData.append('email_type', this.email_type);
    uploadData.append('token', this.token);

    this.services.getVendorInformation(uploadData)
      .subscribe(onGetUser => {
        console.log(onGetUser);
    }); 


    // Get mail body content

    const getBodyContent = new FormData();
    getBodyContent.append('vendor_id', this.vendor_id);
    getBodyContent.append('email_type', this.email_type);
    getBodyContent.append('section_type', this.mailBodySection);
    getBodyContent.append('token', this.token);

    this.services.getContent(getBodyContent)
      .subscribe(bodyContent => {
        this.mailBodyContent = bodyContent[0].content;
    }); 

    const getLogoContent = new FormData();
    getLogoContent.append('vendor_id', this.vendor_id);
    getLogoContent.append('email_type', this.email_type);
    getLogoContent.append('section_type', this.mailLogoSection);
    getLogoContent.append('token', this.token);

    this.services.getContent(getLogoContent)
      .subscribe(logoContent => {
        this.logoUrl = logoContent[0].content;
    }); 

    const getFooterContent = new FormData();
    getFooterContent.append('vendor_id', this.vendor_id);
    getFooterContent.append('email_type', this.email_type);
    getFooterContent.append('section_type', this.mailFooterSection);
    getFooterContent.append('token', this.token);

    this.services.getContent(getFooterContent)
      .subscribe(footerContent => {
        this.footerBodyContent = footerContent[0].content;
    }); 



    this.services.getSetting(uploadData)
      .subscribe(setting => {
        
      this.vendorSettingData  = JSON.parse(setting.setting_data);

        this.fields = [
          { name: 'First Name', value: this.vendorSettingData.first_name == true ? true : false },
          { name: 'Last Name', value: this.vendorSettingData.last_name == true ? true : false },
          { name: 'Email', value: this.vendorSettingData.email == true ? true : false },
          { name: 'Bvn' , value: this.vendorSettingData.bvn == true ? true : false  },
          { name: 'Addess', value: this.vendorSettingData.address  == true ? true : false },
          { name: 'Phone', value: this.vendorSettingData.phone == true ? true : false },
          { name: 'Account Number' , value: this.vendorSettingData.account_number == true ? true : false }
        ];

        // Create a new array with a form control for each order
          const controls = this.fields.map(c => new FormControl(''));
          this.formCheckbox = this.fb.group({
            fields: new FormArray(controls)
          }); 
    }); 
      
  }
  



  private prepareSave(): any {
    let input = new FormData();
    input.append('avatar', this.form.get('avatar').value);
    return input;
  }

  onFileChange(event) {
    this.selectedFile = event.target.files[0];
    let file = event.target.files[0];
    this.form.get('avatar').setValue({
      filename: file.name,
      filetype: file.type
    })
  }


  onSubmit() {
    // this.http is the injected HttpClient
    this.loading = true;
    this.email_type = 3;
    this.section_type = 2;
    this.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb21wYW55RW1haWwiOiJ0b3BlYXBwc0BnbWFpbC5jb20iLCJjb21wYW55cGhvbmUiOiIwOTA2NzU0NzIzMiIsImNvbXBhbnlOYW1lIjoiS1lDIEFGUklDQSIsImlzX3N1cGVyX2FkbWluIjoxLCJpZCI6MjMyLCJzdGF0dXMiOnRydWUsInN1Y2Nlc3MiOiJDcmVhdGVkIHN1Y2Nlc3NmdWwifQ.JhPRD0aqoxkZ6UEyqfQZNQugMnboPxCuFJ4wQGLgA6k';

    const uploadData = new FormData();
    uploadData.append('logo', this.selectedFile, this.selectedFile.name);
    uploadData.append('vendor_id', this.vendor_id);
    uploadData.append('email_type', this.email_type);
    uploadData.append('section_type', this.section_type);
    uploadData.append('token', this.token);

    this.services.uploadLogo(uploadData)
    .subscribe(uploadLogo => {
      this.loading = false;
      this.logoUrl = uploadLogo.logo_link;
      this.clearFile();
    });
  }

  clearFile() {
    this.form.get('avatar').setValue(null);
    this.fileInput.nativeElement.value = '';
  }


}
