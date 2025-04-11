import { useState } from "react";

export const useToggleableBooleanState = (initialValue?: boolean): [boolean, () => void] => {
	const [isTrue, setIsTrue] = useState<boolean>(initialValue || false);
	const toggle = () => setIsTrue(!isTrue);

	return [isTrue, toggle];
}