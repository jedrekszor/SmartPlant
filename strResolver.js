function resolveString(toResolve){

    var index = toResolve.indexOf("_");  // Gets the first index where a floor (_) occours
    var flowerName = toResolve.substr(0, index); // gets 1st part - flower name
    var humidity = toResolve.substr(index + 1); //gets 2nd part - humidity

    return [flowerName , humidity];
}

module.exports.resolveString = resolveString;