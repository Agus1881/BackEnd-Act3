const fs = require("fs")
const path = require("path")

class ProductManager {

    constructor(path) {
        this.path = path
    }

    addProduct({ title, description, price, thumbnail, code, stock }) {
        if (!title, !description, !price, !thumbnail, !code, !stock) {
            console.error("se requiere completar los campos")
            return
        }



        const newProduct = {
            id: this.id++,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        }
        const productCode = this.products.find((item) => item.code === code)

        if (productCode) {
            console.error("error, ese codigo ya existe.")
            return
        }

        this.products.push(newProduct)
        console.log("producto añadido")
    }

    
    getProducts () {
        return obtainJSON(this.path);
    }

    getProductById(id) {
        this.path.forEach(product => {
            if (product.id === id) {
                console.log(product);
                return;
            } else {
                console.error('Not found');
            }
        });
    };
}

const obtainJSON = async (path) => {
    if (!fs.existsSync(path)) {
        return []
    }
    const info = await fs.promises.readFile(path, "utf-8")
    return JSON.parse(info)
}

const saveJSON = (path, data) => {
    const info = JSON.stringify(data, null)
    return fs.promises.writeFile(path, info, "utf-8")
}

const manager = new ProductManager()

async function addProduct() {
    console.log(await ProductManager.getProducts)
}

/* manager.addProduct({ title: 'remera', description: 'ropa', price: 3000, thumbnail: 'imagen', code: 'a1', stock: 7 }) */

console.log(manager.getProducts())
/* console.log(manager.getProductById(0)) */