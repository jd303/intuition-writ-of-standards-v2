import { ReactElement } from "react";
import Account from "./app/account/account";
import Characters from "./app/characters/characters";
import RulesPage from "./app/rules/rulesPage";
import GlossaryPage from "./app/rules/glossary";
import MovesPage from "./app/rules/moves";
import DMToolsPage from "./app/dmtools/dmtools";
import MagicGuidePage from "./app/magic/magicGuidePage";
import MagicSpellsPage from "./app/magic/magicSpellsPage";
import MagicPotionsPage from "./app/magic/magicPotionsPage";
import MagicEnchantingPage from "./app/magic/magicEnchantingPage";

export const routes: RouteDefinition[] = [
	{
		indexPage: true,
		path: "/",
		label: "Home",
		sectionColour: 'silver',
		parentRoute: true,
	},

	{
		path: "/account",
		label: "Account",
		sectionColour: 'silver',
		element: <Account key="account" />,
		parentRoute: true,
	},

	{
		path: "/characters",
		label: "Characters",
		sectionColour: 'cobalt',
		element: <Characters />,
		parentRoute: true,
	},

	{
		path: "/rules",
		label: "Rules",
		sectionColour: 'orange',
		element: <RulesPage />,
		parentRoute: true,
		sectionName: 'rules',
	},
	{
		path: "/rules/rules",
		label: "Rules",
		sectionColour: 'orange',
		element: <RulesPage />,
		sectionName: 'rules',
	},
	{
		path: "/rules/glossary",
		label: "Glossary",
		sectionColour: 'orange',
		element: <GlossaryPage />,
		sectionName: 'rules',
	},
	{
		path: "/rules/moves",
		label: "Moves",
		sectionColour: 'orange',
		element: <MovesPage />,
		sectionName: 'rules',
	},

	{
		path: "/magic",
		label: "Magic",
		sectionColour: 'purple',
		parentRoute: true,
		element: <MagicGuidePage />,
		sectionName: 'magic',
	},
	{
		path: "/magic/guide",
		label: "Guide",
		sectionColour: 'purple',
		parentRoute: false,
		element: <MagicGuidePage />,
		sectionName: 'magic',
	},
	{
		path: "/magic/spells",
		label: "Spells",
		sectionColour: 'purple',
		parentRoute: false,
		element: <MagicSpellsPage />,
		sectionName: 'magic',
	},
	{
		path: "/magic/potions",
		label: "Potions",
		sectionColour: 'purple',
		parentRoute: false,
		element: <MagicPotionsPage />,
		sectionName: 'magic',
	},
	{
		path: "/magic/enchanting",
		label: "Enchanting",
		sectionColour: 'purple',
		parentRoute: false,
		element: <MagicEnchantingPage />,
		sectionName: 'magic',
	},

	{
		path: "/psionics",
		label: "Psionics",
		sectionColour: 'scarlet',
		parentRoute: true,
	},

	{
		path: "/Alchemy",
		label: "Alchemy",
		sectionColour: 'cyan',
		parentRoute: true,
	},

	{
		path: "/gadgetry",
		label: "Gadgetry",
		sectionColour: 'cobalt',
		parentRoute: true,
	},

	{
		path: "/equipment",
		label: "Equipment",
		sectionColour: 'mustard',
		parentRoute: true,
	},

	{
		path: "/companions",
		label: "Companions",
		sectionColour: 'green',
		parentRoute: true,
	},

	{
		path: "/dm-tools",
		label: "DM Tools",
		sectionColour: 'silver',
		sectionName: 'dm-tools',
		element: <DMToolsPage />,
		parentRoute: true,
	},
	{
		path: "/dm-tools/tools",
		label: "DM Tools",
		sectionColour: 'silver',
		sectionName: 'dm-tools',
		element: <DMToolsPage />,
		parentRoute: false,
	},
	{
		path: "/menagerie",
		label: "Menagerie",
		sectionColour: 'silver',
		sectionName: 'dm-tools',
		element: <DMToolsPage />,
		parentRoute: false,
	},
	{
		path: "/combat",
		label: "Combat",
		sectionColour: 'silver',
		sectionName: 'dm-tools',
		element: <DMToolsPage />,
		parentRoute: false,
	}
];

export interface RouteDefinition {
	indexPage?: boolean,
	path: string,
	label: string,
	element?: ReactElement,
	sectionName?: string,
	sectionColour: 'silver' | 'orange' | 'cyan' | 'purple' | 'scarlet' | 'cobalt' | 'mustard' | 'green',
	parentRoute?: boolean,
}