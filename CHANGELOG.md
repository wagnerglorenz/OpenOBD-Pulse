# CHANGELOG — OpenOBD Pulse

Todas as alterações notáveis deste projeto serão documentadas neste arquivo, seguindo o padrão [Semantic Versioning (SemVer)](https://semver.org/lang/pt-BR/): `MAJOR.MINOR.PATCH`.

---

## [v1.4.0] - 2026-11-15
### Adicionado
- **Isolamento Real Multi-Veículo**: Viagens, abastecimentos, médias, gráficos, revisão de óleo e odômetro filtrados automaticamente pelo veículo ativo (`vehicleId`).
- **Restaurar Backup JSON (`📥 Restaurar Backup`)**: Importação segura com merge no IndexedDB (`obd_trips_db`), veículos, locais conhecidos e abastecimentos sem duplicação.
- **Alertas por Voz ao Dirigir (`🔊 Voz: ON/OFF`)**: Avisos falados via `speechSynthesis` (pt-BR) para temperatura crítica (`>= 102°C`), alternador fora da faixa (`< 13.0V` / `> 14.9V`) e motor aquecido a `80°C`.
- **Dicionário Offline de DTCs em Português + Nível do Tanque (`PID 012F`)**: Tradução de códigos `P0xxx` no check-up e exibição opcional da % do tanque na barra ao vivo.
- **Modo Só GPS (`📍 Só GPS`)**: Gravação de trajeto, velocidade GPS e Mapa HUD mesmo sem o scanner OBD-II conectado, sem contaminar médias de combustível.
- **Raio-X de Gastos (`Parado vs Urbano vs Rodovia`)**: Quebra percentual e financeira (R$) por faixa de velocidade na aba `📊 Custos`.

---

## [v1.3.0] - 2026-11-15
### Adicionado & Corrigido
- **Encerramento Real de Viagem ao Tirar a Chave**:
  - Nova função `closeActiveTrip()`: fecha e salva a viagem no IndexedDB, limpa a sessão ativa e zera os mostradores após 3 ciclos sem resposta da ECU (~8s com chave desligada) ou queda do Bluetooth.
  - Botão explícito **⏹️ Encerrar** no `🚗 Cockpit` para fechar a viagem em 1 toque.
- **Mapa Ao Vivo em Tempo Real + Modo HUD Tela Cheia**:
  - Atualização contínua do trajeto no mapa enquanto dirige (`update`/refresh incremental) com marcador da posição atual do carro.
  - Novo modo **⛶ Mapa HUD** (tela cheia) com painel flutuante no canto exibindo velocidade (`km/h`), consumo instantâneo (`km/L`), média da viagem, marcha/RPM, temperatura da água (`°C`), distância e custo (`R$`), além de trava `🎯 Seguir`.
- **Controle de Tela Ligada & Gravação em 2º Plano**:
  - Toggles `🔆 Tela Ligada` (WakeLock com re-aquisição automática via `visibilitychange`) e `🔋 2º Plano` (áudio silencioso + `MediaSession`).
  - Gravação no IndexedDB a cada 2 amostras + flush imediato em `visibilitychange`/`pagehide`.

---

## [v1.2.0] - 2026-11-13
### Melhorado & Adicionado
- **Fluidez Mobile & Modo Direção Limpo (`🚗 Cockpit`)**:
  - Cabeçalho compactado em 1 única linha no celular.
  - Recolhimento automático das opções avançadas de pareamento e rota manual ao entrar em `Estado 4/4 (Motor Ligado)`.
  - Barra ao vivo com **Trajeto Atual (km, min, R$, km/L)**, **Eco-Score instantâneo**, detecção de **Cut-Off (consumo zero)** e indicação dinâmica do tipo de câmbio do veículo ativo (`Manual`, `Automático`, `CVT`).
- **Navegação Segmentada `⚡ Elétrica | 🔬 ECU & Matriz` + Gráficos SVG**:
  - Alternância em 1 toque entre Bateria/Alternador e ECU/Sensores.
  - Sparkline SVG de tensão elétrica e **Resumo Semafórico do Motor** (Termostática, Mistura STFT, Catalisador e Falhas).
- **Chips Rápidos em `🗺️ Rotas` & Novos Insights em `📊 Custos`**:
  - Botões de 1 toque (`🏠 Casa`, `🏫 Escola`, `🏢 Trabalho`, `🛒 Mercado`) + resumo da viagem selecionada abaixo do mapa.
  - Gráfico comparativo de gastos/eficiência das últimas 7 viagens, **Manutenção Preventiva por Odômetro** (troca de óleo 10.000 km), badge de **Eco-Score**, **Cut-Off**, **Motor Frio (<75°C)** e renomeação rápida da etiqueta da rota.

---

## [v1.1.0] - 2026-11-13
### Adicionado
- **Rotas Automáticas & Reconhecimento de Padrões (Geo-cluster)**:
  - Início automático da viagem ao detectar motor ligado (`RPM > 300`) e veículo em movimento (`> 5 km/h` por 5s), sem precisar tocar em botões.
  - Encerramento automático ao desligar o motor ou permanecer parado por mais de 2 minutos.
  - Cadastro de **Locais Conhecidos** (`openobd_known_places_v1`, raio de 150 m) e agrupamento automático por coordenadas de origem/destino (ex: `Casa ➔ Colégio do Caio`), comparando tempo e consumo com a média histórica daquela rota.
- **Nova Arquitetura em 5 Abas**:
  - `🚗 Cockpit`, `⚡ Elétrica`, `⛽ Posto` (aba exclusiva para abastecimento e odômetro), `🗺️ Rotas` e `📊 Custos` (resumo financeiro, veículos e Google Drive).
  - Acesso rápido à aba `🔬 ECU & Matriz` preservado dentro de `⚡ Elétrica`.
- **Diagnóstico Elétrico Completo (`⚡ Elétrica`)**:
  - Leitura contínua de bateria em repouso/Pino 16 (`ATRV`), queda mínima na partida (cranking drop `≥ 9.8V` / `9.0-9.7V` / `< 9.0V`) e saúde do alternador (`13.7V – 14.6V` ideal, alertas `< 13.2V` e `> 14.8V`) com histórico recente e guia de teste sob carga.

---

## [v1.0.0] - 2026-11-13
### Adicionado
- **Rebranding Oficial para OpenOBD Pulse**: Nova identidade visual com logotipo vetorial (`icon.svg`), nome e manifesto PWA universal (`manifest.webmanifest`).
- **Assistente de Boas-Vindas no Primeiro Acesso (Setup Wizard)**:
  - Apresentação completa do projeto no primeiro uso.
  - Declaração explícita de privacidade: modelo freemium/gratuito, dados 100% locais no dispositivo, nenhum envio para servidores externos.
  - Esclarecimento sobre o backup opcional no Google Drive pessoal e garantia de que futuros compartilhamentos serão estritamente consensuais, anônimos e limitados a telemetria do motor, nunca incluindo localização ou trajetos GPS.
  - Cadastro guiado do veículo: Apelido, Marca, Modelo, Cilindrada do motor (L), Tipo de Câmbio e Mistura de Combustível.
- **Gerenciador Multi-Veículos**:
  - Capacidade de alternar entre múltiplos carros cadastrados.
  - Opção de adicionar novos veículos e resetar configurações.
- **Armazenamento Contínuo e Não Destrutivo no IndexedDB**:
  - Cada viagem e ciclo de motor é salvo individualmente como registro imutável no banco local `obd_trips_db` no celular.
  - Eliminação do limite de 50 viagens e fim de qualquer sobrescrita de dados.
- **Detector Químico Estimado de Mistura (Gasolina % vs Álcool %)**:
  - Cálculo por equivalência de Lambda e compensação STFT (Sonda Wideband 0134 + 0106).
  - Classificador histórico por posto de combustível.
- **Licenciamento Proprietário de Uso Gratuito (Freemium)**:
  - Código protegido e uso livre gratuito aos motoristas.

---

## [v0.3.1] - 2026-11-13
### Adicionado
- Controle de abastecimentos na bomba com cálculo de km rodados e média real (km/L).
- Odômetro inteligente com leitura via ECU (PID 0131) e diálogo manual de confirmação em caso de motor desligado.

## [v0.3.0] - 2026-11-13
### Adicionado
- Interface reformulada em 4 abas fixas no rodapé (Cockpit, ECU & Saúde, Mapa & Rotas, Custos & Histórico).
- Mapa interativo Leaflet com desenho de rotas e cores por eficiência/trânsito.
- Calibração de marcha para câmbio manual e misturas regionais E32/E30.

## [v0.2.0] - 2026-11-12
### Adicionado
- PWA instalável offline no Android via Web Serial Bluetooth SPP (38400 baud).
- Varredura de 7 subsistemas da ECU e leitura de falhas (DTCs).

## [v0.1.0] - 2026-11-12
### Adicionado
- Versão inicial MVP do scanner OBD-II para protocolo CAN 29-bit 500k (ISO 15765-4).
