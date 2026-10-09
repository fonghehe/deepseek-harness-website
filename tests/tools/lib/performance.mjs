export function payloadFailures(result, previous, budgets) {
  const limits = { ...budgets.absolute, ...budgets.pages[result.path] };
  const checks = {
    htmlBytes:
      budgets.pages[result.path]?.htmlBytes ??
      Math.min(limits.htmlBytes ?? Infinity, previous.htmlBytes * budgets.htmlGrowth),
    transferBytes: Math.min(
      limits.transferBytes ?? Infinity,
      previous.transferBytes * budgets.transferGrowth,
    ),
    jsBytes: limits.jsBytes,
    cssBytes: limits.cssBytes,
    fontBytes: limits.fontBytes,
  };
  return Object.entries(checks).flatMap(([key, limit]) =>
    limit !== undefined && result[key] > limit
      ? [`${result.path}: ${key} ${result[key]} exceeds ${Math.round(limit)}`]
      : [],
  );
}

export function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}
