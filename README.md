# CMC Deployment Without DFX NNS

This project provides a simplified deployment setup for the Cycle Minting Canister (CMC) without requiring the full DFX NNS installation. It includes local deployment scripts for all necessary canisters.

## Overview

This setup deploys a complete local environment with:
- **ICP Ledger** - Local ICP token ledger
- **Cycle Minting Canister (CMC)** - For cycle management
- **Cycles Ledger** - For tracking cycles
- **USDx Ledger** - Local ledger
- **USDx Index** - Index canister for USDx transactions
- **Exchange Rate Canister** - For exchange rate data

## Prerequisites

- DFX installed and configured
- Basic familiarity with Internet Computer development

## Quick Start

### 1. Start Local Network

```bash
dfx start --clean --background
```

### 2. Deploy All Canisters

Run the main deployment script:

```bash
./scripts/deploy-local.sh
```

This script will:
- Create a minter identity if it doesn't exist
- Deploy ICP ledger with initial tokens
- Deploy Cycle Minting Canister
- Deploy Cycles Ledger
- Deploy Ledger
- Deploy Index

## Script Details

### Main Deployment Script (`deploy-local.sh`)

This is the primary script that orchestrates the entire deployment:

1. **Identity Setup**: Creates a minter identity for token minting
2. **ICP Ledger**: Deploys with 10 ICP initial balance
3. **CMC**: Deploys Cycle Minting Canister with proper configuration
4. **Cycles Ledger**: Deploys for cycle tracking
5. **USDx Components**: Calls sub-scripts for USDx deployment

### USDx Ledger Script (`deploy-local-ledger.sh`)

Deploys the USDx stable coin ledger with:
- Token name: "Doxa Dollar"
- Token symbol: "USDx"
- Transfer fee: 0.001 USDx
- Archive configuration for scalability

### USDx Index Script (`deploy-local-index.sh`)

Deploys the index canister for USDx transaction history with:
- Automatic block retrieval every 10 seconds
- Proper ledger integration

## Canister IDs

The deployment uses specific canister IDs to match the mainnet configuration:

- **ICP Ledger**: `ryjl3-tyaaa-aaaaa-aaaba-cai`
- **Cycle Minting Canister**: `rkp4c-7iaaa-aaaaa-aaaca-cai`
- **Cycles Ledger**: `um5iw-rqaaa-aaaaq-qaaba-cai`
- **USDx Ledger**: `irorr-5aaaa-aaaak-qddsq-cai`
- **Exchange Rate Canister**: `uf6dk-hyaaa-aaaaq-qaaaq-cai`

## Configuration

### Initial Balances

- **Default Account**: 10 ICP (10,000,000,000 e8s)
- **USDx**: 0 USDx (no pre-minting)

### Transfer Fees

- **ICP**: 0.0001 ICP (10,000 e8s)
- **USDx**: 0.001 USDx (100,000 e8s)

## Manual Deployment

If you need to deploy components individually:

### Deploy ICP Ledger Only

```bash
dfx identity new minter  # if not exists
export MINTER_ACCOUNT_ID=$(dfx ledger account-id --identity minter)
export DEFAULT_ACCOUNT_ID=$(dfx ledger account-id --identity default)

dfx deploy icp_ledger --specified-id ryjl3-tyaaa-aaaaa-aaaba-cai --argument "
  (variant {
    Init = record {
      minting_account = \"$MINTER_ACCOUNT_ID\";
      initial_values = vec {
        record {
          \"$DEFAULT_ACCOUNT_ID\";
          record {
            e8s = 10_000_000_000 : nat64;
          };
        };
      };
      send_whitelist = vec {};
      transfer_fee = opt record {
        e8s = 10_000 : nat64;
      };
      token_symbol = opt \"LICP\";
      token_name = opt \"Local ICP\";
    }
  })
"
```

### Deploy CMC Only

```bash
dfx deploy cycle_minting_canister --specified-id rkp4c-7iaaa-aaaaa-aaaca-cai --argument '(
  opt record { 
      ledger_canister_id = opt principal "ryjl3-tyaaa-aaaaa-aaaba-cai";
      governance_canister_id = opt principal "rrkah-fqaaa-aaaaa-aaaaq-cai";
      last_purged_notification = null;
      exchange_rate_canister = opt variant { 
        Set = principal "uf6dk-hyaaa-aaaaa-aaaaq-cai"
      };
      cycles_ledger_canister_id = opt principal "um5iw-rqaaa-aaaaa-aaaba-cai"; 
  })'
```

## Troubleshooting

### Common Issues

1. **Identity not found**: Run `dfx identity new minter` manually
2. **Canister already exists**: Use `dfx canister uninstall-code` first
3. **Network issues**: Ensure stable internet for WASM downloads

### Reset Environment

To start fresh:

```bash
dfx stop
dfx start --clean --background
./scripts/deploy-local.sh
```

## Development

This setup is ideal for:
- Testing CMC functionality locally
- Developing applications that interact with cycles
- Learning about Internet Computer token economics
- Prototyping DeFi applications

## Notes

- This is a local development setup, not for production use
- All canister IDs are hardcoded to match mainnet patterns
- The setup includes all necessary dependencies for CMC operation
- Archive functionality is configured for USDx ledger scalability
