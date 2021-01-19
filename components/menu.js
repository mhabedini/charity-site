export const menuItems = [
    {
        id: 2,
        label: "menuitems.dashboard.text",
        icon: "ri-dashboard-line",
        badge: {
            variant: "success",
            text: "menuitems.dashboard.badge"
        },
        isMenuCollapsed: false,
        subItems: [
            {
                id: 3,
                label: 'menuitems.dashboard.list.sales',
                link: '/'
            },
            {
                id: 4,
                label: 'menuitems.dashboard.list.crm',
                link: '/dashboard/crm'
            },
            {
                id: 5,
                label: 'menuitems.dashboard.list.analytics',
                link: '/dashboard/analytics'
            },
        ]
    }
];

