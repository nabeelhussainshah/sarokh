export const NaqilRoutes = [
    {
      to: "/dashboard",
      name: "Dashboard",
      iconClass: "nav-icon fas fa-rocket",
    },
    {
      to: "/ourlocation",
      name: "Our Location",
      iconClass: "nav-icon fa fa-warehouse",
    },
    {
      to: "/allshipments",
      name: "All Shipments",
      iconClass: "nav-icon fa fa-map",
    },
    {
      to: "/codshipments",
      name: "COD Shipments",
      iconClass: "nav-icon fa fa-map",
    },
    {
      to: "/pendingshipments",
      name: "Pending Shipments",
      iconClass: "nav-icon fa fa-map",
    },
    {
      to: "/shipmentissue",
      name: "Shipment issue",
      iconClass: "nav-icon fa fa-map",
    },
    {
      to: "/users",
      name: "Users",
      iconClass: "nav-icon fas fa-copy",
      subRoutes: [
        {
          to: "/users/adduser",
          name: "Add User",
          iconClass: "fas fa-user-plus nav-icon",
        },
        {
          to: "/user/allusers",
          name: "All Users",
          iconClass: "fas fa-users nav-icon",
        },
      ],
    },
    {
      to: "/ledger",
      name: "Ledger",
      iconClass: "nav-icon fas fa-money-bill-wave",
      subRoutes: [
        {
          to: "/ledger/addledger",
          name: "Add Ledger",
          iconClass: "nav-icon fas fa-money-bill-wave",
        },
        {
          to: "/ledger/allledger",
          name: "All Ledger",
          iconClass: "nav-icon fas fa-money-bill-wave",
        },
      ],
    },
    {
      to: "/reports",
      name: "Reports",
      iconClass: "nav-icon fas fa-chart-pie",
    },
  ];