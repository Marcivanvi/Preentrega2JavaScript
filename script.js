let carrito = [];
const productos =
[
    {
        id: 1,
        nombre: "Buzo",
        tipo: "buzo",
        descripcion: "Un buzo que re va con vos",
        precio: 1200,
        talle: "L",
        cantidad:0
    },

    {
        id: 2,
        nombre: "Remera",
        tipo: "remera",
        descripcion: "Una remera que re va con vos",
        precio: 1000,
        talle: "L",
        cantidad:0
    },

    {
        id: 3,
        nombre: "Camisa",
        tipo: "camisa",
        descripcion: "Una camisa que re va con vos",
        precio: 1500,
        talle: "S",
        cantidad:0
    },

    {
        id: 4,
        nombre: "Zapatos",
        tipo: "zapatos",
        descripcion: "Unos Zapatos que re van con vos",
        precio: 16000,
        talle: 42,
        cantidad:0
    },

    {
        id: 5,
        nombre: "Lentes",
        tipo: "lentes",
        descripcion: "Unos lentes que re van con vos",
        precio: 8000,
        talle: 4,
        cantidad:0
    },

    {
        id: 6,
        nombre: "Zapatillas",
        tipo: "zapatillas",
        descripcion: "Unas zapatillas que re van con vos",
        precio: 12000,
        talle: 40,
        cantidad:0
    }
]

let ordenarMenorMayor = () => {
    productos.sort((a, b) => a.precio - b.precio)
    mostrarListaOrdenada()
}

let ordenarMayorMenor = () => {
    productos.sort((a, b) => b.precio - a.precio)
    mostrarListaOrdenada()
}

let mostrarListaOrdenada = () => {
    let listaOrdenada = productos.map(producto => {
        return '- '+producto.nombre+' $'+producto.precio
    });
    alert('Lista de precios:'+'\n\n'+listaOrdenada.join('\n'))
    comprarProductos(listaOrdenada)
};

let comprarProductos = (listaDeProductos) => {
    let otroProducto = false;
    let productoNombre = '';
    let productoCantidad = 0;

    do {
        productoNombre = prompt('¿Que producto desea comprar?'+'\n\n'+listaDeProductos.join('\n'));
        productoCantidad = parseInt(prompt('¿Cuántos querés comprar?'));

        const producto = productos.find(producto => producto.nombre.toLowerCase() === productoNombre.toLowerCase())

        if (producto) {
            agregarAlCarrito(producto, producto.id, productoCantidad)
        } else {
            alert('El producto no se encuentra en el catálogo')
        }

        otroProducto = confirm('¿Desea agregar otro producto?')
    } while (otroProducto);

confirmarCompra();
};

let agregarAlCarrito = (producto, productoId, productoCantidad) => {
    let productoRepetido = carrito.find(producto => producto.id === productoId);
    if (productoRepetido) {
        productoRepetido.cantidad += productoCantidad
    } else {
        producto.cantidad += productoCantidad
        carrito.push(producto)
    }
};

let eliminarProductoCarrito = (productoNombre) => {
    carrito.forEach((producto, index) => {
        if (producto.nombre.toLowerCase() === productoNombre) {
            if (producto.cantidad > 1) {
                producto.cantidad--
            } else {
                carrito.splice(index, 1)
            }
        }
    })
    confirmarCompra()
};

let confirmarCompra = () => {
    let listaProductos = carrito.map(producto => {
        return '- '+producto.nombre+' | Cantidad: '+producto.cantidad
    });

    let confirmar = confirm('Checkout: '
        +'\n\n'+listaProductos.join('\n')
        +'\n\nPara continuar presione "Aceptar" sino "Cancelar" para eliminar productos del carrito'
    );

    if (confirmar) {
        finalizarCompra(listaProductos)
    } else {
        let productoAEliminar = prompt('Ingrese el nombre del producto a eliminar:');
        eliminarProductoCarrito(productoAEliminar)
    }
};

let finalizarCompra = (listaProductos) => {
    let cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0)
    let precioTotal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0)
    alert('Detalle de su compra:'
        +'\n\n'+listaProductos.join('\n')
        +'\n\nTotal de productos: '+cantidadTotal
        +'\n\nEl total de la compra es: '+precioTotal
        +'\n\nGracias por su compra!'
    )
};

let comprar = () => {
    let productosBaratos = confirm('¿Querés ordenar la lista de productos del más barato al más caro?');

    if (productosBaratos) {
        ordenarMenorMayor();
    } else {
        ordenarMayorMenor();
    }
};

comprar();