export const Abilities = [
  {
    id: 'strength',
    name: 'Strength',
    short: 'STR'
  },
  {
    id: 'dexterity',
    name: 'Dexterity',
    short: 'DEX'
  },
  {
    id: 'constitution',
    name: 'Constitution',
    short: 'CON'
  },
  {
    id: 'intelligence',
    name: 'Intelligence',
    short: 'INT'
  },
  {
    id: 'wisdom',
    name: 'Wisdom',
    short: 'WIS'
  },
  {
    id: 'charisma',
    name: 'Charisma',
    short: 'CHA'
  }
] as const;

export const Skills = [
  {
    id: 'acrobatics',
    name: 'Acrobatics',
    ability: 'dexterity'
  },
  {
    id: 'arcana',
    name: 'Arcana',
    ability: 'intelligence'
  },
  {
    id: 'athletics',
    name: 'Athletics',
    ability: 'strength'
  },
  {
    id: 'crafting',
    name: 'Crafting',
    ability: 'intelligence'
  },
  {
    id: 'deception',
    name: 'Deception',
    ability: 'charisma'
  },
  {
    id: 'diplomacy',
    name: 'Diplomacy',
    ability: 'charisma'
  },
  {
    id: 'intimidation',
    name: 'Intimidation',
    ability: 'charisma'
  },
  {
    id: 'medicine',
    name: 'Medicine',
    ability: 'wisdom'
  },
  {
    id: 'nature',
    name: 'Nature',
    ability: 'wisdom'
  },
  {
    id: 'occultism',
    name: 'Occultism',
    ability: 'intelligence'
  },
  {
    id: 'performance',
    name: 'Performance',
    ability: 'charisma'
  },
  {
    id: 'religion',
    name: 'Religion',
    ability: 'wisdom'
  },
  {
    id: 'society',
    name: 'Society',
    ability: 'intelligence'
  },
  {
    id: 'stealth',
    name: 'Stealth',
    ability: 'dexterity'
  },
  {
    id: 'survival',
    name: 'Survival',
    ability: 'wisdom'
  },
  {
    id: 'thievery',
    name: 'Thievery',
    ability: 'dexterity'
  }
] as const;

export const Alignments = [
  {
    id: 'lawful',
    name: 'Lawful'
  },
  {
    id: 'chaotic',
    name: 'Chaotic'
  },
  {
    id: 'evil',
    name: 'Evil'
  },
  {
    id: 'good',
    name: 'Good'
  },
  {
    id: 'neutral',
    name: 'Neutral'
  }
] as const;

export const SightTypes = [
  {
    id: 'normal',
    name: 'Normal'
  },
  {
    id: 'darkvision',
    name: 'Darkvision'
  },
  {
    id: 'low-light-vision',
    name: 'Low-light Vision'
  },
  {
    id: 'greater-darkvision',
    name: 'Darkvision'
  },
  {
    id: 'true-seeing',
    name: 'True Seeing'
  }
] as const;

export const SenseTypes = [
  ...SightTypes,
  {
    id: 'scent',
    name: 'Scent'
  }
] as const;

export const DamageTypes = [
  {
    id: 'acid',
    name: 'Acid'
  },
  {
    id: 'bludgeoning',
    name: 'Bludgeoning'
  },
  {
    id: 'cold',
    name: 'Cold'
  },
  {
    id: 'electricity',
    name: 'Electricity'
  },
  {
    id: 'fire',
    name: 'Fire'
  },
  {
    id: 'force',
    name: 'Force'
  },
  {
    id: 'mental',
    name: 'Mental'
  },
  {
    id: 'negative',
    name: 'Negative'
  },
  {
    id: 'physical',
    name: 'Physical'
  },
  {
    id: 'piercing',
    name: 'Piercing'
  },
  {
    id: 'poison',
    name: 'Poison'
  },
  {
    id: 'positive',
    name: 'Positive'
  },
  {
    id: 'precision',
    name: 'Precision'
  },
  {
    id: 'slashing',
    name: 'Slashing'
  },
  {
    id: 'sonic',
    name: 'Sonic'
  },
  {
    id: 'untyped',
    name: 'Untyped'
  },
  ...Alignments
] as const;
