
# titanx

ETL pipeline for titanx events

- cloudflare workers
- D1 sqlite database
- api with cors

#### titanx

https://etherscan.io/token/0xf19308f923582a6f7c465e5ce7a9dc1bec6665b1



- events
```
'Approval',
'ApproveBurnMints',
'ApproveBurnStakes',
  'CyclePayoutTriggered',
  'ETHDistributed',
  'GlobalDailyUpdateStats',
  'MintClaimed',
  'MintStarted',
  'ProtocolFeeRecevied',
  'RewardClaimed',
  'StakeEnded',
  'StakeStarted',
  'TitanBurned',
'Transfer'
```


```
MintStarted

event MintStarted(
  address indexed user,
  uint256 indexed tRank,
  uint256 indexed gMintpower,
  UserMintInfo userMintInfo
);

struct UserMintInfo {
  uint8 mintPower;
  uint16 numOfDays;
  uint96 mintableTitan;
  uint48 mintStartTs;
  uint48 maturityTs;
  uint32 mintPowerBonus;
  uint32 EAABonus;
  uint128 mintedTitan;
  uint64 mintCost;
  MintStatus status;
}

args: Result(4) [
    '0x9CD5618C08F20BfBA4646bCf39E624E1086B70E5', - user
    702n, - tRank
    68997n, - gMintpower
    Result(10) [
      100n, - mintPower
      280n, - numOfDays
      1707798400000000000000000000n, - mintableTitan
      1698481091n, - mintStartTs
      1722673091n, - maturityTs
      350000000n, - mintPowerBonus
      10000000n, - EAABonus
      0n, - mintedTitan
      200000000000000000n, - mintCost
      0n - status
    ]
  ]

DROP TABLE IF EXISTS MintStarted;
CREATE TABLE IF NOT EXISTS MintStarted (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user TEXT NOT NULL,
  tRank TEXT NOT NULL,
  gMintpower TEXT NOT NULL,
  mintPower TEXT NOT NULL,
  numOfDays TEXT NOT NULL,
  mintableTitan TEXT NOT NULL,
  mintStartTs TEXT NOT NULL,
  maturityTs TEXT NOT NULL,
  mintPowerBonus TEXT NOT NULL,
  EAABonus TEXT NOT NULL,
  mintedTitan TEXT NOT NULL,
  mintCost TEXT NOT NULL,
  token1USD TEXT NOT NULL,
  status TEXT NOT NULL,
  unique(user,tRank,gMintpower)
);

wrangler d1 execute titanx --local --file=./sql/table.MintStarted.sql
wrangler d1 execute titanx --local --command="SELECT name FROM PRAGMA_TABLE_INFO('MintStarted');"
wrangler d1 execute titanx --local --command="SELECT sql FROM sqlite_schema WHERE name = 'MintStarted';"
wrangler d1 execute titanx --local --command="SELECT * FROM MintStarted"

wrangler d1 export titanx --local --table='MintStarted' --output=./LiquidityPairs.sql

```