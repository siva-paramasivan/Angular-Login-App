import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren:() => import('./project-page/project-page.module').then(m => m.ProjectPageModule)
    }

    //Able to add path routing to enable independent module routing
];
