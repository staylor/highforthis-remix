import type { ReactNode } from 'react';

interface RowTitleProps {
  url: string;
  title?: ReactNode;
  subtitle?: ReactNode;
}

export default function RowTitle({ url, title, subtitle }: RowTitleProps) {
  return (
    <strong className="mb-1 block break-words text-sm font-bold">
      <a href={url}>{title || '(no title)'}</a>
      {subtitle && (
        <>
          <br />
          <span className="text-xs font-normal">{subtitle}</span>
        </>
      )}
    </strong>
  );
}
