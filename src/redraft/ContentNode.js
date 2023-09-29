import arraysEqual from './helpers/arrayEqual';

class ContentNode {
  constructor(props) {
    this.content = props.content || [];
    this.start = typeof props.start !== 'undefined' ? props.start : null;
    this.end = typeof props.end !== 'undefined' ? props.end : null;
    this.entity = typeof props.entity !== 'undefined' ? props.entity : null;
    this.decorator = typeof props.decorator !== 'undefined' ? props.decorator : null;
    this.decoratorProps = props.decoratorProps || null;
    this.decoratedText = typeof props.decoratedText !== 'undefined' ? props.decoratedText : null;
    this.contentState = props.contentState;
    this.style = props.style || null;
    this.styles = props.styles || null;
    this.block = props.block || {};
  }

  getCurrentContent() {
    return this.content[this.content.length - 1];
  }

  addToCurrentContent(string) {
    this.content[this.content.length - 1] = this.content[this.content.length - 1] + string;
  }

  handleFlatPush(string, stack) {
    const current = this.getCurrentContent();
    // if the stacks are equal just add the string to the current node
    if (current instanceof ContentNode && arraysEqual(stack, current.styles)) {
      current.addToCurrentContent(string);
      return;
    }
    // create a node with whole styles stack
    const newNode = new ContentNode({ styles: [...stack], content: [string] });
    this.content.push(newNode);
  }

  pushContent(string, stack = [], flat = false) {
    // we can just concat strings when both the pushed item
    // and the last element of the content array is a string
    if (!stack || stack.length < 1) {
      if (typeof string === 'string' && typeof this.getCurrentContent() === 'string') {
        this.addToCurrentContent(string);
      } else {
        this.content.push(string);
      }
      return this;
    }
    // handle flat structure
    if (flat) {
      this.handleFlatPush(string, stack);
      return this;
    }

    const [head, ...rest] = stack;
    const current = this.getCurrentContent();
    if (current instanceof ContentNode && current.style === head) {
      current.pushContent(string, rest, flat);
    } else {
      const newNode = new ContentNode({ style: head });
      newNode.pushContent(string, rest, flat);
      this.content.push(newNode);
    }
    return this;
  }
}

export default ContentNode;
