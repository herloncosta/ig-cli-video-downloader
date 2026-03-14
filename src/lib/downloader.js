import ytdl from "youtube-dl-exec";
import path from "node:path";
import fs from "node:fs";

export async function downloadIGVideo(url) {
	const downloadsDir = path.resolve(process.cwd(), "downloads");

	if (!fs.existsSync(downloadsDir)) {
		fs.mkdirSync(downloadsDir, { recursive: true });
	}

	const fileName = `video_${Date.now()}.mp4`;
	const outputPath = path.resolve(downloadsDir, fileName);

	console.log(`Baixando vídeo de: ${url}`);
	console.log("Iniciando extração e fusão de streams...");

	try {
		await ytdl(url, {
			output: outputPath,
			format: "bestvideo+bestaudio/best",
			mergeOutputFormat: "mp4",
		});

		console.log(`Vídeo completo e reproduzível salvo em: ${outputPath}`);
	} catch (error) {
		console.error("Erro no processamento:", error.message);
	}
}
