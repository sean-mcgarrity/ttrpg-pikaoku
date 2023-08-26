type MP_PerceptionItem = {
  type: 'perception';
};

type MP_SkillItem = {
  type: 'skill';
  skill: string;
};

type MP_ArmorItem = {
  type: 'armor';
  armor: string;
};

type MP_WeaponItem = {
  type: 'weapon';
  weapon: string;
};

type MP_ShieldItem = {
  type: 'shield';
  shield: string;
};

type MP_Item = {
  id: string;
  name: string;
  description: string;
  changes: { description: string; amount: number }[];
} & (MP_PerceptionItem | MP_SkillItem | MP_ArmorItem | MP_WeaponItem | MP_ShieldItem);

const itemTypes = [
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

type ItemType = (typeof itemTypes)[number]['id'];

const AllLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] as const;
type PlayerLevel = (typeof AllLevels)[number];

type ImbuementLevel = {
  level: PlayerLevel;
  preview: string;
  benefits: string[]; // comes in as a semicolon seperated list.
};

type Imbuement = {
  id: string;
  name: string;
  description: string;
  requires: string[];
  types: (typeof itemTypes)[number]['id'][];
  levels: {}[];
  enabled: boolean;
};

type Refinement = {};

type StoredRefinement = {
  id: string;
  name: string;
  description: string;
  type: ItemType;
  campaign_id: string;
  owner_id: string;
};
