import { DamageDiceOptions } from "../damageDiceModel";
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
		stature: string,
	} = { primary: '', secondary: '', stature: '' }

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
			damageDice: string,
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

		skills_and_expertises: Record<string, number>,
	} = {
		known_languages: 0,
		magical_synergy: 0,
		weapon_specialisations: 0,

		verve: 0,
		mana: 0,
		psi: 0,

		skills_and_expertises: {
			"99d6763b": 4,
			"eda86c1e": 2,
			"c829531f": 1,
		}
	}

	// Spellcraft Values
	magical_synergies: string[] = [];
	spells: string[] = [];

	// Inventory Values
	inventory: Record<string, string> = {
		item1: "",
		item2: "",
		item3: "",
	}

	// Notes Values
	notes: Record<string, string> = {
		item1: "",
		item2: "",
		item3: "",
	}


	// Constructor
	constructor(data?: GenericModel) {
		if (data) {
			console.log(">> Character", data);
			this.id = data.id;
			this.name = data.name;
			this.profile_photo = data.profile_photo;
			this.race = data.race;
			this.sessions = data.sessions || 0;
			this.speed = data.speed;
			this.source = data.source;
			this.languages = data.languages || [];
			this.updated = data.updated;
			this.racial_mods = data.racial_mods;
			this.attributes = data.attributes;
			this.attributeslocked = data.attributeslocked;
			this.points = data.points;
			this.verve = data.verve;
			this.mana = data.mana;
			this.psi = data.psi;
			this.armour = data.armour;
			this.resistances = data.resistances;
			this.statuses = data.statuses || [];
			this.weapons = data.weapons || [];
			this.weapon_specialisations = data.weapon_specialisations || [];
			this.purchases = data.purchases;
			this.magical_synergies = data.magical_synergies || [];
			this.spells = data.spells || [];
			this.inventory = data.inventory;
			this.notes = data.notes;
		}
	}

	// Modifiers
	update(updatePath: string, value: string | number) {
		// Duplicate the object to break readability
		const data = JSON.parse(JSON.stringify(this));

		// Follow the path to find the property we need
		const pathSplit = updatePath.split(".");
		let property = data;
		pathSplit.forEach((pathKey, index: number) => {
			if (index == pathSplit.length-1) {
				property[pathKey] = value;
			} else {
				property = property[pathKey];
				if (!property) throw new Error("Path key not found");
			}
		});

		// Return a new character based on this
		return new CharacterModel(data);
	}
}