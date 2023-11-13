export interface Campaign {
  id: number;
  name: string;
  description: string;
  archived: boolean;
  created_at: string;
  updated_at: string;
  banner_src: string;
  email: string;
  slug: string;
}

export interface PlayerCharacter {
  id: number;
  name: string;
  active: boolean;
  campaign_id: number;
  created_at: string;
  img_src: string;
  status: 'dead' | 'alive';
}
