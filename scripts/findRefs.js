var _ = require('lodash')
var fs = require('fs')

var tsRefRegex = /path\s*=\s*["'](\.\.\/(src|test|examples).+\.ts)/g;

function getCapturingGroups(targetStr, regex, i) {
    var references = [];
    var matched;
    while (matched = regex.exec(targetStr)) {
        var currRef = matched[i];
        references.push(currRef);
    }
    return references;
}

function transformRefToInclude(ref) {
    var srcToGen = ref.replace("../", "target/gen/");
    var tsToJs = srcToGen.replace(".ts", ".js");
    return tsToJs;
}

module.exports = function getIncludesFromTsRefsFile(fileName) {
    var contents = fs.readFileSync(fileName).toString();
    var refs = getCapturingGroups(contents, tsRefRegex, 1);
    var includes = refs.map(transformRefToInclude);
    return includes;
}