import cn from 'classnames';

export const paragraphBase = 'mb-6';

const Paragraph = ({ className, ...props }: any) => (
  <p className={cn(paragraphBase, className)} {...props} />
);

export default Paragraph;
