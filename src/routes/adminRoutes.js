export const adminRoutes = [
	{
		to: '/admin/dashboard',
		name: 'Dashboard',
		iconClass: 'nav-icon fas fa-rocket',
	},
	{
		to: '/admin/tracking/',
		name: 'Tracking',
		iconClass: 'nav-icon fas fa-map-marker-alt',
		subRoutes: [
			{
				to: '/admin/tracking/driverlocations',
				name: 'Driver Locations',
				iconClass: 'nav-icon fas fa-map-marker-alt',
			},
			{
				to: '/admin/tracking/orderlocations',
				name: 'Order Locations',
				iconClass: 'nav-icon fas fa-map-marker-alt',
			},
		],
	},
	{
		to: '/admin/shipments/',
		name: 'Shipments',
		iconClass: 'nav-icon fas fa-box',
		subRoutes: [
			{
				to: '/admin/shipments/allshipments',
				name: 'All Shipments',
				iconClass: 'nav-icon fas fa-box',
			},
			{
				to: '/admin/shipments/deliveredshipments',
				name: 'Delivered Shipments',
				iconClass: 'nav-icon fas fa-box',
			},
			{
				to: '/admin/shipments/pendingshipments',
				name: 'Pending Shipments',
				iconClass: 'nav-icon fas fa-box',
			},
			{
				to: '/admin/tracking/orderlocations',
				name: 'No Response Shipments',
				iconClass: 'nav-icon fas fa-box',
			},
			{
				to: '/admin/shipments/CODshipments',
				name: 'COD Shipments',
				iconClass: 'nav-icon fas fa-box',
			},
			{
				to: '/admin/shipments/prepaidshipments',
				name: 'Prepaid Shipments',
				iconClass: 'nav-icon fas fa-box',
			},
			{
				to: '/admin/shipments/returnshipments',
				name: 'Return Shipments',
				iconClass: 'nav-icon fas fa-box',
			},
			{
				to: '/admin/shipments/shipmentissues',
				name: 'Shipment issues',
				iconClass: 'nav-icon fas fa-box',
			},
			{
				to: '/admin/shipments/pickupshipments',
				name: 'Pickup Shipments',
				iconClass: 'nav-icon fas fa-box',
			},
			{
				to: '/admin/shipments/deliveryshipments',
				name: 'Delievery Shipments',
				iconClass: 'nav-icon fas fa-box',
			},
		],
	},
	{
		to: '/admin/shippers/',
		name: 'Shippers',
		iconClass: 'nav-icon fas fa-shipping-fast',
		subRoutes: [
			{
				to: '/admin/shippers/allshippers',
				name: 'All Shippers',
				iconClass: 'nav-icon fas fa-shipping-fast',
			},
			{
				to: '/admin/shippers/shipperbilling',
				name: 'Shipper Billing',
				iconClass: 'nav-icon fas fa-shipping-fast',
			},
			{
				to: '/admin/tracking/orderlocations',
				name: 'Deliever Charges',
				iconClass: 'nav-icon fas fa-shipping-fast',
			},
		],
	},
	{
		to: '/admin/warehouses/',
		name: 'Warehouses',
		iconClass: 'nav-icon fa fa-warehouse',
		subRoutes: [
			{
				to: '/admin/warehouses/addshipperwarehouse/step1',
				name: 'Add Warehouse',
				iconClass: 'nav-icon fa fa-warehouse',
			},
			{
				to: '/admin/warehouses/warehouselist',
				name: 'Warehouse List',
				iconClass: 'nav-icon fa fa-warehouse',
			},
			{
				to: '/admin/tracking/orderlocations',
				name: 'Print Label',
				iconClass: 'nav-icon fa fa-warehouse',
			},
		],
	},
	{
		to: '/admin/scheduling/',
		name: 'Scheduling',
		iconClass: 'nav-icon fas fa-money-bill-wave',
		subRoutes: [
			{
				to: '/admin/scheduling/createtrip',
				name: 'Create Trip',
				iconClass: 'nav-icon fas fa-money-bill-wave',
			},
			{
				to: '/admin/tracking/orderlocations',
				name: 'All Trips',
				iconClass: 'nav-icon fas fa-money-bill-wave',
			},
			{
				to: '/admin/tracking/orderlocations',
				name: 'Active Trips',
				iconClass: 'nav-icon fas fa-money-bill-wave',
			},
		],
	},
	{
		to: '/admin/finance/',
		name: 'Finance',
		iconClass: 'nav-icon fas fa-money-bill-wave',
		subRoutes: [
			{
				to: '/admin/finance/dasboard',
				name: 'Finance Dashboard',
				iconClass: 'nav-icon fas fa-money-bill-wave',
			},
			{
				to: '/admin/finance/createbill',
				name: 'Create Bill',
				iconClass: 'nav-icon fas fa-money-bill-wave',
			},
			{
				to: '/admin/finance/paymentrecord',
				name: 'Payment Record',
				iconClass: 'nav-icon fas fa-money-bill-wave',
			},
			{
				to: '/admin/finance/billdetail',
				name: 'Bill Details',
				iconClass: 'nav-icon fas fa-money-bill-wave',
			},
		],
	},
	{
		to: '/admin/drivers/',
		name: 'Drivers',
		iconClass: 'nav-icon fas fa-map',
		subRoutes: [
			{
				to: '/admin/drivers/adddriver/step1',
				name: 'Add Driver',
				iconClass: 'nav-icon fas fa-map',
			},
			{
				to: '/admin/drivers/alldrivers',
				name: 'All Drivers',
				iconClass: 'nav-icon fas fa-map',
			},
		],
	},
	{
		to: '/admin/dealer',
		name: 'Dealer',
		iconClass: 'nav-icon fas fa-store',
		subRoutes: [
			{
				to: '/admin/dealer/adddealer/step1',
				name: 'Add Dealer',
				iconClass: 'nav-icon fas fa-store',
			},
			{
				to: '/admin/dealer/alldealers',
				name: 'All Dealers',
				iconClass: 'nav-icon fas fa-store',
			},
			{
				to: '/ledger/allledger',
				name: 'Dealer Inventory',
				iconClass: 'nav-icon fas fa-store',
			},
			{
				to: '/ledger/allledger',
				name: 'Recieved Ledgers',
				iconClass: 'nav-icon fas fa-store',
			},
			{
				to: '/ledger/allledger',
				name: 'COD Ledgers',
				iconClass: 'nav-icon fas fa-store',
			},
		],
	},
	{
		to: '/admin/vehicles/',
		name: 'Vechicles',
		iconClass: 'nav-icon fas fa-truck',
		subRoutes: [
			{
				to: '/admin/vehicles/addvehicle',
				name: 'Add Vechicles',
				iconClass: 'nav-icon fas fa-truck',
			},
			{
				to: '/admin/vehicles/allvehicles',
				name: 'All Vechicles',
				iconClass: 'nav-icon fas fa-truck',
			},
			{
				to: '/admin/vehicles/maintenancerecords',
				name: 'Maintenance Records',
				iconClass: 'nav-icon fas fa-truck',
			},
		],
	},
	{
		to: '/admin/users',
		name: 'Users',
		iconClass: 'nav-icon fas fa-copy',
		subRoutes: [
			{
				to: '/admin/users/adduser',
				name: 'Add User',
				iconClass: 'fas fa-user-plus nav-icon',
			},
			{
				to: '/admin/users/allusers',
				name: 'All Users',
				iconClass: 'fas fa-users nav-icon',
			},
		],
	},
	{
		to: '/reports',
		name: 'Reports',
		iconClass: 'nav-icon fas fa-chart-pie',
		subRoutes: [
			{
				to: '/shipper/users/adduser',
				name: 'Audit Trail',
				iconClass: 'nav-icon fas fa-map',
			},
		],
	},
];
