# IA Animation Libraries — Motion Studio

Motor de pré-visualização 3D e catálogo de bibliotecas de assets para séries animadas no estilo RPG cinematográfico.

## Estado atual
- ✅ Estúdio Three.js / React Three Fiber com cena **procedural demonstrativa**, timeline e controles.
- ✅ Catálogo de **11 fontes/pacotes** Quaternius, Kenney, Mixamo, Poly Pizza, Sketchfab e Rokoko.
- ✅ Importador **local** de arquivos/ZIPs adquiridos ou baixados legalmente, com manifest de origem.
- ✅ Shader GLSL de atmosfera como base para efeitos.
- ⏳ Modelos externos, animações, conversão FBX→GLB, retargeting e exportação MP4 ainda não estão ligados à cena demonstrativa.
- ⚠️ Nenhum pacote comercial/terceirizado foi copiado para este repositório.

## Iniciar
Requer Node.js 20+.
```bash
npm install
npm run dev
```
Abra o endereço local informado pelo Vite.

## Importação das bibliotecas
Consulte [docs/ASSET_IMPORT.md](docs/ASSET_IMPORT.md) e [catalog/libraries.json](catalog/libraries.json).

```bash
python scripts/list_libraries.py
python scripts/import_assets.py --library kenney-town --source ~/Downloads/fantasy-town-kit.zip
```

O importador guarda arquivos em `public/assets/<library-id>/` e escreve o inventário `catalog/imported.local.json`; ambos são ignorados pelo Git. Para formatos .fbx/.blend, converta para .glb antes de carregar via glTFLoader.

## Organização
```
catalog/                 # Catálogo de fontes e manifesto local
scripts/                 # Importação de downloads locais
docs/                    # Instruções e restrições de licenças
src/engine/              # Timeline, personagens e cena demonstrativa
src/shaders/             # Shaders GLSL
src/studio/              # Interface visual
public/assets/           # Assets baixados, fora do Git
```

## Direção do projeto
Reutilizar personagens, movimentos, cenários, shaders e câmeras entre episódios. A arquitetura permite adicionar uma pipeline de produção de vídeo com captura/renderização determinística posteriormente, mas a versão atual é um editor de pré-visualização, não um renderizador de MP4.
