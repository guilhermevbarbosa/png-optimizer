const sharp = require("sharp");
const fs = require("node:fs");
const path = require("node:path");

const inputDir = "./otimizadas";
const outputDir = "./otimizadas_webp";

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

async function converterParaWebp() {
  const files = fs
    .readdirSync(inputDir)
    .filter((f) =>
      [".png", ".jpg", ".jpeg"].includes(path.extname(f).toLowerCase()),
    );

  let totalOriginal = 0;
  let totalWebp = 0;

  console.log(`🧪 Convertendo ${files.length} imagens para WebP...\n`);

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    // Muda a extensão para .webp
    const nomeSemExt = path.parse(file).name;
    const outputPath = path.join(outputDir, `${nomeSemExt}.webp`);

    try {
      const statsOriginal = fs.statSync(inputPath);
      totalOriginal += statsOriginal.size;

      await sharp(inputPath)
        .webp({
          quality: 80, // Equilíbrio perfeito entre peso e visual
          lossless: false, // Define como compressão inteligente (lossy)
          effort: 6, // Nível de esforço da CPU (0 a 6)
        })
        .toFile(outputPath);

      const statsWebp = fs.statSync(outputPath);
      totalWebp += statsWebp.size;

      const economia = (
        (1 - statsWebp.size / statsOriginal.size) *
        100
      ).toFixed(1);
      console.log(`⚡ ${file} ➡️  ${nomeSemExt}.webp | -${economia}%`);
    } catch (error) {
      console.error(`❌ Erro em ${file}:`, error);
    }
  }

  const economiaTotalMB = ((totalOriginal - totalWebp) / 1024 / 1024).toFixed(
    2,
  );
  console.log("\n--- RELATÓRIO WEB-READY ---");
  console.log(`📦 Economia Total: ${economiaTotalMB} MB`);
  console.log(`🚀 Formato WebP pronto para o React.`);
}

converterParaWebp();
