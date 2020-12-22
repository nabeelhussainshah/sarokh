export const shipperRoutes = [
	{
		to: '/shipper/dashboard',
		name: 'Dashboard',
		iconClass: 'nav-icon fas fa-rocket',
	},
	{
		to: '/shipper/shipperwarehouse/ourlocation',
		name: 'Our Location',
		iconClass: 'nav-icon fa fa-warehouse',
	},
	{
		to: '/shipper/allshipments',
		name: 'All Shipments',
		iconClass: 'nav-icon fas fa-list-alt',
	},
	{
		to: '/shipper/codshipments',
		name: 'COD Shipments',
		iconClass: 'nav-icon fas fa-box',
	},
	{
		to: '/shipper/pendingshipments',
		name: 'Pending Shipments',
		iconClass: 'nav-icon fas fa-box',
	},
	{
		to: '/shipper/shipmentissues',
		name: 'Shipment issues',
		iconClass: 'nav-icon fas fa-box',
	},
	{
		to: '/shipper/users',
		name: 'Users',
		iconClass: 'nav-icon fas fa-users',
		subRoutes: [
			{
				to: '/shipper/users/adduser',
				name: 'Add User',
				iconClass: 'fas fa-user-plus nav-icon',
			},
			{
				to: '/shipper/users/allusers',
				name: 'All Users',
				iconClass: 'fas fa-users nav-icon',
			},
		],
	},
	{
		to: '/shipper/bills',
		name: 'Bills',
		iconClass: 'nav-icon fas fa-box',
	},
	{
		to: '/reports',
		name: 'Reports',
		iconClass: 'nav-icon fas fa-chart-pie',
	},
];
