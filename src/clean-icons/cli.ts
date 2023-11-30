import { OptionsType, ProgrammOptionsType } from '../types';
import cleanIcons from "./index";
import startProgram from "../program";


const options: ProgrammOptionsType[] = [
	{
		name: 'ignoreGlobs',
		short: 'ig',
		description: 'Path icon glob to exclude from the fonts',
		array: true
	},
	{
		name: 'src',
		description: 'Src folder with all svgs',
		required: true
	},
	{
		name: 'debug',
		description: 'Extra logging',
		defaultValue: false
	}
];

const action = async (_: string, options: { _optionValues: OptionsType }) => {
	const { src, ignoreGlobs, debug } = options._optionValues;
	await cleanIcons(src, ignoreGlobs, debug);
};

startProgram(
	'@db-ui/foundations - clean icons',
	'CLI to clean icon for icon fonts to work',
	options,
	action
);
