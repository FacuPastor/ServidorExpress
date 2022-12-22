import express from 'express'
import ProductManager from './ProductManager.js'


const app = express()
  app.use(express.urlencoded({
  extended: true
}))


app.get('/', (req, res) => {
  res.send('<h1 style="color:blue">Bienvenido a Shoes Point</h1>')
})

app.get('/products', (req, res) => {
  let limit = parseInt(req.query.limit)
  try {
    if (limit === 0 || !limit) {
      res.json(ProductManager.getProducts())
    } else {
      const arrayOriginal = ProductManager.getProducts()
      let arrayConLimite = arrayOriginal.slice(0, limit)
      res.json(arrayConLimite)
    }
  } catch (error) {
    console.log("Error", error)
    res.send("Ha ocurrido un error")
  }

})

app.get('/products/:pid', async (req, res) => {
  let pid = parseInt(req.params.pid);
  let response = await ProductManager.getElementById(pid)
  console.log(response)
  res.json(response || {
    "Error": "El producto no ha sido encontrado"
  })
})

app.get('*', (req, res) => {
  res.send('<h1 style="color:red">Pagina no encontrada: Error 404</h1>')
})



app.listen(8080, () => {
  console.log("Listening on port 8080")
})