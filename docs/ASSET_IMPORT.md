# Integração das bibliotecas 3D
O repositório contém **catálogo, importador e registro**, não espelhos de conteúdo de terceiros.
## Fontes
Veja [catalog/libraries.json](../catalog/libraries.json). Existem fontes gratuitas, pagas, autenticadas e com licenças distintas.
## Passo a passo
1. Abra o link oficial da biblioteca no catálogo.
2. Baixe somente os pacotes/modelos permitidos para o seu projeto; preserve arquivos de licença e atribuições.
3. Importe um download local com Python 3.11+:
   ```sh
   python scripts/list_libraries.py
   python scripts/import_assets.py --library kenney-town --source ~/Downloads/fantasy-town-kit.zip
   python scripts/import_assets.py --library mixamo --source ~/Downloads/hero-walking.fbx --license-note "Downloaded under Adobe Mixamo terms"
   ```
4. Arquivos vão para `public/assets/<library-id>/`; `catalog/imported.local.json` reúne os caminhos e metadados. Ambos ficam fora do Git por padrão.
5. Para usar modelos em Three.js/React Three Fiber, prefira GLB/glTF. FBX pode exigir conversão e retargeting. Texturas e arquivos .bin precisam acompanhar modelos glTF referenciados.
6. Não carregue todos os assets de uma vez; escolha o necessário por cena.
## Restrições
- **Mixamo:** download manual pela conta Adobe. Não contornar autenticação nem distribuir clipes brutos.
- **Sketchfab:** respeite o botão de download, direitos do artista, licença de cada modelo e atribuição quando exigida.
- **Poly Pizza:** algumas obras exigem atribuição; confirme individualmente.
- **Quaternius:** confira a licença atual do pacote antes de compartilhar modelos; o uso em obras finais não significa autorização para redistribuir os arquivos.
- **Kenney:** muitos pacotes, inclusive Fantasy Town Kit, são CC0, mas sempre preserve o registro de origem.
- **Rokoko:** exporte apenas movimentos/arquivos para os quais sua conta possui direito de uso.
## Qualidade
- 3D: use geometria otimizada, animações com nomes estáveis, texturas comprimidas e LOD quando necessário.
- Shaders: mantidos em `src/shaders/`; efeitos de iluminação e pós-processamento devem ser separados de geometria.
- Episódios: escreva roteiros e timelines em `src/engine/`.
- Os scripts **não** baixam conteúdo automaticamente e não executam código de ZIPs.
