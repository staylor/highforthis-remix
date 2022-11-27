import cn from 'classnames';

export const orderedListBase = 'list-decimal my-5 ml-8';
export const unorderedListBase = 'list-disc my-5 ml-8';

export const OrderedList = ({ className, ...props }: any) => (
  <ol className={cn(orderedListBase, className)} {...props} />
);

export const UnorderedList = ({ className, ...props }: any) => (
  <ul className={cn(unorderedListBase, className)} {...props} />
);
