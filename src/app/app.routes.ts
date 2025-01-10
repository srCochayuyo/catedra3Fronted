import { Routes } from '@angular/router';
import { authGuard } from './Auth/Guards/auth.guard';

export const routes: Routes = [

    {

        path: '',
        loadComponent: () => import("../app/Auth/Pages/login/login.component").then((m) => m.LoginComponent),
    },
    {
        path: 'Register',
        loadComponent: () => import("../app/Auth/Pages/register/register.component").then((m) => m.RegisterComponent),
    },
    {
        path: 'User',
        loadComponent: () => import("../app/Post/Pages/list-post/list-post.component").then((m) => m.ListPostComponent),
        canActivate:[authGuard],
        children: [
        ]
    }









];
