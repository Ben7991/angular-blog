export type Tag = {
  id: number;
  name: string;
  status: 'active' | 'hidden';
};

export type TagData = {
  data: Tag[];
  active: number;
  hidden: number;
  total: number;
};
