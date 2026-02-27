const fs = require("node:fs");
const path = require("node:path");

const diretorio = "./otimizadas";

fs.readdir(diretorio, (err, files) => {
  if (err) return console.error("Erro ao ler pasta:", err);

  let contador = 0;

  files.forEach((file) => {
    const extensao = path.extname(file).toLowerCase();

    // Filtra apenas imagens
    if ([".png", ".jpg", ".jpeg"].includes(extensao)) {
      const eanOriginal = file.split("_")[0];
      let novoNome = `${eanOriginal}${extensao}`;
      let caminhoNovo = path.join(diretorio, novoNome);
      const caminhoAntigo = path.join(diretorio, file);

      // Lógica Anti-Colisão
      let sufixo = 1;
      while (fs.existsSync(caminhoNovo)) {
        // Se o arquivo que já existe for o próprio arquivo atual, ignora
        if (caminhoNovo === caminhoAntigo) break;

        // Tenta um novo nome: EAN-1.png, EAN-2.png...
        novoNome = `${eanOriginal}-${sufixo}${extensao}`;
        caminhoNovo = path.join(diretorio, novoNome);
        sufixo++;
      }

      try {
        if (caminhoAntigo !== caminhoNovo) {
          fs.renameSync(caminhoAntigo, caminhoNovo);
          console.log(`📝 ${file}  ➡️  ${novoNome}`);
          contador++;
        }
      } catch (err) {
        console.error(`❌ Erro ao renomear ${file}:`, err.message);
      }
    }
  });

  console.log(
    `\n✨ Concluído! ${contador} arquivos foram processados com segurança.`,
  );
});
