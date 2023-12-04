export function credsData(data: string) {
  const noDataText = "No specifications";
  return !data ? noDataText : data;
}
