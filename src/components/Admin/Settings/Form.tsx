import { Heading } from '@/components/Admin/styles';
import Form from '@/components/Admin/Form';
import Message from '@/components/Form/Message';

export default function SettingsForm({ heading, data, fields }: any) {
  return (
    <>
      <Heading>{heading}</Heading>
      <Message text="Settings Updated." />
      <Form data={data} fields={fields} buttonLabel="Update Settings" />
    </>
  );
}
