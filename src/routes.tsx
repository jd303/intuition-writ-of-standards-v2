import { ReactElement } from "react";
import Account from "./app/account/account";
import CharactersPage from "./app/characters/charactersPage";
import CharacterSheetPage from "./app/characters/characterSheetPage";
import RulesPage from "./app/rules/rulesPage";
import GlossaryPage from "./app/rules/glossaryPage";
import MovesPage from "./app/rules/movesPage";
import StatusesPage from "./app/rules/statusesPage";
import DMToolsPage from "./app/dmtools/dmtools";
import MagicGuidePage from "./app/magic/magicGuidePage";
import MagicSpellsPage from "./app/magic/magicSpellsPage";
import MagicPotionsPage from "./app/magic/magicPotionsPage";
import MagicEnchantingPage from "./app/magic/magicEnchantingPage";
import EquipmentPage from "./app/equipment/equipmentPage";
import CompanionsPage from "./app/companions/companionsPage";
import CompanionMovesPage from "./app/companions/companionMovesPage";
import CompanionsGuidePage from "./app/companions/companionsGuidePage";

export const routes: RouteDefinition[] = [
	{
		indexPage: true,
		authLevel: 0,
		path: "/",
		label: "Home",
		sectionColour: 'silver',
		parentRoute: true,
	},

	{
		path: "/account",
		authLevel: 0,
		label: "Account",
		sectionColour: 'silver',
		element: <Account key="account" />,
		parentRoute: true,
	},

	{
		path: "/characters",
		authLevel: 1,
		label: "Characters",
		sectionColour: 'cobalt',
		element: <CharactersPage />,
		parentRoute: true,
	},
	{
		path: "/characters/:id",
		authLevel: 1,
		label: "Character Sheet",
		sectionColour: 'cobalt',
		element: <CharacterSheetPage />,
		parentRoute: false,
	},

	{
		path: "/rules",
		authLevel: 0,
		label: "Moves & Rules",
		sectionColour: 'orange',
		element: <MovesPage />,
		parentRoute: true,
		sectionName: 'rules',
	},
	{
		path: "/rules/moves",
		authLevel: 0,
		label: "Moves",
		sectionColour: 'orange',
		element: <MovesPage />,
		sectionName: 'rules',
	},
	{
		path: "/rules/statuses",
		authLevel: 0,
		label: "Statuses",
		sectionColour: 'orange',
		element: <StatusesPage />,
		sectionName: 'rules',
	},
	{
		path: "/rules/rules",
		authLevel: 0,
		label: "Rules",
		sectionColour: 'orange',
		element: <RulesPage />,
		sectionName: 'rules',
	},
	{
		path: "/rules/glossary",
		authLevel: 0,
		label: "Glossary",
		sectionColour: 'orange',
		element: <GlossaryPage />,
		sectionName: 'rules',
	},

	{
		path: "/magic",
		authLevel: 0,
		label: "Magic",
		sectionColour: 'purple',
		parentRoute: true,
		element: <MagicGuidePage />,
		sectionName: 'magic',
	},
	{
		path: "/magic/guide",
		authLevel: 0,
		label: "Guide",
		sectionColour: 'purple',
		parentRoute: false,
		element: <MagicGuidePage />,
		sectionName: 'magic',
	},
	{
		path: "/magic/spells",
		authLevel: 0,
		label: "Spells",
		sectionColour: 'purple',
		parentRoute: false,
		element: <MagicSpellsPage />,
		sectionName: 'magic',
	},
	{
		path: "/magic/potions",
		authLevel: 0,
		label: "Potions",
		sectionColour: 'purple',
		parentRoute: false,
		element: <MagicPotionsPage />,
		sectionName: 'magic',
	},
	{
		path: "/magic/enchanting",
		authLevel: 0,
		label: "Enchanting",
		sectionColour: 'purple',
		parentRoute: false,
		element: <MagicEnchantingPage />,
		sectionName: 'magic',
	},

	{
		path: "/psionics",
		authLevel: 0,
		label: "Psionics",
		sectionColour: 'scarlet',
		parentRoute: true,
	},

	{
		path: "/Alchemy",
		authLevel: 0,
		label: "Alchemy",
		sectionColour: 'cyan',
		parentRoute: true,
	},

	{
		path: "/gadgetry",
		authLevel: 0,
		label: "Gadgetry",
		sectionColour: 'cobalt',
		parentRoute: true,
	},

	{
		path: "/equipment",
		authLevel: 0,
		label: "Equipment",
		sectionColour: 'mustard',
		element: <EquipmentPage />,
		parentRoute: true,
	},

	{
		path: "/companions",
		authLevel: 0,
		label: "Companions",
		sectionColour: 'green',
		element: <CompanionsGuidePage />,
		parentRoute: true,
		sectionName: 'companions',
	},
	{
		path: "/companions/guide",
		authLevel: 0,
		label: "Guide",
		sectionColour: 'green',
		element: <CompanionsGuidePage />,
		parentRoute: false,
		sectionName: 'companions',
	},
	{
		path: "/companions/list",
		authLevel: 0,
		label: "Companions",
		sectionColour: 'green',
		element: <CompanionsPage />,
		parentRoute: false,
		sectionName: 'companions',
	},
	{
		path: "/companions/moves",
		authLevel: 0,
		label: "Moves",
		sectionColour: 'green',
		element: <CompanionMovesPage />,
		parentRoute: false,
		sectionName: 'companions',
	},

	{
		path: "/dm-tools",
		authLevel: 2,
		label: "DM Tools",
		sectionColour: 'silver',
		sectionName: 'dm-tools',
		element: <DMToolsPage />,
		parentRoute: true,
	},
	{
		path: "/dm-tools/tools",
		authLevel: 2,
		label: "DM Tools",
		sectionColour: 'silver',
		sectionName: 'dm-tools',
		element: <DMToolsPage />,
		parentRoute: false,
	},
	{
		path: "/menagerie",
		authLevel: 2,
		label: "Menagerie",
		sectionColour: 'silver',
		sectionName: 'dm-tools',
		element: <DMToolsPage />,
		parentRoute: false,
	},
	{
		path: "/combat",
		authLevel: 2,
		label: "Combat",
		sectionColour: 'silver',
		sectionName: 'dm-tools',
		element: <DMToolsPage />,
		parentRoute: false,
	}
];

export interface RouteDefinition {
	indexPage?: boolean,
	authLevel: 0 | 1 | 2,
	path: string,
	label: string,
	element?: ReactElement,
	sectionName?: string,
	sectionColour: 'silver' | 'orange' | 'cyan' | 'purple' | 'scarlet' | 'cobalt' | 'mustard' | 'green',
	parentRoute?: boolean,
}