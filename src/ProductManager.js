import fs from 'fs'

class ProductManager {
  constructor(path) {
    this.path = path
    fs.existsSync(this.path) ? this.products = JSON.parse(fs.readFileSync(this.path, 'utf-8')) : this.products = [];
  }

  async addProduct (marca, modelo, precio, img, stock) {
    let producto = {
      'marca': marca,
      'modelo': modelo,
      'precio': precio,
      'img': img,
      'stock': stock,
    }

    this.products.length === 0 ? producto["id"] = 1 : producto["id"] = this.products[this.products.length - 1]["id"] + 1
    let encontrado = this.products.some(elemento => elemento.code === code)

    if (encontrado) console.warn('Cuidado! Producto repetido! \n')
    else {
      this.products.push(producto)
      await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'))
    }
  }

  getProducts = () => {
    return this.products
  }

  getElementById = (id) => {
    let producto = this.products.find(el => el.id === id)
    return producto 
  }


  async updateProduct(id, campo, nuevo) {

    let index = this.products.findIndex(element => element.id === id)
    let campoValido = Object.keys(this.products[index]).some(el => el === campo)
    if (campo === 'id') {
      console.error('Error de actualización: no puede modificar el ID del producto\n')
    } else if (!campoValido) {
      console.error('Error de actualización: elija un campo valido\n')
    } else {
      this.products[index][campo] = nuevo;
      await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'))
    }
  }

  async deleteProduct(id) {
    let prodEncontrado = this.products.some(el => el.id === id)
    if (prodEncontrado) {
      this.products = this.products.filter(el => el.id !== id)
      await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'))
      console.log('El producto ha sido eliminado \n')
    } else {
      console.error('El producto no se encuentra')
    }
  }
}


// Pruebas

const manager = new ProductManager('./zapatillas.json')
export default new ProductManager('./zapatillas.json')
