import lexical from 'lexical';
import type { LexicalNode, NodeKey, SerializedLexicalNode, Spread } from 'lexical';
import type { ReactNode } from 'react';

import VideoComponent from '@/components/Videos/Video';
import type { Video } from '@/types/graphql';

const { $applyNodeReplacement, DecoratorNode } = lexical;

type SerializedVideoNode = Spread<{ video: Video }, SerializedLexicalNode>;

export default class VideoNode extends DecoratorNode<ReactNode> {
  __video: Video;

  static getType(): string {
    return 'video';
  }

  static clone(node: VideoNode): VideoNode {
    return new VideoNode(node.__video, node.__key);
  }

  static importJSON(serializedNode: SerializedVideoNode): VideoNode {
    const { video } = serializedNode;
    return $createVideoNode(video);
  }

  exportJSON(): SerializedVideoNode {
    return {
      video: this.__video,
      type: 'video',
      version: 1,
    };
  }

  constructor(video: Video, key?: NodeKey) {
    super(key);
    this.__video = video;
  }

  createDOM(): HTMLElement {
    return document.createElement('div');
  }

  updateDOM(): false {
    return false;
  }

  decorate(): ReactNode {
    return <VideoComponent video={this.__video} embed />;
  }
}

export function $createVideoNode(video: Video): VideoNode {
  return $applyNodeReplacement(new VideoNode(video));
}

export function $isVideoNode(node: LexicalNode | null | undefined): node is VideoNode {
  return node instanceof VideoNode;
}
