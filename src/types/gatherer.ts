export interface GathererCard {
  name: string;
  names: string[];
  manaCost: string;
  cmc: number;
  colors: string[];
  colorIdentity: string[];
  type: string;
  supertypes: string[];
  types: string[];
  subtypes: string[];
  rarity: string;
  set: string;
  text: string;
  artist: string;
  number: string;
  power: string;
  toughness: string;
  layout: string;
  multiverseid: number;
  imageUrl: string;
  rulings: Ruling[];
  foreignNames: ForeignName[];
  printings: string[];
  originalText: string;
  originalType: string;
  /**
   * A unique id for this card. It is made up by doing an SHA1 hash of setCode + cardName + cardImageName
   */
  id: string;
}

export interface Ruling {
  date: string;
  text: string;
}

export interface ForeignName {
  name: string;
  language: string;
  multiverseid: number;
}
