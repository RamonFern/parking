import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListComponent } from './List/List.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,

    children: [
      {
          path: 'dashboard',
          component: DashboardComponent,
          // canActivate: [AuthGuard],
          // canLoad: [AuthGuard],
          // data: {
          //     permissao: PermissaoType.ACESSO_PAGINA_DASHBOARD,
          // },
      },
    ]
  },
  {
    path: 'list-todos',
    component: ListComponent,
    // canActivate: [AuthGuard],
    // canLoad: [AuthGuard],
    // data: {
    //     permissao: PermissaoType.ACESSO_PAGINA_DASHBOARD,
    // },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
