const crypto = require("crypto");
const { DEFAULT_PARTITION_KEY, MAX_PARTITION_KEY_LENGTH } = require("./constants");

exports.getPartitionKey = (event) => {
  let partitionKey = event ? 
          event.partitionKey || crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex") :
          DEFAULT_PARTITION_KEY;

  if (typeof partitionKey === "object") {
    partitionKey = JSON.stringify(partitionKey);
  } else if (typeof partitionKey !== "string"){
    partitionKey = String(partitionKey);
  }

  if (partitionKey.length > MAX_PARTITION_KEY_LENGTH) {
    partitionKey = crypto.createHash("sha3-512").update(partitionKey).digest("hex");
  }
  return partitionKey;
};