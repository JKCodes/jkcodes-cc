var Hash = require('../models/Hash')

module.exports = {
  find: function(params, callback) {
    Hash.find(params, null, {sort: {timestamp: 1}}, function(err, hashes) {
      if (err) {
        callback(err, null)
        return
      }

      callback(null, hashes)
    })
  },

  findById: function(id, callback) {
    Hash.findById(id, function(err, hash) {
      if (err) {
        callback(err, null)
        return
      }

      callback(null, hash)
    })
  },

  create: function(params, callback) {
    Hash.create(params, function(err, hash) {
      if (err) {
        callback(err, null)
        return
      }

      callback(null, hash)
    })
  },

  update: function(id, params, callback) {
    Hash.findByIdAndUpdate(id, params, {new:true},function(err, hash) {
      if (err) {
        callback(err, null)
        return
      }

      callback(null, hash)
    })
  },

  delete: function(id, callback) {
    Hash.findByIdAndRemove(id, function(err) {
      if (err) {
        callback(err)
        return
      }

      callback(null)
    })
  }
}