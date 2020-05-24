// his: [], dayNum: 0
// his: [x], dayNum: 1
// his: [x], dayNum: 3
// his: [x, y], dayNum: 3
// => day 0 has been evaluated(in day 1), so we need to evaluate day 1, 2
async function updateSuccessDayAndFillHistory(mission, dayNum) {
  if (dayNum === undefined) {
    dayNum = mission.days;
  }
  for (var i in mission.participants) {
    var par = mission.participants[i];
    for (var j = par.usageHistory.length - 1; j >= 0 && j < dayNum; ++j) {
      if (par.usageHistory[j] === undefined) {
        par.usageHistory[j] = 0;
        par.successDay += 1;
      } else if (par.usageHistory[j] < par.limitTime) {
        par.successDay += 1;
      }
    }
    if (par.usageHistory[dayNum] === undefined) {
      par.usageHistory[dayNum] = 0;
    }
  }
  await mission.save();
  await mission.updateBonus(dayNum);
}

module.exports = {
  updateSuccessDayAndFillHistory
};
