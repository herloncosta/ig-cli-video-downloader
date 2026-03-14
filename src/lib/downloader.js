import ytdl from "youtube-dl-exec";
import path from "node:path";
import fs from "node:fs";
import { logger } from "./logger.js";

export async function downloadIGVideo(url) {
	const downloadsDir = path.resolve(process.cwd(), "downloads");

	if (!fs.existsSync(downloadsDir)) {
		fs.mkdirSync(downloadsDir, { recursive: true });
	}

	const fileName = `video_${Date.now()}.mp4`;
	const outputPath = path.resolve(downloadsDir, fileName);

	logger.info(`Baixando vídeo de: ${url}`);
	logger.info("Iniciando extração e fusão de streams...");

	try {
		await ytdl(url, {
			output: outputPath,
			format: "bestvideo+bestaudio/best",
			mergeOutputFormat: "mp4",
		});

		logger.info(`Vídeo completo e reproduzível salvo em: ${outputPath}`);
	} catch (error) {
		logger.error({ error }, "Erro no processamento");
	}
}
