const express = require('express');
const app = express();
const port = 3000;

// Middleware para manejar JSON
app.use(express.json());

// Datos en memoria
const products = [
    { id: 1, name: "Laptop", price: 1200 },
    { id: 2, name: "Mouse", price: 25 },
    { id: 3, name: "Keyboard", price: 45 }
];

// Endpoint de bienvenida al usuario
app.get('/', (req, res) => {
    res.send('Bienvenido a la API de productos. Usa /products para ver los productos.');
});

// Endpoint para obtener todos los productos
app.get('/products', (req, res) => {
    res.json(products);
});

// Endpoint para obtener un producto por ID
app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(product);
});

// Endpoint para agregar un nuevo producto
app.post('/products', (req, res) => {
    const { id, name, price } = req.body;
    
    if (products.some(p => p.id === id)) {
        return res.status(400).json({ error: "El ID ya existe" });
    }
    
    const newProduct = { id, name, price };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
