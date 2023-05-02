const TypeService = require("../services/type.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

// Tạo và lưu một liên hệ mới
exports.create = async (req, res, next) => {
    if (!req.body?.ten ) {
        return next(new ApiError(400, "Name can not be empty"))
    }

    try {
        const typeService = new TypeService(MongoDB.client)
        const document = await typeService.create(req.body);
        console.log(req.body)
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the type")
        );
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const typeService = new TypeService(MongoDB.client)
        const { name } = req.query
        if (name) {
            documents = await typeService.find({ten:name})
        } else {
            documents = await typeService.find({})
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving types")
        );
    }

    return res.send(documents)
};

exports.findOne = async (req, res, next) => {

    try {
        const typeService = new TypeService(MongoDB.client)
        const document = await typeService.findById(req.params.id)
        if(!document) {
            return next(new ApiError(404, "Type not found"))
        }
        return res.send(document)
    } catch (error) {
        return next(
            new ApiError(500, `Error retrieving type with id=${req.params.id}`)
        )
    }
}

exports.update = async(req, res, next) => {
    if (Object.keys(req.body).length===0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        console.log(req.body)
        const typeService = new TypeService(MongoDB.client)

        const document = await typeService.update(req.params.id, req.body);

        if (!document) {
            return next(new ApiError(404, "Type not found"));
        }
        return res.send({message: "Type was updated successfully"});
    } catch (error) {
        return next(
            new ApiError(500, `Error updating type with id=${req.params.id}`)
        );
    }
};

// exports.update = (req, res) => {
//     res.send({message: "update handler"});
// }

exports.delete = async(req, res, next) =>{
    try {
        const typeService = new TypeService(MongoDB.client);
        const document = await typeService.delete(req.params.id);

        if (!document) {
            return next(new ApiError(404, "Type not found"));
        }
        return res.send({message: "Type was deleted successfully"})
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Could not delete type with id=${req.params.id}`
            )
        );
    }
};

// exports.delete = (req, res) => {
//     res.send({message: "delete handler"});
// };

exports.findAllFavorite = async (_req, res, next) => {
    try {
        const typeService = new TypeService(MongoDB.client);
        const documents = await typeService.findFavorite();
        return res.send(documents);
    } catch (error) {
        return next(
            new ApiError(
                500,
                "An error occurred while retrieving favorite type"
            )
        );
    }
};

exports.deleteAll = async (_req, res, next) => {
    try {
        const typeService = new TypeService(MongoDB.client);
        const deletedCount = await typeService.deleteAll();
        return res.send({
            message: `${deletedCount} types were deleted successfully`,
        });
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while removing all types")
        );
    }
};

























