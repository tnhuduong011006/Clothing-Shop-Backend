const ProductService = require("../services/product.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const { ObjectId } = require("mongodb")

// Tạo và lưu một liên hệ mới
exports.create = async (req, res, next) => {
    if (!req.body?.ten ) {
        return next(new ApiError(400, "Name can not be empty"))
    }

    try {
        const productService = new ProductService(MongoDB.client)
        const document = await productService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the product")
        );
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const productService = new ProductService(MongoDB.client)
		const name = req.query.name
		const typeid = req.query.typeid
		const typename = req.query.typename
		const textsearch = req.query.textsearch
		
        if (name) {
            documents = await productService.find({ten:name})
        } else
		if (textsearch) {
            documents = await productService.find({$text : {$search : textsearch}})
        } else
		if (typename) {
            documents = await productService.find({'loai.ten' : typename})
        } else
		if (typeid) {
            documents = await productService.find({'loai._id' : ObjectId.isValid(typeid) ? new ObjectId(typeid) : null})
        }else {
			documents = await productService.find({})
		}
		
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving products")
        );
    }

    return res.send(documents)
};

exports.deleteAllByType = async (req, res, next) => {
	let count = 0;
    try {
        const productService = new ProductService(MongoDB.client)
		const typeid = req.query.typeid
		
        count = await productService.deleteAll({'loai._id' : ObjectId.isValid(typeid) ? new ObjectId(typeid) : null})
		
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Could not delete product with loai._id=${typeid}`
            )
        );
    }

};

exports.findOne = async (req, res, next) => {

    try {
        const productService = new ProductService(MongoDB.client)
        const document = await productService.findById(req.params.id)
        if(!document) {
            return next(new ApiError(404, "Product not found"))
        }
        return res.send(document)
    } catch (error) {
        return next(
            new ApiError(500, `Error retrieving product with id=${req.params.id}`)
        )
    }
}

exports.update = async(req, res, next) => {
    if (Object.keys(req.body).length===0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        console.log(req.body)
        const productService = new ProductService(MongoDB.client)

        const document = await productService.update(req.params.id, req.body);

        if (!document) {
            return next(new ApiError(404, "Product not found"));
        }
        return res.send({message: "Product was updated successfully"});
    } catch (error) {
        return next(
            new ApiError(500, `Error updating product with id=${req.params.id}`)
        );
    }
};

// exports.update = (req, res) => {
//     res.send({message: "update handler"});
// }

exports.delete = async(req, res, next) =>{
    try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.delete(req.params.id);

        if (!document) {
            return next(new ApiError(404, "Product not found"));
        }
        return res.send({message: "Product was deleted successfully"})
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Could not delete product with id=${req.params.id}`
            )
        );
    }
};

// exports.delete = (req, res) => {
//     res.send({message: "delete handler"});
// };

exports.findAllFavorite = async (_req, res, next) => {
    try {
        const productService = new ProductService(MongoDB.client);
        const documents = await productService.findFavorite();
        return res.send(documents);
    } catch (error) {
        return next(
            new ApiError(
                500,
                "An error occurred while retrieving favorite product"
            )
        );
    }
};

exports.deleteAll = async (_req, res, next) => {
    try {
        const productService = new ProductService(MongoDB.client);
        const deletedCount = await productService.deleteAll();
        return res.send({
            message: `${deletedCount} products were deleted successfully`,
        });
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while removing all products")
        );
    }
};

























