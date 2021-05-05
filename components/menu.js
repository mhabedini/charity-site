export const menuItems = [
  {
    id: 2,
    label: "کاربران",
    icon: "ri-user-line",
    isMenuCollapsed: false,
    subItems: [
      {
        id: 3,
        label: "لیست کاربران",
        link: '/users'
      },
      {
        id: 4,
        label: "ایجاد کاربر جدید",
        link: '/users/create'
      }
    ]
  },
  {
    id: 5,
    label: "مکان ها",
    icon: "ri-map-pin-line",
    isMenuCollapsed: false,
    subItems: [
      {
        id: 6,
        label: "کشورها",
        link: '/products2'
      },
      {
        id: 7,
        label: "استان ها",
        link: '/products3'
      },
      {
        id: 8,
        label: "شهرها",
        link: '/products4'
      },
      {
        id: 9,
        label: "مناطق",
        link: '/products5'
      }
    ]
  },
  {
    id: 10,
    label: "سرپرستان",
    icon: "ri-hand-heart-line",
    isMenuCollapsed: false,
    subItems: [
      {
        id: 11,
        label: "لیست سرپرستان",
        link: '/households'
      },
      {
        id: 12,
        label: "ایجاد سرپرست جدید",
        link: '/households/create'
      }
    ]
  },
  {
    id: 13,
    label: "نهادهای خیریه",
    icon: " ri-building-2-line",
    isMenuCollapsed: false,
    subItems: [
      {
        id: 14,
        label: "لیست نهادهای خیریه",
        link: '/charity-departments'
      },
      {
        id: 15,
        label: "ایجاد نهاد خیریه جدید",
        link: '/charity-departments/create'
      }
    ]
  }
];

