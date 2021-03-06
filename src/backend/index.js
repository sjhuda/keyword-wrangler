'use string';

var Percolator = require('percolator').Percolator;
var dbSession = require('../../src/backend/dbSession.js');

var port = 8080;
var server = Percolator({'port': port, 'autoLink': false});

server.route('/api/keywords', {
    GET: function (req, res) {
        dbSession.fetchAll('SELECT id, value, categoryID FROM keyword ORDER BY id', function(err, rows) {
            if (err) {
                console.log(err);
                res.status.internalServerError(err);
            } else {
                res.collection(rows).send();
            }
        });
    }
});

server.listen(function() {
    console.log('Server started and listening on port', port);
});
