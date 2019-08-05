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
  {
    path: 'test3',
    loadChildren: './pages/test3/test3.module#Test3PageModule'
  },
  {
    path: 'positive/:status',
    loadChildren: './pages/positive/positive.module#PositivePageModule'
  },
  {
    path: 'negative/:test/:status',
    loadChildren: './pages/negative/negative.module#NegativePageModule'
  },
  {
    path: 'negative/:test',
    loadChildren: './pages/negative/negative.module#NegativePageModule'
  },
  {
    path: 'list',
    loadChildren: './pages/list/list.module#ListPageModule'
  },
  {
    path: 'gdpr2',
    loadChildren: './pages/gdpr2/gdpr2.module#Gdpr2PageModule'
  },
  {
    path: 'test4',
    loadChildren: './pages/test4/test4.module#Test4PageModule'
  },
  {
    path: 'test5',
    loadChildren: './pages/test5/test5.module#Test5PageModule'
  },
  {
    path: 'test6',
    loadChildren: './pages/test6/test6.module#Test6PageModule'
  },  { path: 'user', loadChildren: './pages/user/user.module#UserPageModule' },








];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
