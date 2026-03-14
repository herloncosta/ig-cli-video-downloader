import fs from "node:fs";
import path from "node:path";
import { logger } from "./logger.js";

export function clearDownloads() {
	const downloadsDir = path.resolve(process.cwd(), "downloads");

	if (!fs.existsSync(downloadsDir)) {
		logger.info("Diretório de downloads não encontrado.");
		return;
	}

	fs.readdir(downloadsDir, (err, files) => {
		if (err) {
			logger.error(err, "Erro ao ler diretório de downloads:");
			return;
		}

		for (const file of files) {
			const filePath = path.resolve(downloadsDir, file);
			fs.unlink(filePath, (err) => {
				if (err) {
					logger.error(err, "Erro ao excluir arquivo:");
				}
			});
		}
	});
}

clearDownloads();
