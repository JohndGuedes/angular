import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AuthService } from '../../../../core/services/auth.service';

interface MenuItem {
    label: string;
    icon: string;
    route?: string;
    children?: MenuItem[];
    isOpen?: boolean;
}

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss',
    animations: [
        trigger('slideInOut', [
            state('true', style({ height: '*', opacity: 1, visibility: 'visible' })),
            state('false', style({ height: '0px', opacity: 0, visibility: 'hidden' })),
            transition('true <=> false', animate('300ms ease-in-out'))
        ]),
        trigger('slideRight', [
            transition(':enter', [
                style({ transform: 'translateX(-20px)', opacity: 0 }),
                animate('200ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
            ]),
            transition(':leave', [
                animate('200ms ease-in', style({ transform: 'translateX(-20px)', opacity: 0 }))
            ])
        ])
    ]
})
export class SidebarComponent {
    private authService = inject(AuthService);
    private router = inject(Router);

    isSidebarOpen = signal(true);
    userName = signal('Jesus Echeverria'); // Mock data
    userDept = signal('Web Developer');
    isDarkMode = signal(false);

    menuItems = signal<MenuItem[]>([
        {
            label: 'Dashboard',
            icon: 'dashboard',
            route: '/dashboard'
        },
        {
            label: 'Courses',
            icon: 'school',
            children: [
                { label: 'All Courses', icon: 'list', route: '/dashboard/courses' },
                { label: 'My Courses', icon: 'person', route: '/dashboard/my-courses' }
            ]
        },
        {
            label: 'Settings',
            icon: 'settings',
            children: [
                { label: 'Profile', icon: 'account_circle', route: '/dashboard/profile' },
                { label: 'Security', icon: 'security', route: '/dashboard/security' }
            ]
        }
    ]);

    isSettingsOpen = signal(false);

    toggleSidebar() {
        this.isSidebarOpen.update(value => !value);
    }

    toggleSettings() {
        this.isSettingsOpen.update(value => !value);
    }

    toggleSubmenu(item: MenuItem) {
        if (item.children) {
            item.isOpen = !item.isOpen;
        }
    }

    toggleTheme() {
        this.isDarkMode.update(val => !val);
        console.log('Theme toggled', this.isDarkMode());
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
