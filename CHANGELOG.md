# CHANGELOG — OpenOBD Pulse

Todas as alterações notáveis deste projeto serão documentadas neste arquivo, seguindo o padrão [Semantic Versioning (SemVer)](https://semver.org/lang/pt-BR/): `MAJOR.MINOR.PATCH`.

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
