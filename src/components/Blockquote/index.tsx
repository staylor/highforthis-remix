import cn from 'classnames';

export const blockquoteBase =
  'font-georgia text-[#666] border-l-4 border-detail italic my-4 py-2.5 px-5';

const Blockquote = ({ className, ...props }: any) => (
  <blockquote className={cn(blockquoteBase, className)} {...props} />
);

export default Blockquote;
