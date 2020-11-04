import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LayoutModule } from '@angular/cdk/layout';
import {FlexLayoutModule} from '@angular/flex-layout';
import { MyMaterialModule } from './my-material/my-material.module';
import { NavComponent } from './nav/nav.component';
import { ProduitsComponent } from './produits/produits.component';
import { baseURL } from './shared/baseURL';
import { HttpClientModule } from '@angular/common/http';
import { ProductDetailsComponent } from './product-details/product-details.component';
import {MatBadgeModule} from '@angular/material/badge';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { HighlightDirective } from './directives/highlight.directive';
import { CategoriesComponent } from './categories/categories.component';
import { LoginComponent } from './login/login.component';
import { CommandesForAdminComponent } from './commandes-for-admin/commandes-for-admin.component';
import { CommandesTableComponent } from './commandes-table/commandes-table.component';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatToolbar, MatToolbarModule, MatInputModule } from '@angular/material';
import { SignupComponent } from './signup/signup.component';
import { GestionCategoriesComponent } from './gestion-categories/gestion-categories.component';
import { GestionProduitsComponent } from './gestion-produits/gestion-produits.component';
import { AddCategoriesComponent } from './gestion-categories/add-categories/add-categories.component';
import { UpdateCategoriesComponent } from './gestion-categories/update-categories/update-categories.component';
import { UpdateProduitsComponent } from './gestion-produits/update-produits/update-produits.component';
import { AddProduitsComponent } from './gestion-produits/add-produits/add-produits.component';
import { ModalComponent } from './modal/modal.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ProduitsWithNameComponent } from './produits-with-name/produits-with-name.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FooterComponent } from './footer/footer.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { GestionUserComponent } from './gestion-user/gestion-user.component';
import { AddUserComponent } from './gestion-user/add-user/add-user.component';
import { UpdateUserComponent } from './gestion-user/update-user/update-user.component';
@NgModule({
  declarations: [
    AppComponent,
   NavComponent,
   ProduitsComponent,
   ProductDetailsComponent,
   ShoppingListComponent,
   HighlightDirective,
   CategoriesComponent,
   LoginComponent,
   CommandesForAdminComponent,
   CommandesTableComponent,
   SignupComponent,
   GestionCategoriesComponent,
   GestionProduitsComponent,
   AddCategoriesComponent,
   UpdateCategoriesComponent,
   UpdateProduitsComponent,
   AddProduitsComponent,
   ModalComponent,
   ConfirmationComponent,
   ProduitsWithNameComponent,
   FooterComponent,
   GestionUserComponent,
   AddUserComponent,
   UpdateUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MyMaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule   ,
      MatProgressSpinnerModule   ,  
      MatInputModule,
      ScrollingModule ,
      NgbModule
       

   ],
providers: [ {provide: 'baseURL' , useValue: baseURL}],
  bootstrap: [AppComponent] ,
  entryComponents: [LoginComponent, SignupComponent, ModalComponent , AddCategoriesComponent, UpdateCategoriesComponent ,
  AddProduitsComponent , UpdateProduitsComponent, ConfirmationComponent,AddUserComponent,UpdateUserComponent]
})
export class AppModule { }
