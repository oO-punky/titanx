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
  status TEXT NOT NULL
);
