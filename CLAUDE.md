# IAanimationlibs — instruções para Claude Code

Este repositório é a infraestrutura futura de produção de animações, **não uma ordem para criar uma série de imediato**.

## Ordem obrigatória
1. CONCEITO → 2. MUNDO/CONTEXTO → 3. PERSONAGENS/RELAÇÕES → 4. CONFLITO/FORMATO → 5. BÍBLIA APROVADA → 6. COPY → 7. STORYBOARD → 8. ASSETS → 9. ANIMAÇÃO → 10. RENDER.

Use `/story-architect` para os passos 1–5 e `/animation-director` para 6–10.
Nunca avançar um gate sem aprovação explícita quando estiver desenvolvendo uma história.

## Estado do repositório
- `catalog/libraries.json`: links para fontes; NÃO significa que os assets estão baixados.
- `scripts/import_assets.py`: importador de arquivos locais.
- `src/engine` e `src/shaders`: protótipo de pré-visualização, não render final.
- `prompts/MASTER_DIRECTOR.md`: documento legado com pipeline completo; use apenas na produção e subordine-o às gates das skills.
- `stories/`: cânone de cada projeto narrativo, a ser criado após aprovação.

## Regras
Não confundir imagem de referência com mesh 3D ou prévia com MP4. Nunca importar/redistribuir assets sem observar licença. Ao usar referência cultural famosa, distinguir inspiração temática de cópia da expressão artística. Se o pedido for explorar uma ideia, não gerar vídeo, episódio, asset, shader ou copy final antecipadamente.

## Exemplos de invocação
`/story-architect Quero desenvolver uma história sobre uma cidade que vende memórias.`
`/story-architect Quero estudar o apelo narrativo de um RPG famoso e construir algo original.`
`/animation-director A bíblia de stories/minha-historia está aprovada. Vamos adaptar para 30 segundos, começando pela copy.`
