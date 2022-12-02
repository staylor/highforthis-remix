import type { Fields } from '@/types';
import cn from 'classnames';
import type { ReactNode } from 'react';

const border = cn('border border-detail');

const InfoBox = ({ children, ...props }: { children: ReactNode }) => (
  <aside className={cn(border, 'mb-5 box-border block shadow')} {...props}>
    {children}
  </aside>
);

const Content = ({ children }: { children: ReactNode }) => (
  <div className="px-5 pt-1.5 pb-5 text-sm">{children}</div>
);

interface InfoColumnProps {
  infoFields: Fields;
  metaFields: Fields;
  label?: string;
  button?: ReactNode;
}

export default function InfoColumn({
  infoFields = [],
  metaFields = [],
  label = '',
  button = null,
}: InfoColumnProps) {
  return (
    <section className="md:-mr-75 md:w-70 sticky top-2.5 mt-2.5 mr-0 w-full md:float-right">
      {infoFields.length > 0 ? (
        <InfoBox>
          <h3 className={cn(border, 'text-dark select-none py-2 px-3 text-sm font-bold')}>
            {label}
          </h3>
          <Content>
            <>{infoFields}</>
            {button}
          </Content>
        </InfoBox>
      ) : null}
      {metaFields.length > 0 ? (
        <InfoBox>
          <Content>
            <>{metaFields}</>
          </Content>
        </InfoBox>
      ) : null}
    </section>
  );
}
