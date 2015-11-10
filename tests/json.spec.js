var assert   = require('assert');
var validate = require('../index');

describe('JSON', function(){

	var file = {
		name: 'dataset_description.json',
		relativePath: '/dataset_description.json'
	};

	it('should catch missing closing brackets', function(){
		validate.JSON(file, '{', function (issues) {
			assert(issues && issues.length > 0);
		});
	});

	it('sidecars should have key/value pair for "RepetitionTime" expressed in seconds', function(){
		var jsonObj = '{"RepetitionTime": 1.2, "echo_time": 0.005, "flip_angle": 90}';
		validate.JSON(file, jsonObj, function (issues) {
			assert(issues.length === 0);
		});
		var jsonObjInval = '{"RepetitionTime": 1200, "echo_time": 0.005, "flip_angle": 90}';
		validate.JSON(file, jsonObjInval, function (issues) {
			assert(issues && issues.length === 1);
		});
	});

});
