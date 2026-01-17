export function getPercentageDiff(value, estimatedRate) {
    if (!estimatedRate || estimatedRate === 0) return 0;
  
    const diff = ((value - estimatedRate) / estimatedRate) * 100;
    return Number(diff.toFixed(1));
  }