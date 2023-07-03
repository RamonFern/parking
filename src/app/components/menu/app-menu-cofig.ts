// import { AuthService } from 'src/app/core/auth/auth.service';
// import { PermissaoType } from 'src/app/shared/models/permissao-type';
import { MenuItem } from './menu-item';

export class AppMenuConfig {
    readonly MENU: MenuItem[] = [
        new MenuItem({
            label: 'Dashboard',
            icon: 'dashboard',
            link: 'dashboard',
            // permissao: PermissaoType.ACESSO_PAGINA_DASHBOARD,
            // authService: this.authService,
        }),
        new MenuItem({
            label: 'Ferramentas',
            icon: 'account_tree',
            link: 'list',
            // authService: this.authService,

            submenus: [
                new MenuItem({
                    label: 'Lista todos',
                    icon: 'receipt_long',
                    link: 'list-todos',
                    // permissao: PermissaoType.ACESSO_PAGINA_PACIENTES,
                    // authService: this.authService,
                }),
                new MenuItem({
                    label: 'Fechamento',
                    icon: 'groups_2',
                    link: 'fechar',
                    // permissao: PermissaoType.ACESSO_PAGINA_ROTINA_SALA,
                    // authService: this.authService,
                }),
                new MenuItem({
                  label: 'Outros',
                  icon: 'group_work',
                  link: 'outros',
                  // permissao: PermissaoType.ACESSO_PAGINA_ROTINA_SALA,
                  // authService: this.authService,
              }),
            ],
        }),
    ];

    // constructor(private authService: AuthService) {}
    constructor() {}
}
