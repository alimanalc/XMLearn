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
    loadChildren: './pages/home/home.module#HomePageModule'
  },
  {
    path: 'data',
    loadChildren: './pages/data/data.module#DataPageModule'
  },
  {
    path: 'test1',
    loadChildren: './pages/test1/test1.module#Test1PageModule'
  },
  {
    path: 'test2',
    loadChildren: './pages/test2/test2.module#Test2PageModule'
  },
  {
    path: 'about',
    loadChildren: './pages/about/about.module#AboutPageModule'
  },
  {
    path: 'more',
    loadChildren: './pages/more/more.module#MorePageModule'
  },
  {
    path: 'gdpr',
    loadChildren: './pages/gdpr/gdpr.module#GdprPageModule'
  },
  {
    path: 'tests',
    loadChildren: './pages/tests/tests.module#TestsPageModule'
  },
  { path: 'test3', loadChildren: './pages/test3/test3.module#Test3PageModule' },
  { path: 'positive', loadChildren: './pages/positive/positive.module#PositivePageModule' },
  { path: 'negative', loadChildren: './pages/negative/negative.module#NegativePageModule' },
  { path: 'negative/:test', loadChildren: './pages/negative/negative.module#NegativePageModule' },  { path: 'list', loadChildren: './pages/list/list.module#ListPageModule' },
  { path: 'gdpr2', loadChildren: './pages/gdpr2/gdpr2.module#Gdpr2PageModule' },






];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
