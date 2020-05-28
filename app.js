var express = require('express');
var app = express();

app.use(express.static(__dirname + "/genome.html"));
app.use(express.static(__dirname + "/"));

var path = require('path');
const fileupload = require('express-fileupload');
const fs = require('fs');

var multer = require('multer')
//var upload = multer({ dest: 'uploads/' })


var brute = require('./BruteForcePDP.js');
var partial = require('./PartialDigest.js');


var dnaArray = []
var indexes = []
var indexesComparation = []
var allCombinations = []
var deltasArray = []
var input = []
var minElement = 0
var pathfile;
width = 0
var n;



app.use(fileupload());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

// Ver melhor para que isto serve
app.get('/teste', function (req, res) {

    res.status(200);
    //res.sendFile(__dirname + '/teste.html');




    const array = ["apple", "banana", "lemon", "mango"];

    var resultado = brute.combine2(array, 3);
    console.log(resultado)
    res.send(resultado)
});
// Tests
app.post('/teste', function (req, res) {

    console.log(data.toString());
    console.log("leu");

});

app.get('/', function (req, res) {
    res.status(200);
    res.sendFile(__dirname + '/index.html');
});

app.get('/genome', function (req, res) {
    res.sendFile(__dirname + "/genome.html");
});

/* app.post('/genome', async function (req, res) {

    // Variables
    var file = req.files.myfile;
    var filename = file.name;
    var pathfile = __dirname + '/upload/' + filename;

    // Create folders if they don't exist
    fs.mkdir(__dirname + '/upload', { recursive: true }, (err) => { if (err) throw err; });
    fs.mkdir(__dirname + '/download', { recursive: true }, (err) => { if (err) throw err; });

    await movefile(pathfile, file);

    // Read uploaded file
    var data = fs.readFile(pathfile, 'utf8', async function (err, data) {
        if (err) throw err;

        // Search the occurrences of the inputs in the file
         for (i = 0; i < input.length; i++) {

            await getIndexes(data, input[i])
        } 

        // Sort the Array of Indexes
        //indexes.sort(brute.compareNumber)


        // Sorts the Deltas Array by number
        //deltasArray.sort(brute.compareNumber)



        if (req.body.genometype == "simple") {
        }

        console.log("Teste")
    })

}) */


app.post('/', async function (req, res) {

    // Variables
    var file = req.files.myfile;
    var filename = file.name;
    var pathfile = __dirname + '/upload/' + filename;

    // Create folders if they don't exist
    fs.mkdir(__dirname + '/upload', { recursive: true }, (err) => { if (err) throw err; });
    fs.mkdir(__dirname + '/download', { recursive: true }, (err) => { if (err) throw err; });

    await movefile(pathfile, file);

    // Read uploaded file
    var data = fs.readFile(pathfile, 'utf8', async function (err, data) {
        if (err) throw err;

        // Shows the data of the file in console
        //console.log(data);

        // Save in array all inputs
        input = req.body.input.split(", ")

        // Shows the input in console
        console.log(input)

        // Save first and last index
        var maxElement = data.length - 1
        indexes = [minElement, maxElement]




        // Search the occurrences of the inputs in the file
        for (i = 0; i < input.length; i++) {

            await getIndexes(data, input[i])

            //indexes.push(result)
            //console.log("result " + indexes)
            //result = []
        }

        // Sort the Array of Indexes
        indexes.sort(brute.compareNumber)

        // Calculate all deltas
        brute.calculateDeltaX(indexes, deltasArray)


        // Number of Occurrences
        //n = indexes.length - 2
        var equationC = - (deltasArray.length * 2)
        var n = brute.quadraticEquation(1, -1, equationC)
        n = n - 2

        console.log("N: " + n)

        // Sorts the Deltas Array by number
        deltasArray.sort(brute.compareNumber)



        if (req.body.alglist == "brute") {

            // Print in Console
            console.log("Deltas: " + deltasArray)
            console.log("Indexes: " + indexes)
            console.log("N: " + n)

            // Copies the indexes array but without the first and last element
            indexesComparation = indexes.slice(1, -1)

            // Saves all the combinations in an Array
            allCombinations = brute.combine2(deltasArray, n);

            // Prints in console
            console.log("Size: " + allCombinations.length);
            console.log("IndexesComparation: " + indexesComparation)

            // Searches in the combinations array if the correct solution
            for (var i = 0; i <= allCombinations.length; i++) {
                if (allCombinations[i] == indexesComparation.toString()) {

                    // Saves the solution in a new array
                    dnaArray = allCombinations[i]

                    break;
                }
            }

            // Add the min and max element to the final array
            dnaArray.unshift(minElement)
            dnaArray.push(maxElement)

            // Prints in console
            console.log(dnaArray)
            console.log("finalR: " + dnaArray)

            data = "\t\t\t BRUTE FORCE PDP ALGORITHM \n\n"
            data += "Inputs: " + input + '\n'
            data += "Number of Occurrences: " + n + '\n\n'
            data += "Pairwise Distances: " + deltasArray.toString() + '\n\n'
            data += "Output: " + dnaArray.toString() + '\n'

            //res.send(deltasArray)

            // Create result file
            fs.writeFileSync(__dirname + '/download/result.txt', data, 'utf8', function (err) {
                if (err) console.log('error', err);

                // Download the file
                /*             if (req.body.alglist == "brute") {
                                res.download(__dirname + '/download/' + "result.txt", "result.txt")
                            }
                            else {
                                res.download(__dirname + '/download/' + "result.txt", "result.txt")
                            } */
            });

            res.download(__dirname + '/download/result.txt')
        }
        else {
            arrayL = deltasArray.slice()
            arrayX = []

            width = arrayL[arrayL.length - 1]
            var maxElement = arrayL[arrayL.length - 1]

            arrayL.splice(-1, 1)
            arrayX.push(minElement)
            arrayX.push(maxElement)

            // Starts here the PLACE(L,X)

            var arrayLcopy = []
            var arrayXcopy = []

            arrayXcopy = arrayX.slice()
            arrayLcopy = arrayL.slice()

            partial.place(arrayL, arrayX)
            partial.place2(arrayLcopy, arrayXcopy)

            console.log("ArrayX: " + arrayX)
            console.log("ArrayX2: " + arrayXcopy)


            data = "\t\t\t PARTIAL DIGEST ALGORITHM \n\n"
            data += "Inputs: " + input + '\n\n'
            data += "Number of Occurrences: " + n + ' (not necessary in this algorithm)\n\n'
            data += "Pairwise Distances: " + deltasArray + '\n\n'
            data += "   Output 1: " + arrayX.toString() + '\n'
            data += "   Output 2: " + arrayXcopy.toString() + '\n'

            // Create result file
            fs.writeFileSync(__dirname + '/download/result.txt', data, 'utf8', function (err) {
                if (err) console.log('error', err);

                // Download the file
                /*             if (req.body.alglist == "brute") {
                                res.download(__dirname + '/download/' + "result.txt", "result.txt")
                            }
                            else {
                                res.download(__dirname + '/download/' + "result.txt", "result.txt")
                            } */
            });

            res.download(__dirname + '/download/' + "result.txt")
        }


    });

});

// FALTA COMENTAR
function getIndexes(str, toSearch) {
    for (var pos = str.indexOf(toSearch); pos !== -1; pos = str.indexOf(toSearch, pos + 1)) {
        indexes.push(pos);
    }
    return indexes;
}

// Upload File
async function movefile(pathfile, file) {
    file.mv(pathfile, function (err) {

        if (file) {
            if (err) {
                console.log(err)
            }
            else {
                console.log("File uploaded");
            }
        }
    });
}


app.listen(3000, function () {
    console.log("Listening at port 3000");
})