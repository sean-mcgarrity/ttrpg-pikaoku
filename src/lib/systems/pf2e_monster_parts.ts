import { byKeyAsc, whereKeyLte } from '$lib/utils/iterators';
import * as pf2eCore from './pf2e_core';

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

export type MP_BaseItem = {
  key: string;
  created_at: string;
  description: string;
  name: string;
  type: ItemType;
  cost: number; // IN CP
  requires: string[];
};

export type MP_Item = {
  id: string;
  name: string;
  description: string;
  changes: { description: string; amount: number }[];
  cost: number;
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
  levels: { level: number; preview: string; benefits: string[]; sequenceId?: string }[];
  category?: string;
  implemented: boolean;
  /** @deprecated */
  enabled?: boolean;
};

export type MP_Refinement = {
  id: number;
  name: string;
  description: string;
  type: ItemType;
  campaign_id: number;
  owner_id: number;
  base_item_key: string;
  changes?: MP_Refinement_Change[];
  imbuements?: (Imbuement & Record<'changes', MP_Refinement_Change>)[];
  base_item?: MP_Item & Record<'requires', string[]>;
  owner?: { id: number; name: string; active: boolean };
};

export type MP_Refinement_Change = {
  id: number;
  refinement_id: number;
  imbuement_id?: number;
  amount: number;
  source_id: string;
  source?: MP_Source;
  created_at?: string;
};

export type MP_Source = {
  name: string;
  level: number;
  quantity: number;
  id?: number;
  enables: string[];
  campaign_id?: number;
  img_src?: string;
  revealed?: boolean;
};

export type MP_UsableSource = MP_Source & {
  usable: number;
  total: number;
  quantity: number;
  usage: number;
  remaining: number;
};

export const UPGRADE_COSTS_WEAPONS_ARMOR = [
  0, 20, 35, 60, 100, 160, 250, 360, 500, 700, 1000, 1400, 2000, 3000, 4500, 6500, 10000, 15000,
  24000, 40000, 70000
];

export const UPGRADE_COSTS_SKILL_SHIELDS = [
  0, 10, 20, 35, 60, 100, 160, 240, 340, 470, 670, 950, 1350, 2000, 3000, 4300, 6500, 10000, 16000,
  25000, 45000
];

type RefinementBenefitMatrix = {
  [key in ItemType]: {
    level: number;
    benefits: string[];
    imbuementSlots: number;
  }[];
};

const sortedDamageTypes = [...pf2eCore.DamageTypes].sort(byKeyAsc('name'));
const sortedSkills = [...pf2eCore.Skills].sort(byKeyAsc('name'));
const sortedAbilities = [...pf2eCore.Abilities].sort(byKeyAsc('name'));

export const mpTraits = [
  ...sortedDamageTypes.map((d) => `resist:${d.id}`),
  ...sortedDamageTypes.map((d) => `weak:${d.id}`),
  ...sortedDamageTypes.map((d) => `immune:${d.id}`),
  ...sortedDamageTypes.map((c) => `attack:${c.id}`),
  ...sortedDamageTypes.map((c) => `trait:${c.id}`),
  ...sortedSkills.map((s) => `skill:${s.id}`),
  ...sortedAbilities.map((a) => `ability:${a.id}`),
  ...pf2eCore.SenseTypes.map((s) => `sense:${s.id}`),
  'trait:hardness',
  'craft:shield',
  'craft:armor_light',
  'craft:armor_medium',
  'craft:armor_heavy',
  'speed:flight'
];

export const REFINEMENT_BENEFITS: RefinementBenefitMatrix = {
  weapon: [
    {
      level: 2,
      benefits: ['Item bonus to attack rolls (+1)', 'Imbuing (1)'],
      imbuementSlots: 1
    },
    {
      level: 4,
      benefits: [
        'Item bonus to attack rolls (+1)',
        'Imbuing (1)',
        'Additional damage dice (2 dice, striking)'
      ],
      imbuementSlots: 1
    },
    {
      level: 10,
      benefits: [
        'Item bonus to attack rolls (+2)',
        'Imbuing (2)',
        'Additional damage dice (2 dice, striking)'
      ],
      imbuementSlots: 2
    },
    {
      level: 12,
      benefits: [
        'Item bonus to attack rolls (+2)',
        'Imbuing (2)',
        'Additional damage dice (3 dice, greater striking)'
      ],
      imbuementSlots: 2
    },
    {
      level: 16,
      benefits: [
        'Item bonus to attack rolls (+3)',
        'Imbuing (3)',
        'Additional damage dice (2 dice, greater striking)'
      ],
      imbuementSlots: 3
    },
    {
      level: 19,
      benefits: [
        'Item bonus to attack rolls (+3)',
        'Imbuing (3)',
        'Additional damage dice (4 dice, major striking)'
      ],
      imbuementSlots: 3
    }
  ],
  armor: [
    {
      level: 5,
      benefits: ['Item bonus to AC (+1)', 'Imbuing (1)'],
      imbuementSlots: 1
    },
    {
      level: 8,
      benefits: ['Item bonus to AC (+1)', 'Imbuing (1)', 'Resilient (1)'],
      imbuementSlots: 1
    },
    {
      level: 11,
      benefits: ['Item bonus to AC (+2)', 'Imbuing (2)', 'Resilient (1)'],
      imbuementSlots: 2
    },
    {
      level: 14,
      benefits: ['Item bonus to AC (+2)', 'Imbuing (2)', 'Greater Resilient (2)'],
      imbuementSlots: 2
    },
    {
      level: 18,
      benefits: ['Item bonus to AC (+3)', 'Imbuing (3)', 'Greater Resilient (2)'],
      imbuementSlots: 3
    },
    {
      level: 20,
      benefits: ['Item bonus to AC (+3)', 'Imbuing (3)', 'Major Resilient (3)'],
      imbuementSlots: 3
    }
  ],
  shield: [
    {
      level: 3,
      benefits: ['Hardness 5, HP 30, BT 15'],
      imbuementSlots: 0
    },
    {
      level: 4,
      benefits: ['Hardness 5, HP 30, BT 15', 'Imbuing (1)'],
      imbuementSlots: 1
    },
    {
      level: 6,
      benefits: ['Hardness 6, HP 36, BT 18', 'Imbuing (1)'],
      imbuementSlots: 1
    },
    {
      level: 7,
      benefits: ['Hardness 7, HP 42, BT 21', 'Imbuing (1)'],
      imbuementSlots: 1
    },
    {
      level: 8,
      benefits: ['Hardness 8, HP 48, BT 24', 'Imbuing (1)'],
      imbuementSlots: 1
    },
    {
      level: 9,
      benefits: ['Hardness 9, HP 54, BT 27', 'Imbuing (1)'],
      imbuementSlots: 1
    },
    {
      level: 10,
      benefits: ['Hardness 10, HP 60, BT 30', 'Imbuing (1)'],
      imbuementSlots: 1
    },
    {
      level: 12,
      benefits: ['Hardness 11, HP 66, BT 33', 'Imbuing (1)'],
      imbuementSlots: 1
    },
    {
      level: 13,
      benefits: ['Hardness 12, HP 72, BT 36', 'Imbuing (1)'],
      imbuementSlots: 1
    },
    {
      level: 15,
      benefits: ['Hardness 13, HP 78, BT 39', 'Imbuing (1)'],
      imbuementSlots: 1
    },
    {
      level: 16,
      benefits: ['Hardness 14, HP 84, BT 42', 'Imbuing (1)'],
      imbuementSlots: 1
    },
    {
      level: 17,
      benefits: ['Hardness 15, HP 90, BT 45', 'Imbuing (1)'],
      imbuementSlots: 1
    },
    {
      level: 18,
      benefits: ['Hardness 16, HP 96, BT 48', 'Imbuing (1)'],
      imbuementSlots: 1
    },
    {
      level: 19,
      benefits: ['Hardness 17, HP 102, BT 51', 'Imbuing (1)'],
      imbuementSlots: 1
    },
    {
      level: 20,
      benefits: ['Hardness 18, HP 108, BT 54', 'Imbuing (1)'],
      imbuementSlots: 1
    }
  ],
  perception: [
    {
      level: 3,
      benefits: ['Item bonus to Perception checks (+1)', 'Imbuing (1)'],
      imbuementSlots: 1
    },
    {
      level: 9,
      benefits: ['Item bonus to Perception checks (+2)', 'Imbuing (1)'],
      imbuementSlots: 1
    },
    {
      level: 17,
      benefits: ['Item bonus to Perception checks (+3)', 'Imbuing (1)'],
      imbuementSlots: 1
    }
  ],
  skill: [
    {
      level: 3,
      benefits: ['Item bonus to skill checks (+1)', 'Imbuing (1)'],
      imbuementSlots: 1
    },
    {
      level: 9,
      benefits: ['Item bonus to skill checks (+2)', 'Imbuing (1)'],
      imbuementSlots: 1
    },
    {
      level: 17,
      benefits: ['Item bonus to skill checks (+3)', 'Imbuing (1)'],
      imbuementSlots: 1
    }
  ]
};

export const calculateUpgradeLevel = (progress: number, itemType: ItemType) => {
  if (['weapon', 'armor'].includes(itemType)) {
    // get currnet refinment level
    return UPGRADE_COSTS_WEAPONS_ARMOR.findIndex((cost) => cost > progress) - 1;
  } else {
    return UPGRADE_COSTS_SKILL_SHIELDS.findIndex((cost) => cost > progress) - 1;
  }
};

export const getUpgradeCostForLevel = (level: number, itemType: ItemType) => {
  if (['weapon', 'armor'].includes(itemType)) {
    return UPGRADE_COSTS_WEAPONS_ARMOR[level];
  } else {
    return UPGRADE_COSTS_SKILL_SHIELDS[level];
  }
};

export const getNonImbuementChanges = (refinement: MP_Refinement) => {
  return (refinement.changes || []).filter((change) => !change.imbuement_id);
};

export const calculateRefinementProgress = (refinement: MP_Refinement) => {
  const baseItemCost = refinement.base_item?.cost / 100 ?? 0;
  const changes = getNonImbuementChanges(refinement);
  return changes.reduce((acc, change) => acc + change.amount, 0) - baseItemCost;
};

export const calculateRefinementLevel = (refinement: MP_Refinement) => {
  const itemType = refinement.type;
  const progress = calculateRefinementProgress(refinement);
  if (['weapon', 'armor'].includes(itemType)) {
    return UPGRADE_COSTS_WEAPONS_ARMOR.findIndex((cost) => cost > progress) - 1;
  } else {
    return UPGRADE_COSTS_SKILL_SHIELDS.findIndex((cost) => cost > progress) - 1;
  }
};

export const calculateNextRefinementLevel = (refinement: MP_Refinement) => {
  const itemType = refinement.type;
  const progress = calculateRefinementProgress(refinement);
  if (['weapon', 'armor'].includes(itemType)) {
    return UPGRADE_COSTS_WEAPONS_ARMOR.findIndex((cost) => cost > progress);
  } else {
    return UPGRADE_COSTS_SKILL_SHIELDS.findIndex((cost) => cost > progress);
  }
};

export const getRefinementBenefitsForItem = (refinement: MP_Refinement) => {
  const itemLevel = calculateRefinementLevel(refinement);
  const typeBenefits = REFINEMENT_BENEFITS[refinement.type];
  const achievedLevels = typeBenefits.findLast(whereKeyLte('level', itemLevel));
  return achievedLevels;
};

export const getMonsterPartsForLevel = (level: number) => {
  const monsterPartsValue = [
    3, 5, 7, 12, 18, 27, 45, 65, 100, 140, 200, 275, 390, 560, 840, 1250, 1850, 2800, 4300, 7000,
    12000, 17500, 24000, 35000, 48000, 70000, 96000
  ];

  return monsterPartsValue[level + 1];
};

export const calculateSellCostOfRefinement = (refinement: MP_Refinement) => {
  return Math.floor(refinement.changes.map((c) => c.amount).reduce((a, b) => a + b, 0) / 2);
};

export const getImbuementSlots = (refinement: MP_Refinement) => {
  const benefits = getRefinementBenefitsForItem(refinement);
  return benefits?.imbuementSlots ?? 0;
};

export const getUnusedImbuementSlots = (refinement: MP_Refinement) => {
  const imbuementSlots = getImbuementSlots(refinement);
  const usedSlots = refinement.imbuements?.length ?? 0;
  return Math.max(imbuementSlots - usedSlots, 0);
};
