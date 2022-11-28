import { Form } from '@remix-run/react';

import Button from '@/components/Button';
import InfoColumn from './InfoColumn';

export default function AdminForm({ boxLabel = 'Details', buttonLabel = 'Submit' }) {
  const primaryFields: any[] = [];
  const infoFields: any[] = [];
  const metaFields: any[] = [];

  const button = (
    <Button buttonType="primary" className="h-7.5 px-3 pb-0.5 leading-7" type="submit">
      {buttonLabel}
    </Button>
  );

  return (
    <Form className="before:clear-both before:table">
      <fieldset className="mr-75 block">
        <div className="w-full max-w-2xl md:float-left">
          {primaryFields}
          {infoFields.length === 0 ? button : null}
        </div>
        <InfoColumn
          infoFields={infoFields}
          metaFields={metaFields}
          button={button}
          label={boxLabel}
        />
      </fieldset>
    </Form>
  );
}
