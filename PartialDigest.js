var brute = require('./BruteForcePDP.js');

module.exports = {


    // Calculates all distances between point y and all other points in the set X
    calculateDistances: function calculateDistances(y, arrayX) {

        var result = []

        for (var i = 0; i < arrayX.length; i++) {
            result.push(Math.abs(y - arrayX[i]))
        }
        result.sort()

        return result;
    },

    // If an array contains all elements of an other array
    arrayContainsArray: function arrayContainsArray(superset, subset) {
        if (0 === subset.length || superset.length < subset.length) {
            return false;
        }
        for (var i = 0; i < subset.length; i++) {
            if (superset.indexOf(subset[i]) === -1) return false;
        }
        return true;
    },

    removeItemOnce: function removeItemOnce(arr, value) {
        var index = arr.indexOf(value);
        if (index > -1) {
            arr.splice(index, 1);
        }
        return arr;
    },

    // Partial Algorithm
    place: function place(arrayL, arrayX) {

        if (arrayL.length == 0) {
            //console.log("Array L is empty")
            return arrayX
        }

        // Get last element of array and remove it
        maxElement = arrayL[arrayL.length - 1]
        //arrayL.splice(-1, 1)

        // Calculates all distances between point y and all other elements of arrayX
        var calDistances = module.exports.calculateDistances(maxElement, arrayX)
        var calDistancesInv = module.exports.calculateDistances(Math.abs(width - maxElement), arrayX)

        // Check if calDistances is a subset of arrayL
        if (module.exports.arrayContainsArray(arrayL, calDistances)) {

            for (i = 0; i < calDistances.length; i++) {
                module.exports.removeItemOnce(arrayL, calDistances[i])
            }

            arrayX.push(maxElement)
            arrayX.sort(brute.compareNumber)

            place(arrayL, arrayX)
        }

        // Check if calDistancesInv is a subset of arrayL
        if (module.exports.arrayContainsArray(arrayL, calDistancesInv)) {

            //maxElement = arrayL[arrayL.length - 1]

            //var calDistances = module.exports.calculateDistances(Math.abs(width - maxElement), arrayX)

            for (i = 0; i < calDistancesInv.length; i++) {
                module.exports.removeItemOnce(arrayL, calDistancesInv[i])
            }

            arrayX.push(Math.abs(width - maxElement))
            arrayX.sort(brute.compareNumber)

            place(arrayL, arrayX)

        }
    },
// Partial Algorithm
    place2: function place2(arrayL, arrayX) {

        if (arrayL.length == 0) {
            //console.log("Array L is empty")
            return arrayX
        }

        // Get last element of array and remove it
        maxElement = arrayL[arrayL.length - 1]
        //arrayL.splice(-1, 1)

        // Calculates all distances between point y and all other elements of arrayX

        var calDistances = module.exports.calculateDistances(maxElement, arrayX)
        var calDistancesInv = module.exports.calculateDistances(Math.abs(width - maxElement), arrayX)

        // Check if calDistancesInv is a subset of arrayL
        if (module.exports.arrayContainsArray(arrayL, calDistancesInv)) {

            //var calDistances = module.exports.calculateDistances(Math.abs(width - maxElement), arrayX)

            for (i = 0; i < calDistancesInv.length; i++) {
                module.exports.removeItemOnce(arrayL, calDistancesInv[i])
            }

            arrayX.push(Math.abs(width - maxElement))
            arrayX.sort(brute.compareNumber)

            place2(arrayL, arrayX)
        }

        // Check if calDistances is a subset of arrayL
        if (module.exports.arrayContainsArray(arrayL, calDistances)) {

            for (i = 0; i < calDistances.length; i++) {
                module.exports.removeItemOnce(arrayL, calDistances[i])
            }

            arrayX.push(maxElement)
            arrayX.sort(brute.compareNumber)

            place2(arrayL, arrayX)
        }
    },

};

