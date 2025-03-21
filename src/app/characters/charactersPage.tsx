import { ChangeEvent, useState } from "react";
import { Link } from "react-router";
import { useAppSelector } from "../../features/hooks";
import { RootState } from "../../features/store";
import { GenericModel } from "../../features/models/genericModel";

import st from './charactersPage.module.css';

function CharactersPage() {
	const characters = useAppSelector((state: RootState) => state.charactersData.characters);

	const [newCharacterName, setNewCharacterName] = useState('');
	const onChangeCharacterName = (event: ChangeEvent<HTMLInputElement>) => {
		setNewCharacterName(event.target.value);
	}
	const createNewCharacter = () => {
		if (newCharacterName.length < 2) console.log('Too short');
		else console.log("CREATE");
	}

	return (
		<>
			<div className={st.characterBlock}>
				<h1>Characters</h1>
				{characters.length && characters.map((character: GenericModel) => (
					<Link className={st.characterLink + " trattatello"} key={`${character.id}`} to={`/characters/${character.id}`}>{character.name}</Link>
				))}
			</div>
			<hr />
			<div className={st.characterBlock}>
				<h1>Create a new character</h1>
				<div className={st.newCharacterForm}>
					<input type="text" value={newCharacterName} placeholder="Name" onChange={onChangeCharacterName} />
					<button onClick={createNewCharacter}>Create</button>
				</div>
			</div>
		</>
	)
}

export default CharactersPage;
