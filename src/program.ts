import { program } from 'commander';
import { OptionsType, ProgrammOptionsType } from './types';

const startProgram = (
	name: string,
	description: string,
	options: ProgrammOptionsType[],
	action: (_: string, options: { _optionValues: OptionsType }) => void
) => {
	program.name(name).description(description);

	for (const option of options) {
		const short =
			(option.short?.startsWith('-')
				? option.short
				: `-${option.short}`) || `-${option.name.charAt(0)}`;
		const long =
			option.long ||
			`--${option.name} ${option.array ? '[' : '<'}${option.name}${
				option.array ? 's...]' : '>'
			}`;
		if (option.required) {
			program.requiredOption(
				`${short}, ${long}`,
				option.description || '',
				option.defaultValue
			);
		} else {
			program.option(
				`${short}, ${long}`,
				option.description || '',
				option.defaultValue
			);
		}
	}

	program.action(action);

	program.parse();
};

export default startProgram;
