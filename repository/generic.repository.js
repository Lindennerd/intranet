function GenericRepository(model) {
    return {
        getAll: function () {
            return model.find({}, function(err, items){
                if(err) throw err;

                return items;
            });
        },

        getById: function(id) {
            return model.findById(id, function(err, item){
                if(err) throw err;
                return item;
            })
        },

        query: async function(query, one) {
            if(one) return await model.findOne(query).exec();
            else return await model.find(query).exec();
        },

        create: async function(modelToCreate) {
            return model.create(modelToCreate)
                .then(function(item){ return item; })
                .catch(function(err) {throw err; });
        },

        update: async function(modelToUpdate) {
            delete modelToUpdate._id;

            return model.updateOne(modelToUpdate)
                .then(function(item){ return item; })
                .catch(function(err) {throw err; });
        },

        delete: async function(idToDelete) {
            return model.deleteOne({_id: idToDelete})
                .then(function(item){ return item; })
                .catch(function(err) {throw err; });
        }
    }

};

module.exports = GenericRepository;