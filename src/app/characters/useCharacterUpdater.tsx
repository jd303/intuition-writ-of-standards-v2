import { useEffect, useMemo, useRef, useState } from "react";
import { saveCharacter } from '../../features/firebase/data/writeCharactersData';
import { CharacterModel } from "../../features/models/character/characterModel";
import { useAppSelector } from "../../features/firebaseHooks";

export const useCharacterUpdater = (characterId: string) => {
	// Constants
	const dbWriteDelay = 1500;
	const updateDelay = 50;

	// Setup
	const [purchaseMode, setPurchaseMode] = useState('default');
	const characterSaveTimeout = useRef<NodeJS.Timeout>(null);
	const characterValueUpdateTimeout = useRef<NodeJS.Timeout>(null);
	const [characterUpdated, setCharacterUpdated] = useState<boolean>(false);

	// Character Data
	const charactersData = useAppSelector((state) => state.charactersData.characters);
	const characterFromData = charactersData.find((character: CharacterModel) => character.id == characterId);
	const [character, setCharacter] = useState<CharacterModel>(new CharacterModel(characterFromData!));
	const totalPoints = useMemo(() => character.baseCharacterPoints + character.vitae.sessions + character.points.bonus, [character]);

	useEffect(() => {
		if (characterUpdated) {
			if (characterSaveTimeout.current) clearTimeout(characterSaveTimeout.current);
			characterSaveTimeout.current = setTimeout(() => {
				saveCharacter(charactersData, character);
				setCharacterUpdated(false);
			}, dbWriteDelay);
		}
	}, [characterUpdated]);

	const updateCharacterValue = (updatePath: string | string[], value: unknown | unknown[]) => {
		const updatedCharacter = character.updateValue(updatePath, value!);
		updateCharacter(updatedCharacter);
	}
	const updateCharacterPurchases = (updatePath: string, isSkill: boolean) => {
		if (purchaseMode == "none") return;
		if (purchaseMode == "buy" && character.points.spent >= totalPoints) return;
		const updatedCharacter = character.updatePurchase(updatePath, isSkill, purchaseMode == "buy");
		updateCharacter(updatedCharacter, true);
	}

	const characterValueUpdater = (updatePath: string) => {
		return (value: string | number | boolean | void) => updateCharacterValue(updatePath, value);
	}
	const characterPurchaseUpdater = (updatePath: string, isSkill?: boolean): () => void => {
		return () => updateCharacterPurchases(updatePath, isSkill || false);
	}

	const updateCharacter = (updatedCharacter: CharacterModel, suppressDelay?: boolean) => {
		if (characterValueUpdateTimeout.current) clearTimeout(characterValueUpdateTimeout.current);
		characterValueUpdateTimeout.current = setTimeout(() => {
			setCharacter(updatedCharacter);
			setCharacterUpdated(true);
		}, suppressDelay ? 0 : updateDelay);
	}

	return {
		updateCharacterValue,
		characterValueUpdater,
		updateCharacterPurchases,
		characterPurchaseUpdater,
		updateCharacter,
		totalPoints,
		character,
		purchaseMode,
		setPurchaseMode,
	};
}