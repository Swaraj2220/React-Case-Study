export const catalogItems = [
  { id: 1, name: 'Laptop Dell Latitude 3540', category: 'Electronics', qtyNeeded: 15, estCost: 75000, status: 'Low Stock' },
  { id: 2, name: 'HP LaserJet Pro M404dn', category: 'Electronics', qtyNeeded: 8, estCost: 32000, status: 'In Stock' },
  { id: 3, name: 'Office Desk (140x60cm)', category: 'Furniture', qtyNeeded: 25, estCost: 18500, status: 'Out of Stock' },
  { id: 4, name: 'Ergonomic Office Chair', category: 'Furniture', qtyNeeded: 30, estCost: 22000, status: 'In Stock' },
  { id: 5, name: 'A4 Paper Bundle (500 sheets)', category: 'Office Supplies', qtyNeeded: 200, estCost: 450, status: 'Low Stock' },
  { id: 6, name: 'Stapler (Heavy Duty)', category: 'Office Supplies', qtyNeeded: 50, estCost: 350, status: 'In Stock' },
  { id: 7, name: 'Dell 27" 4K Monitor', category: 'Electronics', qtyNeeded: 12, estCost: 42000, status: 'In Stock' },
  { id: 8, name: 'Cisco VoIP Phone', category: 'IT Equipment', qtyNeeded: 40, estCost: 8500, status: 'Low Stock' },
  { id: 9, name: 'Server Rack 42U', category: 'IT Equipment', qtyNeeded: 3, estCost: 95000, status: 'In Stock' },
  { id: 10, name: 'File Cabinet (4-Drawer)', category: 'Furniture', qtyNeeded: 20, estCost: 12000, status: 'Out of Stock' },
  { id: 11, name: 'Logitech Wireless Keyboard', category: 'Electronics', qtyNeeded: 60, estCost: 1800, status: 'In Stock' },
  { id: 12, name: 'UPS 1500VA Backup', category: 'IT Equipment', qtyNeeded: 10, estCost: 14500, status: 'Low Stock' },
]

export const priceLogs = [
  { id: 1, itemName: 'Laptop Dell Latitude 3540', supplier: 'TechVista Solutions', oldPrice: 78000, newPrice: 75000, date: '2026-06-15', currentPrice: 75000 },
  { id: 2, itemName: 'HP LaserJet Pro M404dn', supplier: 'OfficeGear India', oldPrice: 35000, newPrice: 32000, date: '2026-06-12', currentPrice: 32000 },
  { id: 3, itemName: 'Ergonomic Office Chair', supplier: 'FurnishWell Pvt Ltd', oldPrice: 25000, newPrice: 22000, date: '2026-06-10', currentPrice: 22000 },
  { id: 4, itemName: 'Dell 27" 4K Monitor', supplier: 'TechVista Solutions', oldPrice: 46000, newPrice: 42000, date: '2026-06-08', currentPrice: 42000 },
  { id: 5, itemName: 'Cisco VoIP Phone', supplier: 'NetConnect Systems', oldPrice: 9200, newPrice: 8500, date: '2026-06-05', currentPrice: 8500 },
  { id: 6, itemName: 'Server Rack 42U', supplier: 'DataCenter Pro Inc', oldPrice: 102000, newPrice: 95000, date: '2026-06-03', currentPrice: 95000 },
  { id: 7, itemName: 'UPS 1500VA Backup', supplier: 'PowerShield Corp', oldPrice: 16200, newPrice: 14500, date: '2026-06-01', currentPrice: 14500 },
  { id: 8, itemName: 'Logitech Wireless Keyboard', supplier: 'OfficeGear India', oldPrice: 2100, newPrice: 1800, date: '2026-05-28', currentPrice: 1800 },
]

export const verificationQueue = [
  { id: 1, requester: 'Ravi Sharma', department: 'Engineering', amount: 184000, status: 'pending' },
  { id: 2, requester: 'Priya Patel', department: 'Marketing', amount: 96000, status: 'pending' },
  { id: 3, requester: 'Amit Verma', department: 'Operations', amount: 312500, status: 'pending' },
  { id: 4, requester: 'Sneha Reddy', department: 'Finance', amount: 75500, status: 'pending' },
  { id: 5, requester: 'Vikram Singh', department: 'HR', amount: 128000, status: 'pending' },
]

export const approvedOrders = []
export const rejectedOrders = []

export const vendors = [
  { id: 1, name: 'TechVista Solutions', legalId: 'GST-27AABCU1234D1Z1', status: 'verified', category: 'Electronics', contact: 'info@techvista.in' },
  { id: 2, name: 'OfficeGear India', legalId: 'GST-29ABCOF5678E1Z5', status: 'verified', category: 'Office Supplies', contact: 'sales@officegear.in' },
  { id: 3, name: 'FurnishWell Pvt Ltd', legalId: 'GST-19ABCFW9012F1Z9', status: 'flagged', category: 'Furniture', contact: 'contact@furnishwell.com' },
  { id: 4, name: 'NetConnect Systems', legalId: 'GST-07ABCNC3456G1Z3', status: 'verified', category: 'IT Equipment', contact: 'info@netconnect.in' },
  { id: 5, name: 'DataCenter Pro Inc', legalId: 'GST-33ABCDP7890H1Z7', status: 'flagged', category: 'IT Equipment', contact: 'support@dcpro.com' },
  { id: 6, name: 'PowerShield Corp', legalId: 'GST-24ABCPC1234I1Z0', status: 'verified', category: 'Electronics', contact: 'orders@powershield.in' },
  { id: 7, name: 'StationeryMart Co', legalId: 'GST-08ABCSM5678J1Z4', status: 'verified', category: 'Office Supplies', contact: 'info@stationerymart.in' },
  { id: 8, name: 'DesiOffice Supplies', legalId: 'GST-05ABDOS9012K1Z8', status: 'verified', category: 'Office Supplies', contact: 'sales@desioffice.in' },
  { id: 9, name: 'GreenFurnish Interiors', legalId: 'GST-10ABGFI3456L1Z2', status: 'flagged', category: 'Furniture', contact: 'info@greenfurnish.in' },
  { id: 10, name: 'CompuWorld Distributors', legalId: 'GST-12ABCW7890M1Z6', status: 'verified', category: 'Electronics', contact: 'disty@compuworld.in' },
]

export const purchaseRequests = [
  { id: 1, item: 'Laptop Dell Latitude 3540', department: 'Engineering', totalCost: 1125000, budget: 1000000 },
  { id: 2, item: 'Ergonomic Office Chair', department: 'Operations', totalCost: 660000, budget: 700000 },
  { id: 3, item: 'Cisco VoIP Phone', department: 'IT', totalCost: 340000, budget: 300000 },
  { id: 4, item: 'Office Desk (140x60cm)', department: 'Administration', totalCost: 462500, budget: 500000 },
  { id: 5, item: 'Dell 27" 4K Monitor', department: 'Engineering', totalCost: 504000, budget: 480000 },
  { id: 6, item: 'UPS 1500VA Backup', department: 'IT', totalCost: 145000, budget: 160000 },
  { id: 7, item: 'Server Rack 42U', department: 'IT', totalCost: 285000, budget: 250000 },
  { id: 8, item: 'File Cabinet (4-Drawer)', department: 'Administration', totalCost: 240000, budget: 200000 },
]

export const inventoryRules = [
  { id: 1, description: 'Electronics must be stored in climate-controlled zones.', team: 'Warehouse A', warehouse: 'East', category: 'Electronics', threshold: 50, active: true },
  { id: 2, description: 'Furniture stock must not exceed 200 units per warehouse.', team: 'Fulfillment Ops', warehouse: 'East', category: 'Furniture', threshold: 200, active: true },
  { id: 3, description: 'IT Equipment requires security sign-off for any transfer.', team: 'Security', warehouse: 'West', category: 'IT Equipment', threshold: 25, active: false },
  { id: 4, description: 'Office Supplies reorder triggers at 1000 units remaining.', team: 'Procurement', warehouse: 'West', category: 'Office Supplies', threshold: 1000, active: true },
  { id: 5, description: 'Hazardous materials must be segregated by 10m distance.', team: 'Safety', warehouse: 'East', category: 'Electronics', threshold: 10, active: true },
  { id: 6, description: 'Weekly audit required for items with turnover above 500 units.', team: 'Compliance', warehouse: 'West', category: 'All', threshold: 500, active: false },
]

export const supplyRoutes = [
  { id: 1, route: 'Mumbai → Pune', carrier: 'TransFast Logistics', cost: 12500, time: '4 hrs', fees: 1800 },
  { id: 2, route: 'Delhi → Gurugram', carrier: 'SpeedyMove Carriers', cost: 8900, time: '2.5 hrs', fees: 1200 },
  { id: 3, route: 'Bangalore → Chennai', carrier: 'SouthLink Transport', cost: 21500, time: '8 hrs', fees: 3200 },
  { id: 4, route: 'Ahmedabad → Vadodara', carrier: 'Gujarat Freight Express', cost: 11000, time: '3 hrs', fees: 1500 },
  { id: 5, route: 'Kolkata → Bhubaneswar', carrier: 'EastZone Logistics', cost: 18500, time: '7 hrs', fees: 2500 },
]

export const warehouses = {
  East: {
    name: 'Eastern Distribution Hub',
    items: [
      { itemId: 1, itemName: 'Laptop Dell Latitude 3540', stock: 25 },
      { itemId: 3, itemName: 'Office Desk (140x60cm)', stock: 10 },
      { itemId: 5, itemName: 'A4 Paper Bundle (500 sheets)', stock: 300 },
      { itemId: 7, itemName: 'Dell 27" 4K Monitor', stock: 18 },
      { itemId: 9, itemName: 'Server Rack 42U', stock: 2 },
    ],
  },
  West: {
    name: 'Western Distribution Hub',
    items: [
      { itemId: 2, itemName: 'HP LaserJet Pro M404dn', stock: 15 },
      { itemId: 4, itemName: 'Ergonomic Office Chair', stock: 45 },
      { itemId: 6, itemName: 'Stapler (Heavy Duty)', stock: 80 },
      { itemId: 8, itemName: 'Cisco VoIP Phone', stock: 35 },
      { itemId: 10, itemName: 'File Cabinet (4-Drawer)', stock: 5 },
    ],
  },
}
