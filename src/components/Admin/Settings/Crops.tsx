import type { ThHTMLAttributes, TdHTMLAttributes, SyntheticEvent } from 'react';
import { useState } from 'react';

import Input from '@/components/Form/Input';
import Button from '@/components/Button';
import type { MediaCropSetting, MediaSettings } from '@/types/graphql';

const NumberInput = ({
  name,
  value,
  onChange,
}: {
  name: string;
  value: number;
  onChange: (value: number) => void;
}) => (
  <Input
    className="inline-block h-8 w-16 py-0.5 px-1"
    size={4}
    inputType="number"
    name={name}
    onChange={onChange}
    value={value}
  />
);

const Heading = (props: ThHTMLAttributes<HTMLTableHeaderCellElement>) => (
  <th className="py-1 pr-2.5 text-left text-sm" {...props} />
);
const Cell = (props: TdHTMLAttributes<HTMLTableCellElement>) => (
  <td className="py-1 pr-2.5" {...props} />
);

function Crops({ settings }: { settings: MediaSettings }) {
  const [crops, setCrops] = useState<MediaCropSetting[]>(
    settings.crops && settings.crops.length > 0 ? settings.crops : [{} as MediaCropSetting]
  );

  const addCrop = (e: SyntheticEvent) => {
    e.preventDefault();

    const newsCrops = [...crops];
    newsCrops.push({} as MediaCropSetting);
    setCrops(newsCrops);
  };

  const removeCrop = (i: number) => (e: Event) => {
    e.preventDefault();

    const newCrops = [...crops];
    newCrops.splice(i, 1);
    setCrops(newCrops);
  };

  const bindOnChange = (prop: 'name' | 'width' | 'height', i: number) => (value: any) => {
    const newCrops = [...crops] as MediaCropSetting[];
    newCrops[i] = { ...newCrops[i] } as MediaCropSetting;
    // @ts-ignore
    newCrops[i][prop] = value;
    setCrops(newCrops);
  };

  return (
    <>
      <Button className="h-6 px-2 pb-0.5 text-xs" onClick={addCrop}>
        Add Crop
      </Button>
      <table className="my-5">
        <thead>
          <tr>
            <Heading>Name</Heading>
            <Heading colSpan={2}>Dimensions</Heading>
          </tr>
        </thead>
        <tbody>
          {crops.map((crop, i) => (
            <tr key={`${i.toString(16)}`}>
              <Cell>
                <Input
                  size={20}
                  type="text"
                  name={`crops[${i}][name]`}
                  onChange={bindOnChange('name', i)}
                  value={crop.name || ''}
                />
              </Cell>
              <Cell>
                <NumberInput
                  name={`crops[${i}][width]`}
                  onChange={bindOnChange('width', i)}
                  value={crop.width || 0}
                />{' '}
                x{' '}
                <NumberInput
                  name={`crops[${i}][height]`}
                  onChange={bindOnChange('height', i)}
                  value={crop.height || 0}
                />
              </Cell>
              <Cell>
                <button onClick={removeCrop(i) as any}>Remove</button>
              </Cell>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Crops;
