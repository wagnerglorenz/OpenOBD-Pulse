# OpenOBD Pulse 🚗⚡

**OpenOBD Pulse** é uma plataforma progressiva (PWA) de telemetria automotiva em tempo real, diagnóstico de injeção eletrônica, cálculo de eficiência energética e mapas de calor de rotas, projetada para se conectar diretamente a scanners OBD-II (Bluetooth Classic SPP / BLE) direto do navegador Google Chrome no Android e computadores.

---

## 🔒 Privacidade e Propriedade dos Dados

- **100% Local no Dispositivo**: Todas as leituras de sensores, viagens, paradas e históricos de abastecimento são armazenados exclusivamente na memória do seu próprio aparelho através do banco de dados local **IndexedDB** (`obd_trips_db`).
- **Nenhum Dado é Coletado ou Enviado a Servidores**: O projeto **não possui servidores de telemetria centralizados** e não envia dados pela internet.
- **Backup Pessoal Opcional**: O usuário pode, a seu próprio critério, exportar arquivos CSV/JSON ou conectar seu próprio Google Drive para backup pessoal privativo.
- **Garantia Ética de Localização**: Mesmo em eventuais recursos futuros de compartilhamento comunitário de calibração de consumo, **dados de GPS, localização, mapas e trajetos jamais serão compartilhados**.

---

## ⚡ Principais Funcionalidades

- **Assistente Inicial de Configuração (Setup Wizard)**: Cadastro de múltiplos veículos (marca, modelo, cilindrada do motor, tipo de câmbio e combustível).
- **Cockpit em Tempo Real**: Velocidade real, rotação (RPM), indicador dinâmico de marcha engatada, consumo instantâneo (km/L e L/h), temperatura da água, avanço de ignição e sonda lambda.
- **Diagnóstico & Saúde da ECU**: Varredura dos subsistemas da injeção eletrônica, leitura de códigos de falha (DTCs Mode 03 / Mode 07), corrente da sonda Wideband (mA) e eficiência volumétrica (VE%).
- **Detector Estimado de Mistura (Gasolina % vs. Etanol %)**: Cálculo estequiométrico estimado por correção de combustível STFT e sonda lambda, além de classificador de postos de combustível.
- **Diário de Abastecimento & Odômetro Inteligente**: Registro de litros e valor na bomba, odômetro integrado via ECU (PID 0131) ou manual, cálculo de km rodados e custo real por quilômetro.
- **Mapas de Calor de Trajetos**: Visualização Leaflet/OpenStreetMap colorida por intensidade de consumo e trânsito.

---

## 📜 Licença

Proprietário — Uso Gratuito (**Freemium**).
Copyright (c) 2026 Wagner Lorenz. Todos os direitos reservados.
O uso pessoal do aplicativo é gratuito e livre. É vedada a engenharia reversa, redistribuição comercial ou modificação não autorizada do código-fonte.
