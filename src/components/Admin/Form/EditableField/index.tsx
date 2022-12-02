import cn from 'classnames';

import Input from '@/components/Form/Input';
import Textarea from '@/components/Form/Textarea';
import Select from '@/components/Form/Select';
import Editor from '@/components/Editor';
import Date from '@/components/Admin/Form/Date';

export default function EditableField({ field, data }: any) {
  const value = data && field.render ? field.render(data) : data[field.prop];
  const defaultProps = {
    className: field.className,
    name: field.prop,
    value,
  };

  if (field.type === 'editor') {
    return (
      <Editor
        className={cn(field.className)}
        editorKey={field.prop}
        content={data && field.render ? field.render(data) : data[field.prop]}
        placeholder={field.placeholder || 'Content goes here...'}
      />
    );
  }

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
}
