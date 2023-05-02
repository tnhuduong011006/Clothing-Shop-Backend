const { ObjectId } = require("mongodb")

class TypeService {
    constructor(client) {
        this.Type = client.db().collection("types")
    }
    // Định nghĩa các phương thức truy xuất csdl sử dụng mongodb API
    // create
    extractTypeData(payload) {
        const type = {
            ten: payload.ten
        };
        // Xóa các trường undefined, Object không có s
        Object.keys(type).forEach(
            (key) => type[key] === undefined && delete type[key]
        )
        return type;
    }

    async create(payload) {
        const type = this.extractTypeData(payload)
		await this.Type.insertOne(
            type
        );
        const result = await this.Type.findOne(
            type
        );
		
        return result;
    }

    async find(filter) {
        const cursor = await this.Type.find(filter)
        return await cursor.toArray()
    }

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options:"i"}
        })
    }

    async findById(id) {
        return await this.Type.findOne({
            _id : ObjectId.isValid(id) ? new ObjectId(id) : null
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        };
        const update = this.extractTypeData(payload);
        const result = await this.Type.findOneAndUpdate(
            filter,
            { $set: update},
            {returnDocument: "after"}
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.Type.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    async findFavorite() {
        return await this.find({favorite:true})
    }

    async deleteAll() {
        const result = await this.Type.deleteMany({});
        return result.deletedCount;
    }

}

module.exports = TypeService;