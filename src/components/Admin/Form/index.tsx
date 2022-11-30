import invariant from 'tiny-invariant';

import { FormWrap } from '@/components/Admin/styles';
import Input from '@/components/Form/Input';
import Textarea from '@/components/Form/Textarea';
import Select from '@/components/Form/Select';
import Button from '@/components/Button';
import InfoColumn from './InfoColumn';
import Date from './Date';

const Label = ({ children }: any) => (
  <span className="mb-1 block text-sm tracking-wide text-gray-700">{children}</span>
);

const editableField = (field: any, data: any) => {
  const value = data && field.render ? field.render(data) : data[field.prop];
  const defaultProps = {
    className: field.className,
    name: field.prop,
    value,
  };

  if (field.type === 'hidden') {
    return <input type="hidden" {...defaultProps} />;
  }

  if (field.type === 'date') {
    return <Date date={parseInt(data[field.prop] || field.defaultValue, 10)} />;
  }

  if (field.type === 'select') {
    return (
      <Select
        {...defaultProps}
        choices={field.choices}
        value={value || (field.multiple ? [] : '')}
        multiple={field.multiple || false}
        placeholder={field.placeholder || ''}
      >
        {data && field.render ? field.render(data) : null}
      </Select>
    );
  }

  if (field.type === 'textarea') {
    return <Textarea rows={5} {...defaultProps} />;
  }

  return (
    <Input
      autoComplete={field.autoComplete === false ? 'off' : undefined}
      placeholder={field.placeholder || ''}
      type={field.inputType || 'text'}
      {...defaultProps}
    />
  );
};

export default function AdminForm({
  data = {},
  fields = [],
  boxLabel = 'Details',
  buttonLabel = 'Submit',
}: any) {
  const primaryFields: any[] = [];
  const infoFields: any[] = [];
  const metaFields: any[] = [];

  fields.forEach((f: any, i: number) => {
    const field = typeof f === 'function' ? f(data) : f;
    if (field.condition && !field.condition(data)) {
      return;
    }

    const key = field.prop || i.toString(16);
    let formField;
    if (field.type === 'custom') {
      invariant(
        field.render,
        `You must specify a render property for a custom field: ${field.prop}`
      );
      formField = (
        <div key={key} className="my-6 block">
          {field.label && <Label>{field.label}</Label>}
          {field.render(data)}
        </div>
      );
    } else if (field.type === 'date') {
      formField = (
        <div key={key} className="my-6 block">
          {field.label && <Label>{field.label}</Label>}
          {editableField(field, data)}
        </div>
      );
    } else {
      formField = (
        <div key={key} className="mt-2.5 mb-5 block">
          {field.label && <Label>{field.label}</Label>}
          {field.editable === false ? (
            <span className="block text-sm">
              {(field.render && field.render(data)) || data[field.prop]}
            </span>
          ) : (
            editableField(field, data)
          )}
        </div>
      );
    }

    if (field.position === 'info') {
      infoFields.push(formField);
    } else if (field.position === 'meta') {
      metaFields.push(formField);
    } else {
      primaryFields.push(formField);
    }
  });

  const button = (
    <Button buttonType="primary" className="h-7.5 px-3 pb-0.5 leading-7" type="submit">
      {buttonLabel}
    </Button>
  );

  return (
    <FormWrap>
      <form method="post" className="before:clear-both before:table">
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
      </form>
    </FormWrap>
  );
}
