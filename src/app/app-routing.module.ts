import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  //{ path: 'home', loadChildren: './pages/home/home.module', canActivate: [AuthGuard] },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule), canActivate: [AuthGuard] },
  //{ path: 'login', loadChildren: './pages/login/login.module', canActivate: [LoginGuard]},
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),canActivate: [LoginGuard] },
 // { path: 'details', loadChildren: './pages/details/details.module', canActivate: [AuthGuard]},
  { path: 'details', loadChildren: () => import('./pages/details/details.module').then(m => m.DetailsPageModule),canActivate: [AuthGuard] },
  { path: 'details/:id', loadChildren: () => import('./pages/details/details.module').then(m => m.DetailsPageModule),canActivate: [AuthGuard] }
  //{ path: 'details/:id', loadChildren: './pages/details/details.module', canActivate: [AuthGuard]},
 // { path: 'auth', loadChildren: () => import('src/app/services/auth.service').then(m => m.AuthService) }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
