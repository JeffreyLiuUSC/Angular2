import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FlexLayoutModule} from '@angular/flex-layout';
import { AppComponent } from './app.component';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import 'hammerjs';
import { MenuComponent } from './menu/menu.component';
import {MatListModule} from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { from } from 'rxjs';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { DishService } from './services/dish.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { MatDialogModule } from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { LeaderService } from './services/leader.service';
import { PromotionService } from './services/promotion.service';
import { LoginComponent } from './login/login.component';

import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { BaseURL } from './shared/baseurl';

import { ProcessHTTPMsgService } from './services/process-httpmsg.service';
import { HighlightDirective } from './directives/highlight.directive';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DishdetailComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    HomeComponent,
    ContactComponent,
    LoginComponent,
    HighlightDirective

  
   
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    AppRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    MatSelectModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    HttpModule,
    HttpClientModule
  ],
  entryComponents:[
    LoginComponent
  ],
  providers: [DishService, 
    PromotionService,
    LeaderService,
    ProcessHTTPMsgService,
    {provide: 'BaseURL', useValue: BaseURL}],
  bootstrap: [AppComponent]
})
export class AppModule { }
