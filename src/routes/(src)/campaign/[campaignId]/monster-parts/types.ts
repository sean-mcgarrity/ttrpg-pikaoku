const PF_ARMOR_UNARMORED = [
  {
    key: 'armor_explorers',
    name: "Explorer's Clothing",
    cost: 10
  }
] as const;
const PF_ARMOR_LIGHT = [
  {
    key: 'armor_padded',
    name: 'Padded Armor',
    cost: 20
  },
  {
    key: 'armor_leather',
    name: 'Leather Armor',
    cost: 200
  },
  {
    key: 'armor_studded',
    name: 'Studded Leather Armor',
    cost: 300
  },
  {
    key: 'armor_chain_shirt',
    name: 'Chain Shirt',
    cost: 500
  }
] as const;
const PF_ARMOR_MEDIUM = [
  {
    key: 'armor_hide',
    name: 'Hide Armor',
    cost: 200
  },
  {
    key: 'armor_scale',
    name: 'Scale Mail',
    cost: 400
  },
  {
    key: 'armor_chain',
    name: 'Chain Mail',
    cost: 600
  },
  {
    key: 'armor_breatplate',
    name: 'Breastplate',
    cost: 800
  }
] as const;
const PF_ARMOR_HEAVY = [
  {
    key: 'armor_splint',
    name: 'Splint Mail',
    cost: 1300
  },
  {
    key: 'armor_halfplate',
    name: 'Half Plate',
    cost: 1800
  },
  {
    key: 'armor_plate',
    name: 'Plate Mail',
    cost: 3000
  }
] as const;

type MP_MonsterFlags_Armor =
  | (typeof PF_ARMOR_UNARMORED)[number]['key']
  | (typeof PF_ARMOR_LIGHT)[number]['key']
  | (typeof PF_ARMOR_MEDIUM)[number]['key']
  | (typeof PF_ARMOR_HEAVY)[number]['key'];

const PF_Skills = [
  {
    key: 'acrobatics',
    name: 'Acrobatics'
  },
  {
    key: 'arcana',
    name: 'Arcana'
  },
  {
    key: 'athletics',
    name: 'Athletics'
  },
  {
    key: 'crafting',
    name: 'Crafting'
  },
  {
    key: 'deception',
    name: 'Deception'
  },
  {
    key: 'diplomacy',
    name: 'Diplomacy'
  },
  {
    key: 'intimidation',
    name: 'Intimidation'
  },
  {
    key: 'lore',
    name: 'Lore'
  },
  {
    key: 'medicine',
    name: 'Medicine'
  },
  {
    key: 'nature',
    name: 'Nature'
  },
  {
    key: 'occultism',
    name: 'Occultism'
  },
  {
    key: 'performance',
    name: 'Performance'
  },
  {
    key: 'perception',
    name: 'Perception'
  },
  {
    key: 'religion',
    name: 'Religion'
  },
  {
    key: 'society',
    name: 'Society'
  },
  {
    key: 'stealth',
    name: 'Stealth'
  },
  {
    key: 'survival',
    name: 'Survival'
  }
] as const;

type MP_MonsterFlags_Skill = (typeof PF_Skills)[number]['key'];
type MP_MonsterFlags = MP_MonsterFlags_Armor | MP_MonsterFlags_Skill;

type MP_Monster = {
  name: string;
  level: number;
  flags: MP_MonsterFlags[];
  revealed: boolean;
};
