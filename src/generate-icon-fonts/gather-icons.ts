import FSE from 'fs-extra';

import { globSync } from 'glob';
import { OptionsType } from '../types';

const generalPrefix = '';

const availableSizes = [16, 20, 24, 32, 48, 64];
const componentSizes = [24, 20, 16];

const allTemporaryDir = 'all';

const initTemporaryIconFiles = (
	globPaths: string[],
	temporaryDirectory: string,
	prefix?: string
) => {
	const foundIconFiles: string[] = [];

	for (const svgPath of globPaths) {
		const paths = svgPath.split('/');
		let filename: string = paths.at(-1) || '';
		let iconName;
		if (prefix) {
			filename = filename.replace(prefix, '');
		}

		iconName = filename.replace('.svg', '');
		for (const size of availableSizes) {
			iconName = iconName.replace(`_${size}`, '');
		}

		FSE.copyFileSync(
			svgPath,
			`${temporaryDirectory}/${allTemporaryDir}/${generalPrefix}${filename}`
		);

		if (iconName && !foundIconFiles.includes(iconName)) {
			foundIconFiles.push(iconName);
		}
	}

	return foundIconFiles;
};

const initDefaultFile = (temporaryDirectory: string, iconFileName: string) => {
	const defaultFileExists = FSE.existsSync(
		`${temporaryDirectory}/${allTemporaryDir}/${generalPrefix}${iconFileName}.svg`
	);

	if (!defaultFileExists) {
		for (const size of componentSizes) {
			const sizeFileName = `${temporaryDirectory}/${allTemporaryDir}/${generalPrefix}${iconFileName}_${size}.svg`;
			if (FSE.existsSync(sizeFileName)) {
				FSE.copyFileSync(
					sizeFileName,
					`${temporaryDirectory}/${allTemporaryDir}/${generalPrefix}${iconFileName}.svg`
				);
				break;
			}
		}
	}
};

const initComponentSizes = (
	temporaryDirectory: string,
	iconFileName: string
) => {
	for (const size of componentSizes) {
		// Generate all component sizes inside /all directory
		const requiredFilePath = `${temporaryDirectory}/${allTemporaryDir}/${generalPrefix}${iconFileName}_${size}.svg`;
		if (!FSE.existsSync(requiredFilePath)) {
			const nextBestSizeArray =
				size === 16 ? [20, 24] : size === 20 ? [24, 16] : [20, 16];
			for (const nextSize of nextBestSizeArray) {
				const nextSizeFilePath = `${temporaryDirectory}/${allTemporaryDir}/${generalPrefix}${iconFileName}_${nextSize}.svg`;
				if (FSE.existsSync(nextSizeFilePath)) {
					FSE.copyFileSync(nextSizeFilePath, requiredFilePath);
					break;
				}
			}
		}
	}
};

const gatherIcons = (
	temporaryDirectory: string,
	values: OptionsType
): string[] | undefined => {
	const { src, ignoreGlobs, prefix, dryRun, variants, withSizes, debug } =
		values;
	const paths = `${src}/**/*.svg`;

	// We use this to generate all combinations of variants and sizes as fonts
	const splitSizesArray = withSizes ? ['', ...availableSizes] : [''];
	const splitVariantsArray = variants.length > 0 ? ['', ...variants] : [''];

	const globPaths = globSync(paths, { ignore: ignoreGlobs }).map((path) =>
		path.replace(/\\/g, '/')
	);

	if (dryRun) {
		// eslint-disable-next-line no-console
		console.log('files:', globPaths);
		return globPaths;
	}

	if (!FSE.existsSync(temporaryDirectory)) {
		FSE.mkdirSync(temporaryDirectory, { recursive: true });
	}

	if (!FSE.existsSync(`${temporaryDirectory}/${allTemporaryDir}`)) {
		FSE.mkdirSync(`${temporaryDirectory}/${allTemporaryDir}`, {
			recursive: true
		});
	}

	const foundIconFiles = initTemporaryIconFiles(
		globPaths,
		temporaryDirectory,
		prefix
	);

	if (debug) {
		// eslint-disable-next-line no-console
		console.log(`Found ${foundIconFiles.length} icons`);
	}

	for (const variant of splitVariantsArray) {
		for (const iconFileName of foundIconFiles.filter(
			(fileName) => !variants.some((va) => fileName.endsWith(`_${va}`))
		)) {
			const fileName =
				variant === '' ? iconFileName : `${iconFileName}_${variant}`;
			initDefaultFile(temporaryDirectory, fileName);
			initComponentSizes(temporaryDirectory, fileName);

			for (const size of splitSizesArray) {
				// Generate new directories based on size and variant
				const sizeFileEnding = `${size === '' ? '' : `_${size}`}`;
				const directory = `${
					variant === '' ? 'default' : variant
				}${sizeFileEnding}`;
				const defaultFilePath = `${temporaryDirectory}/${allTemporaryDir}/${generalPrefix}${fileName}.svg`;
				const sizeFilePath = `${temporaryDirectory}/${allTemporaryDir}/${generalPrefix}${fileName}${sizeFileEnding}.svg`;
				const fallbackFilePath = `${temporaryDirectory}/${allTemporaryDir}/${generalPrefix}${iconFileName}.svg`;
				const fallbackSizeFilePath = `${temporaryDirectory}/${allTemporaryDir}/${generalPrefix}${iconFileName}${sizeFileEnding}.svg`;
				const placeholderFilePath = `${temporaryDirectory}/${allTemporaryDir}/${generalPrefix}x_placeholder.svg`;
				const placeholderSizeFilePath = `${temporaryDirectory}/${allTemporaryDir}/${generalPrefix}x_placeholder${sizeFileEnding}.svg`;

				if (!FSE.existsSync(`${temporaryDirectory}/${directory}`)) {
					FSE.mkdirSync(`${temporaryDirectory}/${directory}`, {
						recursive: true
					});
				}

				if (FSE.existsSync(sizeFilePath)) {
					FSE.copyFileSync(
						sizeFilePath,
						`${temporaryDirectory}/${directory}/${generalPrefix}${iconFileName}.svg`
					);
				} else if (FSE.existsSync(defaultFilePath)) {
					FSE.copyFileSync(
						defaultFilePath,
						`${temporaryDirectory}/${directory}/${generalPrefix}${iconFileName}.svg`
					);
				} else if (FSE.existsSync(placeholderSizeFilePath)) {
					FSE.copyFileSync(
						placeholderSizeFilePath,
						`${temporaryDirectory}/${directory}/${generalPrefix}${iconFileName}.svg`
					);
				} else if (FSE.existsSync(placeholderFilePath)) {
					FSE.copyFileSync(
						placeholderFilePath,
						`${temporaryDirectory}/${directory}/${generalPrefix}${iconFileName}.svg`
					);
				} else if (FSE.existsSync(fallbackSizeFilePath)) {
					FSE.copyFileSync(
						fallbackSizeFilePath,
						`${temporaryDirectory}/${directory}/${generalPrefix}${iconFileName}.svg`
					);
				} else {
					FSE.copyFileSync(
						fallbackFilePath,
						`${temporaryDirectory}/${directory}/${generalPrefix}${iconFileName}.svg`
					);
				}
			}
		}
	}

	return undefined;
};

export default gatherIcons;
