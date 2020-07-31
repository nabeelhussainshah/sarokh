export const NaqilRoutes = [
    {
      to: "/shipper/dashboard",
      name: "Dashboard",
      iconClass: "nav-icon fas fa-rocket",
    },
    {
      to: "/shipper/addshipperwarehouse/ourlocation",
      name: "Our Location",
      iconClass: "nav-icon fa fa-warehouse",
    },
    {
      to: "/shipper/allshipments",
      name: "All Shipments",
      iconClass: "nav-icon fa fa-map",
    },
    {
      to: "/shipper/codshipments",
      name: "COD Shipments",
      iconClass: "nav-icon fa fa-map",
    },
    {
      to: "/shipper/pendingshipments",
      name: "Pending Shipments",
      iconClass: "nav-icon fa fa-map",
    },
    {
      to: "/shipper/shipmentissues",
      name: "Shipment issues",
      iconClass: "nav-icon fa fa-map",
    },
    {
      to: "/shipper/users/adduser",
      name: "Users",
      iconClass: "nav-icon fas fa-copy",
      subRoutes: [
        {
          to: "/shipper/users/adduser",
          name: "Add User",
          iconClass: "fas fa-user-plus nav-icon",
        },
        {
          to: "/shipper/users/allusers",
          name: "All Users",
          iconClass: "fas fa-users nav-icon",
        },
      ],
    },
    {
      to: "/shipper/ledger",
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