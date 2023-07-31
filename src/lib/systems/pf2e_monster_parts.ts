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
  refinements: { description: string; amount: number }[];
} & (MP_PerceptionItem | MP_SkillItem | MP_ArmorItem | MP_WeaponItem | MP_ShieldItem);

const t = true;

const calculateItemLevel = (item: MP_Item) => {
  return 7;
};
