import { useSearchParams } from '@remix-run/react';

import { FormWrap, Heading } from '@/components/Admin/styles';
import Form from '@/components/Form';
import Message from '@/components/Form/Message';

export default function SettingsForm({ heading, data, fields }: any) {
  const [searchParams] = useSearchParams();
  const message = searchParams.get('message');

  return (
    <>
      <Heading>{heading}</Heading>
      {message === 'updated' && <Message text="Settings Updated." />}
      <FormWrap>
        <Form data={data} fields={fields} buttonLabel="Update Settings" />
      </FormWrap>
    </>
  );
}
