const sharp = require("sharp");
const fs = require("node:fs");
const path = require("node:path");

const inputDir = "./imagens";
const backupDir = "./backup";
const outputDir = "./otimizadas";

if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir);
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

async function processarImagens() {
  const files = fs
    .readdirSync(inputDir)
    .filter((f) => f.toLowerCase().endsWith(".png"));
  let totalOriginal = 0;
  let totalOtimizado = 0;

  console.log(`🚀 Iniciando otimização de ${files.length} imagens...\n`);

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const backupPath = path.join(backupDir, file);
    const outputPath = path.join(outputDir, file);

    try {
      // Pega tamanho original
      const statsOriginal = fs.statSync(inputPath);
      totalOriginal += statsOriginal.size;

      // Faz o backup
      fs.copyFileSync(inputPath, backupPath);

      // Otimiza
      await sharp(inputPath)
        .png({ palette: true, quality: 80, compressionLevel: 9 })
        .toFile(outputPath);

      // Pega tamanho novo
      const statsNovo = fs.statSync(outputPath);
      totalOtimizado += statsNovo.size;

      const economia = (
        (1 - statsNovo.size / statsOriginal.size) *
        100
      ).toFixed(1);
      console.log(`✅ ${file} | -${economia}%`);
    } catch (error) {
      console.error(`❌ Erro em ${file}:`, error);
    }
  }

  const economiaTotalMB = (
    (totalOriginal - totalOtimizado) /
    1024 /
    1024
  ).toFixed(2);
  const percentualTotal = ((1 - totalOtimizado / totalOriginal) * 100).toFixed(
    1,
  );

  console.log("\n--- RESULTADO FINAL ---");
  console.log(`📦 Espaço total economizado: ${economiaTotalMB} MB`);
  console.log(`📉 Redução média: ${percentualTotal}%`);
  console.log("✨ Originais preservados na pasta /backup");
}

processarImagens();
