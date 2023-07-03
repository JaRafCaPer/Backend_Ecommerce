import FileManager from "./file.manager.js"

 export default class ProductManager extends FileManager {

    constructor() {
        super('./products.json')
    }

    create = async (data) => {
        const { title, description, code, price, stock, category, thumbnails } = data;
    
        // Obtenemos la data
        const currentData = await this.get();
    
        // Generamos un id usando getNextId de file.manager
        const id = this.getNextId(currentData);
    
    
        
        const product = {
          id,
          title,
          description,
          code,
          price,
          status: true,
          stock,
          category,
          thumbnails: thumbnails || [],
        };
    
        const result = await this.set(product);
        return result;
      }

    list = async () => {
        const result = await this.get()
        return result
    }
}
