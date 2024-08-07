
export async function addMintStartedEvents(event, env) {
  const [user, tRank, gMintpower, userMint] = event.args;
  const [mintPower, numOfDays, mintableTitan, mintStartTs, maturityTs, mintPowerBonus, EAABonus, mintedTitan, mintCost, status] = userMint

  const insertQuery = `
    INSERT INTO MintStarted (
      user,
      tRank,
      gMintpower,
      mintPower,
      numOfDays,
      mintableTitan,
      mintStartTs,
      maturityTs,
      mintPowerBonus,
      EAABonus,
      mintedTitan,
      mintCost,
      status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  console.log([
    user,
    String(tRank),
    String(gMintpower),
    String(mintPower),
    String(numOfDays),
    String(mintableTitan),
    String(mintStartTs),
    String(maturityTs),
    String(mintPowerBonus),
    String(EAABonus),
    String(mintedTitan),
    String(mintCost),
    String(status)
  ])

  try {
    await env.DB.prepare(insertQuery).bind(
      user,
      String(tRank),
      String(gMintpower),
      String(mintPower),
      String(numOfDays),
      String(mintableTitan),
      String(mintStartTs),
      String(maturityTs),
      String(mintPowerBonus),
      String(EAABonus),
      String(mintedTitan),
      String(mintCost),
      String(status)
    ).run();
  } catch (e) {
    console.log(e);
  }
}
