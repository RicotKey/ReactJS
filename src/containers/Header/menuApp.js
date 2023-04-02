export const adminMenu = [
    { //manage-user
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.admin.crud', link: '/system/user-manage'
            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'
            },
            {
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },

                // ]
            },
            { //manage-user

                name: 'menu.doctor.mangae-schedule', link: '/doctor/manage-schedule'


            },
            {
                name: 'menu.admin.list-user', link: '/system/list-user'
            }
            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
        ]
    },

    { //manage-clinic
        name: 'menu.admin.clinic',
        menus: [
            {
                name: 'menu.admin.manage-clinic', link: '/system/manage-clinic'
            },
        ]
    },
    { //manage-specialty
        name: 'menu.admin.specialty',
        menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty'
            },
        ]
    },
    { //manage-handbook
        name: 'menu.admin.handbook',
        menus: [
            {
                name: 'menu.admin.manage-handbook', link: '/system/manage-handbook'
            },
        ]
    }
];

export const doctorMenu = [
    { //manage-user
        name: 'menu.doctor.doctor',
        menus: [

            {

                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'
            },
            {
                name: 'menu.doctor.manege.patient', link: '/doctor/manage-patient'
            }

        ]


    },
];