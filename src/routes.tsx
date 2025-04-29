import { ReactElement } from "react";
import Account from "./app/account/account";
import CharactersPage from "./app/characters/charactersPage";
import CharacterSheetPage from "./app/characters/characterSheetPage";
import CharacterCombatPage from "./app/characters/characterCombatPage";
import RulesPage from "./app/rules/rulesPage";
import GlossaryPage from "./app/rules/glossaryPage";
import MovesPage from "./app/rules/movesPage";
import StatusesPage from "./app/rules/statusesPage";
import DMToolsPage from "./app/dmtools/dmtools";
import DMMenageriePage from "./app/dmtools/dmMenageriePage";
import DMCombatPage from "./app/dmtools/dmCombatPage";
import MagicGuidePage from "./app/magic/magicGuidePage";
import MagicSpellsPage from "./app/magic/magicSpellsPage";
import EquipmentPage from "./app/equipment/equipmentPage";
import CompanionsPage from "./app/companions/companionsPage";
import CompanionMovesPage from "./app/companions/companionMovesPage";
import CompanionsGuidePage from "./app/companions/companionsGuidePage";
import AlchemyGuidePage from "./app/alchemy/alchemyGuidePage";
import AlchemyRecipesPage from "./app/alchemy/alchemyRecipesPage";
import AlchemyReagentsPage from "./app/alchemy/alchemyReagentsPage";
import GadgetsGuidePage from "./app/gadgets/gadgetsGuidePage";
import GadgetsPage from "./app/gadgets/gadgetsPage";
import PsionicsGuidePage from "./app/psionics/psionicsGuidePage";
import PsionicPowersPage from "./app/psionics/psionicsPowersPage";

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
		label: "Character List",
		sectionColour: 'cobalt',
		element: <CharactersPage />,
		parentRoute: true,
		sectionName: 'characterInfo',
	},
	{
		path: "/characters/:id",
		authLevel: 1,
		label: "Character",
		sectionColour: 'cobalt',
		element: <CharacterSheetPage />,
		parentRoute: false,
		omitFromSubNav: true,
		sectionName: 'characterInfo',
	},
	{
		path: "/characters/:id/combat",
		authLevel: 1,
		label: "Combat Sheet",
		sectionColour: 'cobalt',
		element: <CharacterCombatPage />,
		parentRoute: false,
		omitFromSubNav: true,
		sectionName: 'characterInfo',
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
		path: "/psionics",
		authLevel: 0,
		label: "Psionics",
		sectionColour: 'scarlet',
		element: <PsionicsGuidePage />,
		parentRoute: true,
		sectionName: 'psionics',
	},
	{
		path: "/psionics/guide",
		authLevel: 0,
		label: "Guide",
		sectionColour: 'scarlet',
		element: <PsionicsGuidePage />,
		parentRoute: false,
		sectionName: 'psionics',
	},
	{
		path: "/psionics/powers",
		authLevel: 0,
		label: "Powers",
		sectionColour: 'scarlet',
		element: <PsionicPowersPage />,
		parentRoute: false,
		sectionName: 'psionics',
	},

	{
		path: "/alchemy",
		authLevel: 0,
		label: "Alchemy",
		sectionColour: 'cyan',
		element: <AlchemyGuidePage />,
		parentRoute: true,
		sectionName: 'alchemy',
	},
	{
		path: "/alchemy/guide",
		authLevel: 0,
		label: "Guide",
		sectionColour: 'cyan',
		element: <AlchemyGuidePage />,
		parentRoute: false,
		sectionName: 'alchemy',
	},
	{
		path: "/alchemy/recipes",
		authLevel: 0,
		label: "Recipes",
		sectionColour: 'cyan',
		element: <AlchemyRecipesPage />,
		parentRoute: false,
		sectionName: 'alchemy',
	},
	{
		path: "/alchemy/reagents",
		authLevel: 0,
		label: "Reagents",
		sectionColour: 'cyan',
		element: <AlchemyReagentsPage />,
		parentRoute: false,
		sectionName: 'alchemy',
	},

	{
		path: "/gadgetry",
		authLevel: 0,
		label: "Gadgetry",
		sectionColour: 'cobalt',
		element: <GadgetsGuidePage />,
		parentRoute: true,
		sectionName: 'gadgetry',
	},
	{
		path: "/gadgetry/guide",
		authLevel: 0,
		label: "Guide",
		sectionColour: 'cobalt',
		element: <GadgetsGuidePage />,
		parentRoute: false,
		sectionName: 'gadgetry',
	},
	{
		path: "/gadgetry/gadgets",
		authLevel: 0,
		label: "Gadgets",
		sectionColour: 'cobalt',
		element: <GadgetsPage />,
		parentRoute: false,
		sectionName: 'gadgetry',
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
		element: <DMMenageriePage />,
		parentRoute: false,
	},
	{
		path: "/combat",
		authLevel: 2,
		label: "Combat",
		sectionColour: 'silver',
		sectionName: 'dm-tools',
		element: <DMCombatPage />,
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
	omitFromSubNav?: boolean,
}