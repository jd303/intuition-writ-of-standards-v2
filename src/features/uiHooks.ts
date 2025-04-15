import { useEffect, useState } from "react";

export const useToggleableBooleanState = (initialValue?: boolean): [boolean, () => void] => {
	const [isTrue, setIsTrue] = useState<boolean>(initialValue || false);
	const toggle = () => setIsTrue(!isTrue);

	return [isTrue, toggle];
}

export const useDebounce = <T>(value: T, delay: number): T => {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debouncedValue;
}