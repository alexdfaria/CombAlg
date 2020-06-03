module.exports = {

    // Verify if two arrays are equal
    arraysEqual: function arraysEqual(a, b) {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length != b.length) return false;

        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    },

    // Reverse only a part of the array between start and end
    reversePart: function reversePart(array, start, end) {
        while (start < end) {
            let t = array[start];
            array[start++] = array[end];
            array[end--] = t;
        }
    },

    // Reverse only a part of the array between start (inclusive) and end (exclusive)
    reversePart2: function reversePart2(array, start, end) {

        var tempI = []
        var tempR = []
        var tempF = []

        for (var i = 0; i < start; i++) {
            tempI[i] = array[i]
        }

        var t = 0

        for (var h = start; h < end; h++) {

            tempR[t] = array[h]
            t++
        }

        t = 0

        for (var j = end; j < array.length; j++) {

            tempF[t] = array[j]
            t++
        }

        var invArray = tempI.concat(tempR.reverse(), tempF)

        return invArray
    },

    //returns True if the sequences in not strictly increasing by 1 
    hasBreakpoints: function hasBreakpoints(array) {

        for (var i = 1; i < array.length; i++) {
            if (array[i] != (array[i - 1] + 1))
                return true
        }

        return false
    },

    // 
    getStrips: function getStrips(array) {

        var deltas = []
        var increasing = []
        var decreasing = []
        var others = []
        var start = 0

        for (var i = 0; i < array.length - 1; i++) {
            deltas.push((array[i + 1] - array[i]))
        }
        console.log("deltas: " + deltas)
        //console.log(deltas)

        var deltas2 = []

        // Enumerate
        for (const [index, element] of deltas.entries()) {
            //console.log(index, element);
            deltas2.push([index, element])
        }

        //console.log(deltas2)

        for (var i = 0; i < deltas.length; i++) {

            if (Math.abs(deltas2[i][1]) == 1 && deltas2[i][1] == deltas[start]) {
                continue
            }
            if (Math.abs(deltas[i] == 1)) {
                continue
            }
            if (start > 0) {
                if (deltas[start] == 1) {
                    increasing.push([start, i + 1])
                } else if (deltas[start] == -1) {
                    decreasing.push([start, i + 1])
                } else {
                    others.push([start, i + 1])
                }
            }

            start = (i + 1)

            /*             console.log("I: " + i)
                        console.log("start: " + start) */
        }

        return { increasing: increasing, decreasing: decreasing, others: others }


        /* def getStrips(seq):
    """ find contained intervals where sequence is ordered, and return intervals
    in as lists, increasing and decreasing. Single elements are considered
    decreasing. "Contained" excludes the first and last interval. """
    deltas = [seq[i+1] - seq[i] for i in xrange(len(seq)-1)]
    increasing = list()
    decreasing = list()
    start = 0
    for i, diff in enumerate(deltas):
        if (abs(diff) == 1) and (diff == deltas[start]):
            continue
        if (start > 0):
            if deltas[start] == 1:
                increasing.append((start, i+1))
            else:
                decreasing.append((start, i+1))
        start = i+1
    return increasing, decreasing */

    },

    // Pick the best reversal
    pickReversal: function pickReversal(array, format, increasing, others) {

        var reversal = [-1, []]
        var left = []
        var right = []
        var arrayTemp = []
        var arrayTemp2 = []
        var arrayTemp3 = []

        arrayTemp = format
        arrayTemp2 = others
        arrayTemp3 = increasing

        for (var i = 0; i < arrayTemp.length; i++) {
            left[i] = arrayTemp[i][0]
            right[i] = arrayTemp[i][1]
        }

        /*         console.log(left)
                console.log(right)
                console.log(others) */

        for (const i of left) {
            for (const j of right) {

                var iHA = parseInt(i)
                var jHA = parseInt(j)
                var tema = jHA - 1

                if (iHA >= tema) {
                    //console.log("sai")
                    //console.log("i: " + iHA + " j: " + jHA  )
                    //console.log(iHA == tema )
                    continue
                }



                var breakpointsRemoved = 0

                if (Math.abs((array[j - 1] - array[i - 1])) == 1) {
                    breakpointsRemoved += 1
                }
                if (Math.abs((array[j] - array[i])) == 1) {
                    breakpointsRemoved += 1
                }

                if (breakpointsRemoved > reversal[0]) {
                    reversal[0] = breakpointsRemoved
                    reversal[1] = [i, j]
                    //console.log("primeiro r: " + reversal[1])
                }


            }
        }

        if (reversal[0] == 0 && others) {

            for (var i = 0; i < others.length; i++) {
                left[i] = others[i][0]
                //right[i] = others[i][1]
            }

            var number = reversal[1][1] - 1


            for (const a of left) {

                //console.log(array[a])
                //console.log(number)

                if (array[a] == array[number] - 1) {
                    /*                     console.log(array[a])
                                        console.log("number: "+ number)
                                        console.log("a: "+ a) */

                    reversal[0] = 1

                    if (number < a) {
                        reversal[1][0] = number + 1
                        reversal[1][1] = a + 1
                    }
                    else {
                        reversal[1][0] = a + 1
                        reversal[1][1] = number + 1
                    }

                    //console.log(reversal)

                }

            }
        }

        if (reversal[0] == 0 && increasing) {

            for (var i = 0; i < increasing.length; i++) {
                left[i] = increasing[i][1]
                //right[i] = others[i][1]
            }

            var number = reversal[1][1] - 1

            /*             console.log(number)
                        console.log(array[number])
                        console.log(left) */

            //console.log("increa")

            for (const a of left) {

                //console.log(array[a])
                //console.log(number)

                if (array[a - 1] == array[number] - 1) {
                    /*                     console.log(array[a])
                                        console.log("number: "+ number)
                                        console.log("a: "+ a) */

                    reversal[0] = 1

                    if (number < a) {
                        reversal[1][0] = number
                        reversal[1][1] = a
                    }
                    else {
                        reversal[1][0] = a
                        reversal[1][1] = number + 1
                    }

                    //console.log(reversal)

                }



                //if(array[a])

                /*                 if()
                                    array[a] - 1 */
            }

        }

        return reversal;
    },

    /* def pickReversal(seq, strips):
    """ test each decreasing interval to see if it leads to a reversal that
    removes two breakpoints, otherwise, return a reversal that removes only one """
    reversal = (-1, None)
    left = [i for i, j in strips]
    right = [j for i, j in strips]
    for i in left:
        for j in right:
            if (i >= j-1):
                # skip invalid intervals and
                # those with only one element
                continue
            breakpointsRemoved = 0
            if (abs(seq[j-1] - seq[i-1]) == 1):
                # reversal will remove left breakpoint
                breakpointsRemoved += 1
            if (abs(seq[j] - seq[i]) == 1):
                # reversal will remove right breakpoint
                breakpointsRemoved += 1
            if (breakpointsRemoved > reversal[0]):
                reversal = (breakpointsRemoved, (i,j))
    print "%d:" % reversal[0],
    return reversal[1] */

};

