#!/usr/bin/env node

import { gifOptions } from './data';
import { OptionsType } from '../types';
import startProgram from '../program';
import generateIconFonts from './index';

const action = async (_: string, options: { _optionValues: OptionsType }) => {
	const values = options._optionValues;
	generateIconFonts(values);
};

startProgram(
	'@db-ui/gif - generate icon fonts',
	'CLI to generate icon fonts for DB UX Design System',
	gifOptions,
	action
);
