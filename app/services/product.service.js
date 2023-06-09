const { ObjectId } = require("mongodb")

class ProductService {
    constructor(client) {
        this.Product = client.db().collection("products")
    }
    // Định nghĩa các phương thức truy xuất csdl sử dụng mongodb API
    // create
    extractProductData(payload) {
        const product = {
            ten: payload.ten,
            gia: payload.gia,
            loai: payload.loai,
            url: payload.url,
            mo_ta: payload.mo_ta,
            cua_hang: payload.cua_hang
		};
        // Xóa các trường undefined
        Object.keys(product).forEach(
            (key) => product[key] === undefined && delete product[key]
        )
        return product;
    }

    async create(payload) {
		
        const product = this.extractProductData(payload)
		await this.Product.insertOne(
            product
        );
        const result = await this.Product.findOne(
            product
        );
		
        return result;
    }

    async find(filter) {
        const cursor = await this.Product.find(filter)
        return await cursor.toArray()
    }

    async findIndex(textsearch) {

        const cursor = await this.Product.find(
            { $text: { $search: textsearch } },
            { score: { $meta: "textScore" }}        // Optional starting in MongoDB 4.4
         ).sort({ score: { $meta: "textScore" } })

        return await cursor.toArray()
    }

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options:"i"}
        })
    }

    async findById(id) {
        return await this.Product.findOne({
            _id : ObjectId.isValid(id) ? new ObjectId(id) : null
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const update = this.extractProductData(payload);
        const result = await this.Product.findOneAndUpdate(
            filter,
            { $set: update},
            {returnDocument: "after"}
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.Product.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    async findFavorite() {
        return await this.find({favorite:true})
    }

    async deleteAll(filter) {
        const result = await this.Product.deleteMany(filter);
        return result.deletedCount;
    }

}

module.exports = ProductService;