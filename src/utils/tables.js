export const columsHome = [
	{
		name: 'Id',
		selector: row => row.id,
		sortable: true,
	},
	{
		name: 'Producto',
		selector: row => row.product,
		sortable: true,
	},
	{
		name: 'Precio',
		selector: row => row.price,
		sortable: true,
	},
	{
		name: 'Cantidad',
		selector: row => row.cant,
		sortable: true,
	},
	{
		name: 'Total',
		selector: row => row.total,
		sortable: true,
	},
];

export const dataHome = [
  	{
		id: 1,
		product: 'Jugo HIT 500ml',
		price: 1988,
		cant: 19,
		total: 10000,
	},
	{
		id: 2,
		product: 'Jugo del valle 250ml',
		price: 2000,
		cant: 1,
		total: 2000,
	},
	{
		id: 3,
		product: 'Detodito',
		price: 3000,
		cant: 1,
		total: 3000,
	},
]
export const columsInventory = [
	{
		name: 'Nombre del producto',
		selector: row => row.name,
		sortable: true,
	},
	{
		name: 'Precio',
		selector: row => row.price,
		sortable: true,
	},
	{
		name: 'Cantidad',
		selector: row => row.cant,
		sortable: true,
	},
	{
		name: '',
		selector: row => row.actions,
	},
];

export const dataInventory = [
  	{
		name: 'Coca-cola',
		price: 2000,
		cant: 19,
		actions: <div className="flex gap-2 items-center"><button className="bg-red-500 p-2 rounded-lg text-white">Editar</button><button className="bg-red-500 p-2 rounded-lg text-white">Eliminar</button></div>,
	},
  	{
		name: 'Detodito picante',
		price: 2500,
		cant: 13,
		actions: <div className="flex gap-2 items-center"><button className="bg-red-500 p-2 rounded-lg text-white">Editar</button><button className="bg-red-500 p-2 rounded-lg text-white">Eliminar</button></div>,
	},
  	{
		name: 'Pizzas',
		price: 3500,
		cant: 20,
		actions: <div className="flex gap-2 items-center"><button className="bg-red-500 p-2 rounded-lg text-white">Editar</button><button className="bg-red-500 p-2 rounded-lg text-white">Eliminar</button></div>,
	},
]


// PRODUCTOS

export const columsProducts = [
	{
		name: 'Código',
		selector: row => row.codigo,
		sortable: true,
	},
	{
		name: 'Nombre del producto',
		selector: row => row.nombre,
		sortable: true,
	},
	{
		name: 'Descripción',
		selector: row => row.desc,
		sortable: true,
	},
	{
		name: 'Categoría',
		selector: row => row.categoria,
		sortable: true,
	},
	{
		name: 'Precio',
		selector: row => row.precio,
	},
	{
		name: '',
		selector: row => row.acciones,
	},
];