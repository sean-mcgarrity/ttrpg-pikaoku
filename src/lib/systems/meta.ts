import type { Row } from 'src/app';

export type Campaign = Row<'campaigns'> & {
  features: Row<'campaign_features'>[];
};

export interface PlayerCharacter {
  id: number;
  name: string;
  active: boolean;
  campaign_id: number;
  created_at: string;
  img_src: string;
  status: 'dead' | 'alive';
}
