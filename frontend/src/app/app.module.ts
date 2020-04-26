import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material';
import { CheckinComponent } from './routes/checkin/checkin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { StudentsService } from './services/students-service/students-service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { GroupsService } from './services/groups-service/groups-service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MainComponent } from './routes/main/main.component';
import { GroupsComponent } from './routes/groups/groups.component';
import { StudentsComponent } from './routes/students/students.component';

@NgModule({
  declarations: [
    AppComponent,
    CheckinComponent,
    MainComponent,
    GroupsComponent,
    StudentsComponent,
  ],
  imports: [
    MatDatepickerModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSelectModule,
  ],
  providers: [
    StudentsService,
    GroupsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
