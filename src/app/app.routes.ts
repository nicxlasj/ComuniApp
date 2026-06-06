import { Routes } from '@angular/router';
import { ServicesPage } from './pages/services-page/services-page';
import { LoginPage } from './pages/login-page/login-page';
import { ServiceView } from './components/service-view/service-view';
import { SignUpPage } from './pages/sign-up-page/sign-up-page';
import { CreateServicePage } from './pages/create-service-page/create-service-page';


export const routes: Routes = [
    {
        path: 'services',
        component: ServicesPage
    },
    {
        path: '',
        component: LoginPage
    },
    {
        path: 'service',
        component: ServiceView
    },
    {
        path: 'sign-up',
        component: SignUpPage
    },
    {
        path: 'create-service',
        component: CreateServicePage
    }
];
