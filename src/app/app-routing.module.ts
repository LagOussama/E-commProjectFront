import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProduitsComponent } from './produits/produits.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { CategoriesComponent } from './categories/categories.component';
import { CommandesForAdminComponent } from './commandes-for-admin/commandes-for-admin.component';
import { CommandesTableComponent } from './commandes-table/commandes-table.component';
import { GestionCategoriesComponent } from './gestion-categories/gestion-categories.component';
import { GestionProduitsComponent } from './gestion-produits/gestion-produits.component';
import { ProduitsWithNameComponent } from './produits-with-name/produits-with-name.component';
import { AdminGuard } from './services/admin.guard';
import { UserGuard } from './services/user.guard';
import {GestionUserComponent} from './gestion-user/gestion-user.component'
import {SuperAdminGuard} from './services/super-admin.guard'

const routes: Routes = [
{path: '' , pathMatch: 'full' , redirectTo:'/categories'} ,
{path: 'products/:catid' , component: ProduitsComponent } ,
{path: 'product/:id' , component: ProductDetailsComponent},
{path: 'shoplist' , component: ShoppingListComponent},
{path: 'categories' , component: CategoriesComponent},
{path: 'commandes' , component: CommandesTableComponent, canActivate : [UserGuard] },
{path: 'admin/categories' , component: GestionCategoriesComponent , canActivate : [AdminGuard] },
{path: 'admin/produits' , component: GestionProduitsComponent, canActivate : [AdminGuard] },
{path: 'admin/commandes' , component: CommandesForAdminComponent, canActivate : [AdminGuard] },
{path: 'produits/name' , component: ProduitsWithNameComponent},
{path: 'superadmin/user' , component: GestionUserComponent, canActivate : [SuperAdminGuard] },





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
