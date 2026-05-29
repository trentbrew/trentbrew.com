const utils = {
  getUnique: (arr) => Array.from(new Set(arr)),

  getUniqueKeys: (arr, key) => {
    var flags = [],
      output = [],
      l = arr.length,
      i;
    for (i = 0; i < l; i++) {
      if (flags[arr[i][key]]) continue;
      flags[arr[i][key]] = true;
      output.push(arr[i][key]);
    }
    return output;
  },

  sort2d: (arr, index) => arr.sort((a, b) => a[index] - b[index]),

  random: (min, max) => Math.random() * (max - min) + min,

  timeString: (timestamp, style) => {
    return new Date(timestamp).toLocaleTimeString("en", {
      timeStyle: style || "long",
      hour12: true,
      timeZone: "UTC",
    });
  },

  timeDifference: (timestamp1, timestamp2, unit) => {
    if (unit === "ms") return Math.abs(timestamp1 - timestamp2);
    else if (unit === "s") return Math.abs((timestamp1 - timestamp2) / 1000);
    else if (unit === "m")
      return Math.abs((timestamp1 - timestamp2) / 1000 / 60);
    else if (unit === "h")
      return Math.abs((timestamp1 - timestamp2) / 1000 / 60 / 60);
    else if (unit === "d")
      return Math.abs((timestamp1 - timestamp2) / 1000 / 60 / 60 / 24);
    else return Math.abs(timestamp1 - timestamp2);
  },

  logMatches: (a, b) => {
    console.log(a + " == " + b + " ? " + (a == b ? "✅" : "⛔️"));
  },
};

export default utils;
