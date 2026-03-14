import { downloadIGVideo } from "./lib/downloader.js";

const targetUrl = process.argv[2];

if (!targetUrl || !targetUrl.startsWith("http")) {
	console.error(
		"Por favor, informe uma URL válida. Exemplo: node src/app.js <URL>",
	);
	process.exit(1);
}

downloadIGVideo(targetUrl);
