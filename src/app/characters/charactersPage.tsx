import { ChangeEvent, useState } from "react";
import { Link } from "react-router";
import { v4 as uuidv4 } from 'uuid';
import { useAppSelector } from "../../features/firebaseHooks";
import { RootState } from "../../features/store";
import { CharacterModel } from "../../features/models/character/characterModel";

import st from './charactersPage.module.css';
import ConfirmButton from "../components/confirmButton/confirmButton";
import { writeCharactersData } from "../../features/firebase/data/writeCharactersData";


function CharactersPage() {
	const characters = useAppSelector((state: RootState) => state.charactersData.characters);
	const [createCharacterError, setCreateCharacterError] = useState('');

	const [newCharacterName, setNewCharacterName] = useState('');
	const onChangeCharacterName = (event: ChangeEvent<HTMLInputElement>) => {
		setNewCharacterName(event.target.value);
	}
	const createNewCharacter = () => {
		if (newCharacterName.length < 2) return setCreateCharacterError('That character name is too short');

		const charactersArray: CharacterModel[] = characters?.length && [...characters] || [];
		const characterData = new CharacterModel();
		characterData.id = uuidv4();
		characterData.vitae.name = newCharacterName;
		charactersArray.push(characterData);
		writeCharactersData(charactersArray);
	}

	const deleteCharacter = (id: string) => {
		const charactersArray = [...characters].filter((character) => character.id != id);
		writeCharactersData(charactersArray);
	}

	return (
		<>
			<hr />
			<div className={st.characterBlock}>
				<h1>Your Characters</h1>
				{characters?.length && characters.map((character: CharacterModel) => (
					<div className={st.characterItem} key={`${character.id}`}>
						<Link className={st.characterLink + " trattatello"} to={`/characters/${character.id}`}>{character.vitae.name}</Link>
						<ConfirmButton className={st.confirmButton} onClick={() => deleteCharacter(character.id.toString())} label="Delete" />
					</div>
				)) || <p>You do not currently have any characters. Why don't you make someone special?</p>}
				
			</div>
			<div className={st.characterBlock}>
				<h1>Create a new character</h1>
				<div className={st.newCharacterForm}>
					<input type="text" value={newCharacterName} placeholder="Name" onChange={onChangeCharacterName} />
					<ConfirmButton onClick={createNewCharacter} label="Create"></ConfirmButton>
					<div className={st.createCharacterError}>{createCharacterError}</div>
				</div>
			</div>
			<hr />
			<div>
				<h1>Limits</h1>
				<p>There are no limits to how many characters you can create.  Create new characters to explore character concepts and abilities.</p>
				<p>Deleting a character requires that you confirm the deletion.  However do note that deleted characters cannot be recovered.</p>
			</div>
			<hr />
		</>
	)
}

export default CharactersPage;
