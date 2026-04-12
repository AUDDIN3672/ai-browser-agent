# Polymarket Trading Bot

This bot uses LLM (Ollama) and technical strategies to trade on Polymarket in paper mode.

## Setup
1. Enable **GitHub Pages** for this repository and set the source to the `root` or `dashboard` directory.
2. The bot runs automatically every 30 minutes via GitHub Actions.

## Dashboard
View your live trading performance at: `https://[your-username].github.io/[repo-name]/dashboard/`

## Strategies
The bot currently implements:
- Price Inefficiency (Arbitrage)
- Momentum
- Volume Analysis
- Spread Analysis
- LLM Analysis (via Ollama Phi-3)

## Win Rate Goal
The bot aims for a 90% win rate and evolves its strategy parameters every 10 trades if the target is not met.
