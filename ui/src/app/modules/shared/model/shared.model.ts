import { MatSnackBarConfig } from '@angular/material';

export const adminSideNavs: ISideNav[] = [

    { title: 'Dashboard', path: '/admin/dashboard', icon: 'home', hasSubmenu: false, submenu: [] },
    {
        title: 'Employees', path: '', icon: 'cloud_circle', hasSubmenu: true, submenu:
            [
                { title: 'Employee List', path: '/admin/employees', icon: 'dashboard', hasSubmenu: false, submenu: [] }
            ]
    },
    {
        title: 'Student Management', path: '', icon: 'wc', hasSubmenu: true, submenu:
            [
                { title: 'Student', path: '/admin/students', icon: 'dashboard', hasSubmenu: false, submenu: [] },
                { title: 'Admission', path: '/admin/students/admissions', icon: 'dashboard', hasSubmenu: false, submenu: [] }
            ]
    }
];

export const allSideNavs: ISideNav[] = [

    /* { title: 'Dashboard', path: '/admin/dashboard', icon: 'home', hasSubmenu: false, submenu: [] },
     {
         title: 'Employees', path: '', icon: 'cloud_circle', hasSubmenu: true, submenu:
             [
                 { title: 'Employee List', path: '/admin/employees', icon: 'dashboard', hasSubmenu: false, submenu: [] },
                 // { title: 'Attendances', path: '/admin/employees/attendences', icon: 'dashboard', hasSubmenu: false, submenu: [] },
                 // { title: 'Salaries', path: '/admin/employees/salaries', icon: 'dashboard', hasSubmenu: false, submenu: [] },
                 // { title: 'Paid Salaries', path: '/admin/employees/paid-salaries', icon: 'dashboard', hasSubmenu: false, submenu: [] },
             ]
     },
     {
         title: 'Maintenance', path: '', icon: 'wc', hasSubmenu: true, submenu:
             [
                 { title: 'Admission Fees', path: '/admin/maintenances/admission-fees', icon: 'dashboard', hasSubmenu: false, submenu: [] },
                 { title: 'Classes', path: '/admin/maintenances/classes', icon: 'dashboard', hasSubmenu: false, submenu: [] },
                 { title: 'Employee Types', path: '/admin/maintenances/employee-types', icon: 'dashboard', hasSubmenu: false, submenu: [] },
                 { title: 'Designations', path: '/admin/maintenances/designations', icon: 'dashboard', hasSubmenu: false, submenu: [] },
             ]
     },
     {
         title: 'Student Management', path: '', icon: 'wc', hasSubmenu: true, submenu:
             [
                 { title: 'Student', path: '/admin/students', icon: 'dashboard', hasSubmenu: false, submenu: [] },
                 { title: 'Admission', path: '/admin/students/admissions', icon: 'dashboard', hasSubmenu: false, submenu: [] },
                 // { title: 'Attendence', path: '/admin/students/attendances', icon: 'dashboard', hasSubmenu: false, submenu: [] },
             ]
     }, */
    {
        title: 'Security', path: '', icon: 'wc', hasSubmenu: true, submenu:
            [
                { title: 'Role', path: '/security/roles', icon: 'dashboard', hasSubmenu: false, submenu: [] },
                { title: 'User', path: '/security/users', icon: 'dashboard', hasSubmenu: false, submenu: [] },
            ]
    }
];

export interface ISideNav {
    title: string;
    path: string;
    icon: string;
    hasSubmenu: boolean;
    submenu: ISideNav[];
    isExternalUrl?: boolean;
}

export interface IActionResponse {
    actionMessage: string;
    apiMessage: {
        error: boolean;
        code: number;
        detail: string;
        status: string;
        timeStamp: string;
    };

}

export class ApiEndpoint {

    //public static BASE_URL = 'http://localhost:2020';
    public static BASE_URL = 'http://localhost:8080';
    public static API_BASE_URL = ApiEndpoint.BASE_URL + '/api/v1';
    //public static BASE_URL = 'http://apis.pesl.org.in';

    public static LOGIN = ApiEndpoint.BASE_URL + '/login';
    public static ROLES = ApiEndpoint.API_BASE_URL + '/roles';
    public static USERS = ApiEndpoint.API_BASE_URL + '/users';
    static DOCUMENT: string;

}

export class Utils {

    static getDay(day: number) {
        switch (day) {
            case 0:
                return 'Sunday';

            case 1:
                return 'Monday';

            case 2:
                return 'Tuesday';

            case 3:
                return 'Wednesday';

            case 4:
                return 'Thursday';

            case 5:
                return 'Friday';

            case 6:
                return 'Saturday';

            default:
                return '';
        }
    }
}

export const districts: string[] = [
    'Thoubal',
    'Bishnupur',
    'Imphal East',
    'Imphal West',
    'Senapati',
    'Ukhrul',
    'Chandel',
    'Churachandpur',
    'Tamenglong',
    'Jiribam',
    'Kangpokpi',
    'Kakching',
    'Tengnoupal',
    'Kamjong',
    'Noney',
    'Pherzawl'
];

export const bloodGroups: string[] = [
    'A +ve',
    'A -ve',
    'B +ve',
    'B -ve',
    'O +ve',
    'O -ve',
    'AB +ve',
    'AB -ve',
    'NA'
];

export const religions: string[] = [
    'Sanamahism',
    'Hinduism',
    'Islam',
    'Budhism',
    'Jainism',
    'Others'
];

export const communities: string[] = [
    'General',
    'SC',
    'ST',
    'OBC'
];

export interface IConfirmation {
    title: string;
    subtitle: string;
}

export interface Document {
    id: number;
    docUrl: string;
}

export class SnackBarConfig {

    static flashTopSuccessSnackBar(): MatSnackBarConfig {
        return {
            panelClass: 'success-snackbar',
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
        };
    }

    static flashTopDangerSnackBar(): MatSnackBarConfig {
        return {
            panelClass: 'danger-snackbar',
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
        };
    }

    static dangerData(message: string) {
        return {
            icon: 'error',
            message
        };
    }

    static successData(message: string) {
        return {
            icon: 'check_circle',
            message
        };
    }

}
