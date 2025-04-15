import { createContext, useContext } from "react";
import { CharacterPurchasesModel } from "../../features/models/character/characterModel";

type CharacterSheetContextType = {
	purchaseMode: string;
	setPurchaseMode: (value: string) => void;
	characterRacialBonuses: { primary: string, secondary: string };
	characterPurchases: CharacterPurchasesModel;
	characterPurchaseUpdater: (updatePath: string, isSkill?: boolean) => void;
	characterSheetSearch: string;
	maxMovePoints: number;
	characterStatValues: Record<string, number>;
};

export const CharacterSheetContext = createContext<CharacterSheetContextType | undefined>(undefined);

export const usePurchaseMode = () => {
	const context = useContext(CharacterSheetContext);
	if (!context) {
		throw new Error("usePurchaseMode must be used within a PurchaseModeProvider");
	}
	return context;
};