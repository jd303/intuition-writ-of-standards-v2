import { GenericModel } from "./genericModel";

export class CharacterModel {
	// Initial Values
	baseCharacterPoints = 24; // How many you start with at Session 0, adding 1 for session 1.
	baseVerve = 20; // How many Verve you start with
	vervePerPoint = 5;
	baseMana = 3; // How many Mana you start with
	manaPerPoint = 3;
	basePsi = 3; // How many Psi you start with
	psiPerPoint = 1;

	// Vitae values
	id: string = "";
	name: string = "New Character";
	profile_photo: string = '';
	race: string = "Provide Race";
	sessions: number = 0;
	speed: number = 5;
	source: string = '';
	languages: string[] = [];
	updated: number = 0;
	racial_mods: {
		primary: string,
		secondary: string
	} = { primary: '', secondary: '' }

	// Attribute Values
	attributes: Record<string, number> = {
		strength: 0,
		constitution: 0,
		dexterity: 0,
		intelligence: 0,
		wisdom: 0,
		charisma: 0,
	}

	attributeslocked: boolean = false;

	// Point Values
	points: {
		bonus: number,
		spent: number
	} = {
		bonus: 0,
		spent: 0
	}

	// Resource Values
	verve: {
		current: number,
		bonus: number,
	} = {
		current: 0,
		bonus: 0,
	}

	mana: {
		current: number,
		bonus: number,
		enchant_bind: number
	} = {
		current: 0,
		bonus: 0,
		enchant_bind: 0
	}

	psi: {
		current: number,
		bonus: number,
	} = {
		current: 0,
		bonus: 0,
	}

	// Defences Values
	armour: {
		name: string,
		bonus: number,
	} = {
		name: "Provide Armour",
		bonus: 0,
	}

	resistances: {
		URes: number,
		PRes: number,
		MRes: number,
		PyRes: number,
		CryRes: number,
		ElecRes: number,
		ZephRes: number,
		SonRes: number,
		AcidRes: number,
		UmbralRes: number,
		LuminalRes: number,
	} = {
		URes: 0,
		PRes: 0,
		MRes: 0,
		PyRes: 0,
		CryRes: 0,
		ElecRes: 0,
		ZephRes: 0,
		SonRes: 0,
		AcidRes: 0,
		UmbralRes: 0,
		LuminalRes: 0,
	}

	statuses: string[] = [];

	// Combat Values
	weapons: [
		{
			name: string,
			damageDice: DamageDiceType,
			bonus_raw: number,
			bonus_damage: number
			special: string
		}?
	] = [];

	weapon_specialisations: string[] = [];

	// Purchase Values
	purchases: {
		known_languages: number,
		magical_synergy: number,
		weapon_specialisations: number,

		verve: number,
		mana: number,
		psi: number,

		skills: Record<string, SkillPurchase>,
	} = {
		known_languages: 0,
		magical_synergy: 0,
		weapon_specialisations: 0,

		verve: 0,
		mana: 0,
		psi: 0,

		skills: {}
	}

	// Spellcraft Values
	magical_synergies: string[] = [];
	spells: string[] = [];

	// Admin Values
	inventory: string[] = [];
	notes: string = "";

	constructor(characterData?: GenericModel) {
		console.log("CHARACTER LOADED", characterData);
	}
}

interface SkillPurchase {
	id: string;
	points: number;
}

enum DamageDiceType {
	"d4" = "d4",
	"d6" = "d6",
	"d8" = "d8",
	"d10" = "d10",
	"d12" = "d12",
	"d20" = "d20",
	"2d4" = "2d4",
	"2d6" = "2d6",
	"2d8" = "2d8",
	"2d10" = "2d10",
	"2d12" = "2d12",
	"2d20" = "2d20",
}