angular.isUndefinedOrNull = function(val) {
    return angular.isUndefined(val) || val === null
};

angular.removeFromObjectArray = function(arr, id) {
    arr = arr.filter(function( obj ) {
        return obj.id !== id;
    });

    return arr;
};