const { getPartitionKey } = require("./dpk");
const { DEFAULT_PARTITION_KEY, MAX_PARTITION_KEY_LENGTH } = require("./constants");

const crypto = require("crypto");

describe("getPartitionKey", () => {
  it("Returns the default partition key when given no input", () => {
    const partitionKey = getPartitionKey();
    expect(partitionKey).toBe(DEFAULT_PARTITION_KEY);
  });

  it("should return the partitionKey from the event if present and contains partitionKey", () => {
    const event = { partitionKey: "123" };
    const result = getPartitionKey(event);
    expect(result).toBe("123");
  });

  it("should calculate the hash if partitionKey is not present in the event", () => {
    const event = { data: "example" };
    const hash = crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex");
    const result = getPartitionKey(event);
    expect(result).toBe(hash);
  });

  it("should stringify an object partitionKey", () => {
    const event = { partitionKey: { id: 1 } };
    const result = getPartitionKey(event);
    expect(result).toBe(JSON.stringify({ id: 1 }));
  });

  it("should convert a non-string partitionKey to a string", () => {
    const event = { partitionKey: 123 };
    const result = getPartitionKey(event);
    expect(result).toBe("123");
  });

  it("should calculate the hash if partitionKey length exceeds MAX_PARTITION_KEY_LENGTH", () => {
    const longKey = "a".repeat(MAX_PARTITION_KEY_LENGTH + 1);
    const hash = crypto.createHash("sha3-512").update(longKey).digest("hex");
    const event = { partitionKey: longKey };
    const result = getPartitionKey(event);
    expect(result).toBe(hash);
  });
});
