import CompositeDecorator from './helpers/CompositeDecorator';
import MultiDecorator from './helpers/MultiDecorator';
import stubContentBlock from './helpers/stubContentBlock';

/**
 * Use CompositeDecorator to build decoratorRanges with ranges, components, and props
 */

// This offsets or rather recalculates ranges for decorators
// with punycode.ucs2.decode
const offsetRanges = (ranges, block) => {
  // if there are no decorator skip this step
  ranges.forEach((range) => {
    const pre = block.text.substring(0, range.offset);
    const decorated = block.text.substring(range.offset, range.offset + range.length);

    range.offset = pre.length;

    range.length = decorated.length;
  });
  return ranges;
};
// Return true if decorator implements the DraftDecoratorType interface
// @see https://github.com/facebook/draft-js/blob/master/src/model/decorators/DraftDecoratorType.js
const decoratorIsCustom = (decorator) =>
  typeof decorator.getDecorations === 'function' &&
  typeof decorator.getComponentForKey === 'function' &&
  typeof decorator.getPropsForKey === 'function';

const resolveDecorators = (decorators) => {
  const compositeDecorator = new CompositeDecorator(
    decorators.filter((decorator) => !decoratorIsCustom(decorator))
  );

  const customDecorators = decorators.filter((decorator) => decoratorIsCustom(decorator));
  const decor = [...customDecorators, compositeDecorator];
  return new MultiDecorator(decor);
};

const decorateBlock = (block, decorators, contentState, { createContentBlock }) => {
  const decoratorRanges = [];
  // create a Decorator instance
  const decorator = resolveDecorators(decorators);
  // create ContentBlock or a stub
  const contentBlock = createContentBlock ? createContentBlock(block) : stubContentBlock(block);
  // Get decorations from CompositeDecorator instance
  const decorations = decorator.getDecorations(contentBlock, contentState);
  // Keep track of offset for current key
  let offset = 0;
  decorations.forEach((key, index) => {
    // If no key just move the offset
    if (!key) {
      offset += 1;
      return;
    }
    // get next key
    const nextIndex = index + 1;
    const next = decorations[nextIndex];
    // if thers no next key or the key chages build a decoratorRange entry
    if (!next || next !== key) {
      decoratorRanges.push({
        offset,
        length: nextIndex - offset,
        component: decorator.getComponentForKey(key),
        decoratorProps: decorator.getPropsForKey(key) || {},
        // save reference to contentState
        contentState,
      });
      // reset the offset to next index
      offset = nextIndex;
    }
  });
  // merge the block with decoratorRanges
  return Object.assign({}, block, {
    decoratorRanges: offsetRanges(decoratorRanges, block),
  });
};

const withDecorators = (raw, decorators, options) => {
  const contentState = options.convertFromRaw && options.convertFromRaw(raw);
  return raw.blocks.map((block) => decorateBlock(block, decorators, contentState, options || {}));
};

export default withDecorators;
