import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: '../pages/home/home.module#HomePageModule'
  },
  {
    path: 'data',
    loadChildren: '../pages/data/data.module#DataPageModule'
  },
  {
    path: 'test1',
    loadChildren: '../pages/test1/test1.module#Test1PageModule'
  },
  {
    path: 'test2',
    loadChildren: '../pages/test2/test2.module#Test2PageModule'
  },
  {
    path: 'about',
    loadChildren: '../pages/about/about.module#AboutPageModule'
  },
  {
    path: 'more',
    loadChildren: '../pages/more/more.module#MorePageModule'
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
