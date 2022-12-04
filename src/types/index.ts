import type { ReactNode } from 'react';
import type { AppData } from '@remix-run/node';

import type { Choice } from '@/components/Form/Select';

export interface Column {
  className?: string;
  label?: string;
  prop?: string;
  render?: (data: AppData) => ReactNode;
  type?: string;
}

export type Columns = Column[];

export type Fields = FieldUnion[];

export type FieldUnion = Field | FieldFactory;

export type FieldFactory = (data: AppData) => Field;

export interface Field {
  autoComplete?: boolean;
  choices?: Choice[];
  className?: string;
  condition?: (data: AppData) => boolean;
  defaultValue?: string | number;
  editable?: boolean;
  inputType?: string;
  label?: string;
  multiple?: boolean;
  name?: string;
  placeholder?: string;
  position?: 'info' | 'meta' | 'primary';
  prop?: string;
  render?: (data: AppData) => ReactNode;
  type?: 'custom' | 'date' | 'editor' | 'select' | 'textarea' | 'hidden';
}

export interface AdminRoute {
  path: string;
  label: string;
}

export interface AdminTopLevelRoute extends AdminRoute {
  dashicon: string;
  routes?: AdminRoute[];
}

export type AdminRouteGroup = AdminTopLevelRoute[];
