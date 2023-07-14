import fs from 'fs';

class FileManager {
    constructor (filename='./db.json'){
    this.filename = filename
    
}
getNextId = (list) => {
    return (list.length == 0) ? 1 : list[list.length - 1].id + 1
}
get = async () => {
    return fs.promises.readFile(this.filename, 'utf-8')
    .then(r => JSON.parse(r))
    .catch(e =>{
        return []
    })
}
getById = async (id) => {
    const data = await this.get()
    return data.find(d => d.id == id)

    
}
set = async (data) => {
    const list = await this.get()
    data.id = this.getNextId(list)
    list.push(data)
    await fs.promises.writeFile(this.filename, JSON.stringify(list), { flag: 'w' })
    return data;
}

update = async (id, updatedFields) => {
    const existingProduct = await this.getById(id);
    if (!existingProduct) {
      throw new Error('Product not found');
    }

    const updatedProduct = Object.assign({}, existingProduct, updatedFields, { id: existingProduct.id });
    await this.set(updatedProduct);
    return updatedProduct;
  };
}
export default FileManager