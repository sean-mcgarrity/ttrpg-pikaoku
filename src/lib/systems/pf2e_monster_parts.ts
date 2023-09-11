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
  id: number;
  name: string;
  description: string;
  requires: string[];
  type: (typeof itemTypes)[number]['id'];
  levels: { level: number; preview: string; benefits: string[] }[];
  /** @deprecated */
  enabled?: boolean;
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

export const IMBUEMENT_COSTS_EQUIPMENT = [
  0, 20, 35, 60, 100, 160, 250, 360, 500, 700, 1000, 1400, 2000, 3000, 4500, 6500, 10000, 15000,
  24000, 40000, 70000
];

export const IMBUEMENT_COSTS_SKILL = [
  0, 10, 20, 35, 60, 100, 160, 240, 340, 470, 670, 950, 1350, 2000, 3000, 4300, 6500, 10000, 16000,
  25000, 45000
];

export const calculateImbuementLevel = (progress: number, imbuementType: ItemType) => {
  if (['weapon', 'armor'].includes(imbuementType)) {
    return IMBUEMENT_COSTS_EQUIPMENT.findIndex((cost) => cost > progress) - 1;
  } else {
    return IMBUEMENT_COSTS_SKILL.findIndex((cost) => cost > progress) - 1;
  }
};

export const calculateImbuementCostForLevel = (level: number, imbuementType: ItemType) => {
  if (['weapon', 'armor'].includes(imbuementType)) {
    return IMBUEMENT_COSTS_EQUIPMENT[level];
  } else {
    return IMBUEMENT_COSTS_SKILL[level];
  }
};
