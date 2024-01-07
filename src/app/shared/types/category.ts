export type Category = {
  id: number;
  name: string;
  status: 'active' | 'hidden';
};

export type CategoryData = {
  data: Category[];
  active: number;
  hidden: number;
  total: number;
};
