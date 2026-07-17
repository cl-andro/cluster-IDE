import fs from 'fs';
import path from 'path';

const file = path.join(process.cwd(), 'node_modules', '@vscode', 'gulp-electron', 'src', 'download.js');
if (fs.existsSync(file)) {
	let content = fs.readFileSync(file, 'utf8');
	const targetCode = 'async function getDownloadUrl(';
	if (content.includes(targetCode)) {
		const patch = `async function getDownloadUrl(
  ownerRepo, customTag,
  { version, platform, arch, token, artifactName, artifactSuffix }
) {
  const releaseVersion = version.startsWith('v') ? version : 'v' + version;
  const tag = customTag ?? releaseVersion;
  artifactName = artifactName || 'electron';
  let targetArch = arch;
  if (arch === 'ppc64') {
    targetArch = 'ppc64le';
  }
  const targetName = artifactSuffix ?
    \`\${artifactName}-\${releaseVersion}-\${platform}-\${targetArch}-\${artifactSuffix}.zip\` :
    \`\${artifactName}-\${releaseVersion}-\${platform}-\${targetArch}.zip\`;
  return \`https://github.com/\${ownerRepo}/releases/download/\${tag}/\${targetName}\`;
}
/*`;
		content = content.replace(targetCode, patch);
		const endMarker = 'return response.headers.location;\n}';
		if (content.includes(endMarker)) {
			content = content.replace(endMarker, endMarker + '\n*/');
			fs.writeFileSync(file, content);
			console.log('Patched gulp-electron download.js successfully');
		} else {
			console.error('Failed to patch gulp-electron: endMarker not found');
			process.exit(1);
		}
	} else {
		console.log('gulp-electron download.js already patched or targetCode not found');
	}
} else {
	console.error('gulp-electron download.js not found at:', file);
	process.exit(1);
}
