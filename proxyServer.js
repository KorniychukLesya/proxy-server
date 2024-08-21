const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Обработка CORS для всех запросов
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200); 
    } else {
        next();
    }
});

app.use('/api', createProxyMiddleware({
    
    // Меняем url на свой urj к api
    target: 'https://dev-application.fleetsoft.pro/v3/',
    changeOrigin: true,
    pathRewrite: {
        '^/api': '', 
    }
  
}));

app.listen(3000, () => {
    console.log('Proxy server is running on port 3000');
});
