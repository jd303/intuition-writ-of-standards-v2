#!/bin/zsh

firebase database:set /animal_companions ./database/animal_companions.formatted.json -f;
firebase database:set /characters ./database/characters.formatted.json -f;
firebase database:set /combats ./database/combats.formatted.json -f;
firebase database:set /data_standards ./database/data_standards.formatted.json -f;
firebase database:set /dcs ./database/dcs.formatted.json -f; 
firebase database:set /equipment ./database/equipment.formatted.json -f; 
firebase database:set /gadgets ./database/gadgets.formatted.json -f; 
firebase database:set /languages ./database/languages.formatted.json -f; 
firebase database:set /menagerie ./database/menagerie.formatted.json -f;
firebase database:set /menagerie_v2 ./database/menagerie.formatted.json -f;
firebase database:set /companionmoves ./database/companionmoves.formatted.json -f;
firebase database:set /moves ./database/moves.formatted.json -f;
firebase database:set /moves_v2 ./database/moves_v2.formatted.json -f;
firebase database:set /racial_bonuses ./database/racial_bonuses.formatted.json -f; 
firebase database:set /sources ./database/sources.formatted.json -f;
firebase database:set /synergies ./database/synergies.formatted.json -f;
firebase database:set /spells ./database/spells.formatted.json -f; 
firebase database:set /statuses ./database/statuses.formatted.json -f; 
firebase database:set /weapon_specialisations ./database/weapon_specialisations.formatted.json -f;