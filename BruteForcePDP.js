module.exports = {
    // To compare the entire number
    compareNumber: function compareNumber(a, b) {
        return a - b;
    },

    // To find the delta x
    calculateDeltaX: function calculateDeltaX(arr, result) {
        var temp = 0
        var arrcopy = arr.slice()

        for (var i = 0; i < arr.length; i++) {
            for (var j = 1; j < arrcopy.length; j++) {

                temp = Math.abs(arrcopy[j] - arrcopy[0]);
                //console.log("temp: " + temp)
                result.push(temp)
            }

            arrcopy.shift()
        }

        return result;
    },

    quadraticEquation : function quadraticEquation(a,b,c){
            var result = (-1 * b + Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a)
            var result2 = (-1 * b - Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a)
            
        if(result < 0){
            return result2
        }else{
            return result
        }
    },

    /*     combine: function combine(input, len, start) {
    
            const resulto = [];
            resulto.length = 2; //n=2
    
            if (len === 0) {
                console.log(resulto.join(" ")); //process here the result
                return;
            }
            for (let i = start; i <= input.length - len; i++) {
                resulto[resulto.length - len] = input[i];
                combine(input, len - 1, i + 1);
            }
    
            return resulto;
    
        }, */

    combine2: function k_combinations(set, k, ) {
        var i, j, combs, head, tailcombs;

        // There is no way to take e.g. sets of 5 elements from
        // a set of 4.
        if (k > set.length || k <= 0) {
            return [];
        }

        // K-sized set has only one K-sized subset.
        if (k == set.length) {
            return [set];
        }

        // There is N 1-sized subsets in a N-sized set.
        if (k == 1) {
            combs = [];
            for (i = 0; i < set.length; i++) {
                combs.push([set[i]]);
            }
            return combs;
        }

        // Assert {1 < k < set.length}

        // Algorithm description:
        // To get k-combinations of a set, we want to join each element
        // with all (k-1)-combinations of the other elements. The set of
        // these k-sized sets would be the desired result. However, as we
        // represent sets with lists, we need to take duplicates into
        // account. To avoid producing duplicates and also unnecessary
        // computing, we use the following approach: each element i
        // divides the list into three: the preceding elements, the
        // current element i, and the subsequent elements. For the first
        // element, the list of preceding elements is empty. For element i,
        // we compute the (k-1)-computations of the subsequent elements,
        // join each with the element i, and store the joined to the set of
        // computed k-combinations. We do not need to take the preceding
        // elements into account, because they have already been the i:th
        // element so they are already computed and stored. When the length
        // of the subsequent list drops below (k-1), we cannot find any
        // (k-1)-combs, hence the upper limit for the iteration:
        combs = [];
        for (i = 0; i < set.length - k + 1; i++) {
            // head is a list that includes only our current element.
            head = set.slice(i, i + 1);
            // We take smaller combinations from the subsequent elements
            tailcombs = k_combinations(set.slice(i + 1), k - 1);
            // For each (k-1)-combination we join it with the current
            // and store it to the set of k-combinations.
            //for (j = 0; j < tailcombs.length; j++) {

            //console.log("consola " + head.concat(tailcombs[j]));

            /*                 if(head.concat(tailcombs[j]) == '15,47,66,73,73,88,139' )
                            {
                                combs = [];
                                combs.push(head.concat(tailcombs[j]));
                                break
                            }
                            else{
                                combs.push(head.concat(tailcombs[j]));
                            }  */

            for (i = 0; i < set.length - k + 1; i++) {
                // head is a list that includes only our current element.
                head = set.slice(i, i + 1);
                // We take smaller combinations from the subsequent elements
                tailcombs = k_combinations(set.slice(i + 1), k - 1);
                // For each (k-1)-combination we join it with the current
                // and store it to the set of k-combinations.
                for (j = 0; j < tailcombs.length; j++) {
                    combs.push(head.concat(tailcombs[j]));
                }
            }
            //}
        }
        return combs;
    }

};

