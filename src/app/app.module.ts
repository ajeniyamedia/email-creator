import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Editor
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { ColorPickerModule } from 'ngx-color-picker';

// Loader
import { LaddaModule } from 'angular2-ladda';

import { MatCheckboxModule} from '@angular/material';
import { MatCardModule, MatIconModule, MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import { from } from 'rxjs';
import { EmailComposerComponent } from './ui/email-composer/email-composer.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { EmailService } from '../app/services/email.service';
import { AppErrorHander } from './common/app-error-handler';



@NgModule({
  declarations: [
    AppComponent,
    EmailComposerComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot(),
    BrowserAnimationsModule,
    MatCheckboxModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatGridListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ColorPickerModule,
    ReactiveFormsModule,
    LaddaModule.forRoot({
        style: "contract",
        spinnerSize: 40,
        spinnerColor: "red",
        spinnerLines: 12
    }),
    ],
  providers: [
    EmailService,
    { provide: ErrorHandler, useClass: AppErrorHander }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
