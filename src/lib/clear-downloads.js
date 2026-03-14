import fs from "node:fs";
import path from "node:path";

export function clearDownloads() {
	const downloadsDir = path.resolve(process.cwd(), "downloads");

	if (!fs.existsSync(downloadsDir)) {
		console.log("Diretório de downloads não encontrado.");
		return;
	}

	fs.readdir(downloadsDir, (err, files) => {
		if (err) {
			console.error("Erro ao ler diretório de downloads:", err);
			return;
		}

		for (const file of files) {
			const filePath = path.resolve(downloadsDir, file);
			fs.unlink(filePath, (err) => {
				if (err) {
					console.error("Erro ao excluir arquivo:", err);
				}
			});
		}
	});
}

clearDownloads();
