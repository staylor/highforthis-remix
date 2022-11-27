import cn from 'classnames';
import Heading from '../Heading';

interface TitleProps {
  className?: string;
  [key: string]: any;
}

export default function Title({ className, ...props }: TitleProps) {
  return <Heading as="h1" {...props} className={cn('text-3xl lg:text-4xl', className)} />;
}
