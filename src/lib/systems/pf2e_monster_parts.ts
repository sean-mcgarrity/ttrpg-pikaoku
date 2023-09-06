export type MP_PerceptionItem = {
  type: 'perception';
};

export type MP_SkillItem = {
  type: 'skill';
  skill: string;
};

export type MP_ArmorItem = {
  type: 'armor';
  armor: string;
};

export type MP_WeaponItem = {
  type: 'weapon';
  weapon: string;
};

export type MP_ShieldItem = {
  type: 'shield';
  shield: string;
};

export type MP_Item = {
  id: string;
  name: string;
  description: string;
  changes: { description: string; amount: number }[];
} & (MP_PerceptionItem | MP_SkillItem | MP_ArmorItem | MP_WeaponItem | MP_ShieldItem);

export const itemTypes = [
  {
    id: 'perception',
    label: 'Perception'
  },
  {
    id: 'skill',
    label: 'Skill'
  },
  {
    id: 'armor',
    label: 'Armor'
  },
  {
    id: 'weapon',
    label: 'Weapon'
  },
  {
    id: 'shield',
    label: 'Shield'
  }
] as const;

export type ItemType = (typeof itemTypes)[number]['id'];

export const AllLevels = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20
] as const;
export type PlayerLevel = (typeof AllLevels)[number];

export type ImbuementLevel = {
  level: PlayerLevel;
  preview: string;
  benefits: string[]; // comes in as a semicolon seperated list.
};

export type Imbuement = {
  id: string;
  name: string;
  description: string;
  requires: string[];
  types: (typeof itemTypes)[number]['id'][];
  levels: {}[];
  enabled: boolean;
};

export type MP_Refinement = {
  id: string;
  name: string;
  description: string;
  type: ItemType;
  campaign_id: string;
  owner_id: string;
};

export type MP_Refinement_Change = {
  id: string;
  refinement_id: string;
  imbuement_id?: string;
  amount: number;
  source_id: string;
};
