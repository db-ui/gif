import { globSync } from 'glob';

import SVGFixer from 'oslllo-svg-fixer';
import { GlobOptionsWithFileTypesFalse } from 'glob/dist/commonjs/glob';

const cleanIcons = async (
	src: string,
	ignoreGlobs?: string[],
	debug?: boolean
) => {
	const paths = `${src}/**/*.svg`;
	const options: GlobOptionsWithFileTypesFalse = {};
	if (ignoreGlobs) {
		options.ignore = ignoreGlobs;
	}

	const globPaths = globSync(paths, options)
		.map((path) => path.replace(/\\/g, '/'))
		.map((path) => path.slice(0, Math.max(0, path.lastIndexOf('/'))))
		.filter((v, i, self) => i === self.indexOf(v));

	for (const path of globPaths) {
		// eslint-disable-next-line no-await-in-loop,new-cap
		await SVGFixer(path, path, { showProgressBar: debug }).fix();
	}
};

export default cleanIcons;
