import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { CharacterModel, WeaponDefinition } from "../../features/models/character/characterModel";
import { SynergyModel } from "../../features/models/synergyModel";
import { PsionicPowerModel } from "../../features/models/psionicPowerModel";
import { SpellModel } from "../../features/models/spellModel";

type CharacterSheetContextType = {
	character: CharacterModel;
	purchaseMode: string;
	setPurchaseMode: (value: string) => void;
	characterPurchaseUpdater: (updatePath: string, isSkill?: boolean) => void;
	characterValueUpdater: (updatePath: string) => void;
	updateCharacterValue: (updatePath: string, value: string | number | WeaponDefinition) => void;
	characterSheetSearch: string;
	maxSkillPoints: number;
	setAbilityModalVisible: Dispatch<SetStateAction<boolean>>;
	setAbilityModalSource: Dispatch<SetStateAction<SpellModel | PsionicPowerModel | SynergyModel | undefined>>;
};

export const CharacterSheetContext = createContext<CharacterSheetContextType | undefined>(undefined);

// Create a context of character data, but can be overridden to blank values if needs be
export const useCharacterContext = (disableContext: boolean = true) => {
	const context = useContext(disableContext && undefined || CharacterSheetContext);
	if (context === undefined && !disableContext) {
	  throw new Error("No context, and disableContext not passed");
	}

	return {
	  ...context,
	} as CharacterSheetContextType;
  };