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
	updated: number = 0;
	vitae: VitaeRecord = {
		name: "New Character",
		profile_photo: '',
		race: '',
		sessions: 0,
		speed: 5,
		source: '',
		languages: [],

		racial_mods: {
			primary: '',
			secondary: '',
			stature: '',
		}
	}

	// Attribute Values
	attributes: Record<string, number> = {
		str: 0,
		con: 0,
		dex: 0,
		int: 0,
		wis: 0,
		cha: 0,
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
	weapons: WeaponDefinition[] = [
		{
			name: '',
			damageDice: 'd4',
			bonus_raw: 0,
			bonus_damage: 0,
			special: ''
		},
		{
			name: '',
			damageDice: 'd4',
			bonus_raw: 0,
			bonus_damage: 0,
			special: ''
		}
	];

	weapon_specialisations: string[] = [];

	// Purchase Values
	purchases: CharacterPurchasesModel = {
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
			this.updated = data.updated;
			this.vitae.name = data.vitae.name;
			this.vitae.profile_photo = data.vitae.profile_photo;
			this.vitae.race = data.vitae.race;
			this.vitae.sessions = data.vitae.sessions || 0;
			this.vitae.speed = data.vitae.speed;
			this.vitae.source = data.vitae.source;
			this.vitae.languages = data.vitae.languages || [];
			this.vitae.racial_mods = data.vitae.racial_mods;
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
	updateValue(updatePath: string | string[], value: unknown | unknown[]) {
		// Duplicate the object
		const data = JSON.parse(JSON.stringify(this));

		if (!Array.isArray(updatePath)) updatePath = [updatePath];
		if (!Array.isArray(value)) value = [value];
		if (updatePath.length != (value as unknown[]).length) throw new Error('Keys and values count do not match');

		// Iterate over the updatePaths
		updatePath.forEach((thisPath, pathIndex) => {
			// Follow the path to find the property we need
			const pathSplit = thisPath.split(".");
			let property = data;
			pathSplit.forEach((pathKey, index: number) => {
				if (index == pathSplit.length - 1) {
					property[pathKey] = (value as unknown[])[pathIndex];
				} else {
					property = property[pathKey];
					if (!property) throw new Error("Path key not found");
				}
			});
		});

		// Cleanup Statuses
		data.statuses = data.statuses.filter((st: string) => st.length > 0);

		// Return a new character based on this
		return new CharacterModel(data);
	}

	updatePurchase(purchaseKey: string, isSkill: boolean, increment: boolean) {
		// Duplicate the object
		const data = JSON.parse(JSON.stringify(this));

		if (isSkill) {
			if (!data.purchases.skills_and_expertises[purchaseKey]) data.purchases.skills_and_expertises[purchaseKey] = 0;

			if (increment) {
				data.purchases.skills_and_expertises[purchaseKey] += 1;
				data.points.spent += 1;
			} else if (!increment && data.purchases.skills_and_expertises[purchaseKey] > 0) {
				data.purchases.skills_and_expertises[purchaseKey] -= 1;
				data.points.spent -= 1;
			}
		} else {
			if (!data.purchases[purchaseKey]) data.purchases[purchaseKey] = 0;

			if (increment) {
				data.purchases[purchaseKey] += 1;
				data.points.spent += 1;
			} else if (!increment && data.purchases[purchaseKey] > 0) {
				data.purchases[purchaseKey] = Math.max(0, data.purchases[purchaseKey] - 1);
				data.points.spent -= 1;
			}
		}

		return new CharacterModel(data);
	}
}

interface VitaeRecord {
	name: string;
	profile_photo: string;
	race: string
	sessions: number;
	speed: number;
	source: string;
	languages: string[];
	racial_mods: {
		primary: string,
		secondary: string
		stature: string,
	}
}

interface WeaponDefinition {
	name: string;
	damageDice: string;
	bonus_raw: number;
	bonus_damage: number;
	special: string;
}

export interface CharacterPurchasesModel {
	known_languages: number;
	magical_synergy: number;
	weapon_specialisations: number;

	verve: number;
	mana: number;
	psi: number;

	skills_and_expertises: Record<string, number>;
}