module.exports = {
  chunkfy(array, chunkSize) {
    var index = 0;
    var arrayLength = array.length;
    var tempArray = [];

    for (index = 0; index < arrayLength; index += chunkSize) {
      const myChunk = array.slice(index, index + chunkSize);
      tempArray.push(myChunk);
    }

    return tempArray;
  },

  async sleep(ms) {
    return new Promise((res) => setTimeout(res, ms));
  },

  random(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  },
};
