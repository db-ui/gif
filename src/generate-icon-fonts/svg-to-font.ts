import path from 'node:path';

import svgtofont from 'svgtofont';
import { OptionsType } from '../types';

const svgToFont = async (
	temporaryDirectory: string,
	dist: string,
	options: OptionsType
) => {
	const { fontName, debug } = options;
	const fileName = __filename;
	let lastSlashIndex = fileName.lastIndexOf('\\');
	if (lastSlashIndex === -1) {
		lastSlashIndex = fileName.lastIndexOf('/');
	}

	const generateIconFontsDir = fileName.slice(0, Math.max(0, lastSlashIndex));

	try {
		return svgtofont({
			src: temporaryDirectory,
			dist,
			fontName,
			log: debug,
			css: true,
			outSVGReact: false, // TODO: Consider if we want to give this to users
			outSVGPath: false,
			useNameAsUnicode: true,
			generateInfoData: true,
			// SvgoOptions: TODO: https://github.com/svg/svgo#configuration,
			svgicons2svgfont: {
				fontHeight: 1000,
				normalize: true,
				centerHorizontally: true
			},
			website: {
				index: 'font-class',
				template: path.resolve(
					generateIconFontsDir,
					'templates/template.ejs'
				),
				links: [{ title: '', url: '' }]
			},
			styleTemplates: path.resolve(generateIconFontsDir, 'styles')
		});
	} catch (error) {
		console.error(error);
	}

	return true;
};

export default svgToFont;
