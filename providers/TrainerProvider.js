/**
 * Module class constructor. Connect to database.
 * @constructor
 * @param connectionString MongoDB connection string
 * @param collections Name of the collections to handle
 * @author Gyula Szalai <gyszalai@gmail.com>
 */
TrainerProvider = function(db) {
    this.db = db;
}

/**
 * Return all trainers
 * @param callback Callback
 * @author Gyula Szalai <gyszalai@gmail.com>
 */
TrainerProvider.prototype.getAll = function ( callback ) {
    this.db.trainers.find().toArray(function(err, result) {
        if(err || !result) callback(err);
        else callback(null, resultSet);
    });
};

/**
 * Finds an instance in the database and returns it;
 * @param id The unique id of the instance
 * @param callback Callback
 */
TrainerProvider.prototype.find = function(id, callback ){
    this.db.trainers.find({_id: id}, function(err, result){
        if(err) callback(err);
        else callback(null, result);
    });
};

/**
 * Inserts a new instance into the database
 * @param trainer The instance to be inserted
 * @param callback Callback
 * @author Gyula Szalai <gyszalai@gmail.com>
 */
TrainerProvider.prototype.insert = function( trainer, callback ) {
    this.db.trainers.save(trainer, function(err, saved){
        if(err) callback(err);
        else callback(null, saved);
    });
};

exports.TrainerProvider = TrainerProvider;
