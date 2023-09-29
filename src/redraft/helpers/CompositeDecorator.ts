/**
 * This is only slighly modified version of draft-js CompositeDraftDecorator
 * https://github.com/facebook/draft-js/blob/dc27624caaaede4dad9d182ff9918a5da8f83c99/src/model/decorators/CompositeDraftDecorator.js
 *
 * Basicly it just swaps the Immutable.js List with own ListStub
 */

import type { ContentBlock, ContentState, DraftDecorator } from 'draft-js';

const DELIMITER = '.';

/**
 * Determine whether we can occupy the specified slice of the decorations
 * array.
 */
function canOccupySlice(decorations: string[], start: number, end: number): boolean {
  // eslint-disable-next-line no-plusplus
  for (let ii = start; ii < end; ii++) {
    if (decorations[ii] != null) {
      return false;
    }
  }
  return true;
}

/**
 * Splice the specified component into our decoration array at the desired
 * range.
 */
function occupySlice(targetArr: string[], start: number, end: number, componentKey: string): void {
  // eslint-disable-next-line no-plusplus
  for (let ii = start; ii < end; ii++) {
    // eslint-disable-next-line no-param-reassign
    targetArr[ii] = componentKey;
  }
}
/**
 * A CompositeDraftDecorator traverses through a list of DraftDecorator
 * instances to identify sections of a ContentBlock that should be rendered
 * in a "decorated" manner. For example, hashtags, mentions, and links may
 * be intended to stand out visually, be rendered as anchors, etc.
 *
 * The list of decorators supplied to the constructor will be used in the
 * order they are provided. This allows the caller to specify a priority for
 * string matching, in case of match collisions among decorators.
 *
 * For instance, I may have a link with a `#` in its text. Though this section
 * of text may match our hashtag decorator, it should not be treated as a
 * hashtag. I should therefore list my link DraftDecorator
 * before my hashtag DraftDecorator when constructing this composite
 * decorator instance.
 *
 * Thus, when a collision like this is encountered, the earlier match is
 * preserved and the new match is discarded.
 */
class CompositeDraftDecorator {
  decorators: DraftDecorator[];

  constructor(decorators: DraftDecorator[]) {
    // Copy the decorator array, since we use this array order to determine
    // precedence of decoration matching. If the array is mutated externally,
    // we don't want to be affected here.
    this.decorators = decorators.slice();
  }

  getDecorations(block: ContentBlock, contentState: ContentState): DraftDecorator[] {
    const decorations = Array(block.getText().length).fill(null);

    this.decorators.forEach((/* object */ decorator, /* number */ ii) => {
      let counter = 0;
      const { strategy } = decorator;
      const callback = (start: number, end: number) => {
        // Find out if any of our matching range is already occupied
        // by another decorator. If so, discard the match. Otherwise, store
        // the component key for rendering.
        if (canOccupySlice(decorations, start, end)) {
          occupySlice(decorations, start, end, ii + DELIMITER + counter);
          // eslint-disable-next-line no-plusplus
          counter++;
        }
      };
      strategy(block, callback, contentState);
    });

    return decorations;
  }

  getComponentForKey(key: string) {
    const componentKey = parseInt(key.split(DELIMITER)[0], 10);
    return this.decorators[componentKey].component;
  }

  getPropsForKey(key: string) {
    const componentKey = parseInt(key.split(DELIMITER)[0], 10);
    return this.decorators[componentKey].props;
  }
}

export default CompositeDraftDecorator;
