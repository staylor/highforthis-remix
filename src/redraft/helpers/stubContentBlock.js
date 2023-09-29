/**
 * This is a simple replacement for draft-js ContentBlock,
 * CharacterList or any related methods are not implented here
 */

class ContentBlockStub {
  constructor(block) {
    Object.assign(this, block);
  }

  get(name) {
    return this[name];
  }

  getText() {
    return this.text;
  }

  getType() {
    return this.type;
  }

  getKey() {
    return this.key;
  }

  getLength() {
    return this.text.length;
  }

  getDepth() {
    return this.depth;
  }

  getData() {
    return this.data;
  }
}

const stubContentBlock = (block) => new ContentBlockStub(block);

export default stubContentBlock;
