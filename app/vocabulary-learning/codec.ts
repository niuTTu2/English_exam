/** Lossless JSON dictionary encoding. No history, field or context is truncated. */
const fields = new Set(["vocabularyMemories", "vocabularyAttempts", "vocabularySessions", "vocabularySettings", "vocabularyQueueState", "vocabularyMigration"]);
const envelopeKey = "vocabularyEnvelope";
const record = (value: unknown): value is Record<string, unknown> => Boolean(value) && typeof value === "object" && !Array.isArray(value);
type Encoded = number | boolean | null | Encoded[];
type Envelope = { version: 1; atoms: Array<[number, string]>; strings: number[][]; shapes: number[][]; value: Encoded };
const MAX_DICTIONARY_CHARS = 20_000_000;
const MAX_DICTIONARY_ENTRIES = 250_000;

export function packVocabularySnapshot<Snapshot>(snapshot: Snapshot): Snapshot {
  if (!record(snapshot)) return snapshot;
  if (Object.hasOwn(snapshot, envelopeKey)) throw new Error("词汇封包尚未解码，已停止写回。");
  const vocabulary = Object.fromEntries(Object.entries(snapshot).filter(([key, value]) => fields.has(key) && value !== undefined));
  if (!Object.keys(vocabulary).length) return snapshot;
  const unique = new Set<string>();
  let nodes = 0;
  function collect(value: unknown, depth = 0) {
    nodes += 1;
    if (depth > 100 || nodes > 2_000_000) throw new Error("词汇封包结构超出安全范围，原始记录已保留。");
    if (typeof value === "string") unique.add(value);
    else if (Array.isArray(value)) value.forEach(item => collect(item, depth + 1));
    else if (record(value)) for (const [key, entry] of Object.entries(value)) {
      if (entry !== undefined) { unique.add(key); collect(entry, depth + 1); }
    }
  }
  collect(vocabulary);
  const words = [...unique].sort();
  if (words.length > MAX_DICTIONARY_ENTRIES || words.reduce((total, word) => total + word.length, 0) > MAX_DICTIONARY_CHARS) throw new Error("词汇封包超出安全展开容量，原始记录已保留。");
  const dictionary = new Map(words.map((word, index) => [word, index]));
  // Attempts are sessionId + ':' + queueItemId; queues also contain the memoryId.
  // Reuse exact known suffixes, without assuming an ID schema or changing any ID.
  const pieces = words.map(word => {
    if (word.length < 40) return [word];
    for (let index = 0; index < word.length - 20; index += 1) {
      if (!/[:|\-/]/.test(word[index])) continue;
      const suffix = word.slice(index + 1);
      if (!unique.has(suffix)) continue;
      const prefix = word.slice(0, index);
      return unique.has(prefix) ? [prefix, word[index], suffix] : [word.slice(0, index + 1), suffix];
    }
    return [word];
  });
  const atomWords = [...new Set(pieces.flat())].sort();
  if (atomWords.length > MAX_DICTIONARY_ENTRIES || atomWords.reduce((total, word) => total + word.length, 0) > MAX_DICTIONARY_CHARS) throw new Error("词汇封包超出安全展开容量，原始记录已保留。");
  const atomMap = new Map(atomWords.map((word, index) => [word, index]));
  const strings = pieces.map(parts => parts.map(part => atomMap.get(part)!));
  // Prefix coding compresses the remaining unique IDs, including Unicode safely.
  const atoms: Array<[number, string]> = atomWords.map((word, index) => {
    const previous = atomWords[index - 1] ?? "";
    let prefix = 0;
    while (prefix < previous.length && prefix < word.length && previous[prefix] === word[prefix]) prefix += 1;
    return [prefix, word.slice(prefix)];
  });
  const intern = (text: string) => dictionary.get(text)!;
  const shapes: number[][] = [];
  const shapeIndexes = new Map<string, number>();
  function encode(value: unknown): Encoded {
    if (typeof value === "string") return -intern(value) - 1;
    if (value === null || typeof value === "boolean") return value;
    if (typeof value === "number" && Number.isFinite(value)) return value < 0 ? [0, value] : value;
    if (Array.isArray(value)) return [1, ...value.map(item => encode(item === undefined ? null : item))];
    if (record(value)) {
      const entries = Object.entries(value).filter(([, entry]) => entry !== undefined);
      const shape = entries.map(([key]) => intern(key));
      const signature = shape.join(",");
      let index = shapeIndexes.get(signature);
      if (index === undefined) { index = shapes.length; shapes.push(shape); shapeIndexes.set(signature, index); }
      return [2, index, ...entries.map(([, entry]) => encode(entry))];
    }
    throw new Error("词汇记录含不可保存的数据，已停止写回。");
  }
  const value = encode(vocabulary);
  const result = Object.fromEntries(Object.entries(snapshot).filter(([key]) => !fields.has(key)));
  result[envelopeKey] = { version: 1, atoms, strings, shapes, value } satisfies Envelope;
  return result as Snapshot;
}

export function unpackVocabularySnapshot<Snapshot>(snapshot: Snapshot): Snapshot {
  if (!record(snapshot) || !Object.hasOwn(snapshot, envelopeKey)) return snapshot;
  if ([...fields].some(key => Object.hasOwn(snapshot, key))) throw new Error("词汇记录同时含两份来源，已停止读取以免覆盖。");
  const packed = snapshot[envelopeKey];
  if (!record(packed) || packed.version !== 1 || !Array.isArray(packed.strings) || !Array.isArray(packed.atoms) || !Array.isArray(packed.shapes)) {
    throw new Error("词汇封包版本或字典损坏，原始记录已保留。");
  }
  if (packed.atoms.length > MAX_DICTIONARY_ENTRIES || packed.strings.length > MAX_DICTIONARY_ENTRIES || packed.shapes.length > MAX_DICTIONARY_ENTRIES) throw new Error("词汇封包字典过大，原始记录已保留。");
  const atoms: string[] = [];
  let atomChars = 0;
  for (const item of packed.atoms) {
    const previous = atoms.at(-1) ?? "";
    if (!Array.isArray(item) || item.length !== 2 || !Number.isSafeInteger(item[0]) || item[0] < 0 || item[0] > previous.length || typeof item[1] !== "string") {
      throw new Error("词汇封包字典损坏，原始记录已保留。");
    }
    atomChars += item[0] + item[1].length;
    if (atomChars > MAX_DICTIONARY_CHARS) throw new Error("词汇封包展开过大，原始记录已保留。");
    atoms.push(previous.slice(0, item[0]) + item[1]);
  }
  let stringChars = 0;
  const strings = packed.strings.map(parts => {
    if (!Array.isArray(parts) || parts.length === 0 || !parts.every(index => Number.isSafeInteger(index) && index >= 0 && index < atoms.length)) throw new Error("词汇封包分片损坏，原始记录已保留。");
    stringChars += parts.reduce((sum, index) => sum + atoms[index].length, 0);
    if (stringChars > MAX_DICTIONARY_CHARS) throw new Error("词汇封包展开过大，原始记录已保留。");
    return parts.map(index => atoms[index]).join("");
  });
  let nodes = 0;
  const getString = (index: unknown) => {
    if (!Number.isSafeInteger(index) || Number(index) < 0 || Number(index) >= strings.length) throw new Error("词汇封包索引损坏，原始记录已保留。");
    return strings[Number(index)];
  };
  let shapeEntries = 0;
  const shapes = packed.shapes.map(shape => {
    if (!Array.isArray(shape)) throw new Error("词汇封包字段表损坏，原始记录已保留。");
    shapeEntries += shape.length;
    if (shapeEntries > 2_000_000) throw new Error("词汇封包字段表过大，原始记录已保留。");
    const keys = shape.map(getString);
    if (new Set(keys).size !== keys.length) throw new Error("词汇封包键重复，原始记录已保留。");
    return keys;
  });
  function decode(value: unknown, depth: number): unknown {
    nodes += 1;
    if (depth > 100 || nodes > 2_000_000) throw new Error("词汇封包结构异常，原始记录已保留。");
    if (value === null || typeof value === "boolean") return value;
    if (typeof value === "number" && Number.isFinite(value)) return value < 0 ? getString(-value - 1) : value;
    if (!Array.isArray(value)) throw new Error("词汇封包内容损坏，原始记录已保留。");
    if (value[0] === 0 && value.length === 2 && typeof value[1] === "number" && Number.isFinite(value[1]) && value[1] < 0) return value[1];
    if (value[0] === 1) return value.slice(1).map(item => decode(item, depth + 1));
    if (value[0] === 2 && Number.isSafeInteger(value[1]) && value[1] >= 0 && value[1] < shapes.length) {
      const shape = shapes[value[1]];
      if (shape.length !== value.length - 2) throw new Error("词汇封包字段数量异常，原始记录已保留。");
      return Object.fromEntries(shape.map((key, index) => [key, decode(value[index + 2], depth + 1)]));
    }
    throw new Error("词汇封包标识损坏，原始记录已保留。");
  }
  const vocabulary = decode(packed.value, 0);
  if (!record(vocabulary) || Object.keys(vocabulary).some(key => !fields.has(key))) throw new Error("词汇封包包含未知顶层字段，原始记录已保留。");
  const result = Object.fromEntries(Object.entries(snapshot).filter(([key]) => key !== envelopeKey));
  return { ...result, ...vocabulary } as Snapshot;
}

export const MAX_STUDY_STORAGE_BYTES = 1_500_000;
export const studyStorageBytes = (snapshot: unknown) => new TextEncoder().encode(JSON.stringify(snapshot)).byteLength;
