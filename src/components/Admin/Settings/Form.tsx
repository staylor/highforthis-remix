import { Heading } from '@/components/Admin/styles';
import Form from '@/components/Admin/Form';
import Message from '@/components/Form/Message';
import type { Fields } from '@/types';
import type {
  DashboardSettings,
  MediaSettings,
  PodcastSettings,
  SiteSettings,
  SocialSettings,
} from '@/types/graphql';

interface SettingsFormProps {
  data?: SiteSettings | SocialSettings | PodcastSettings | DashboardSettings | MediaSettings;
  heading: string;
  fields: Fields;
}

export default function SettingsForm({ data, heading, fields }: SettingsFormProps) {
  return (
    <>
      <Heading>{heading}</Heading>
      <Message text="Settings Updated." />
      <Form data={data} fields={fields} buttonLabel="Update Settings" />
    </>
  );
}
