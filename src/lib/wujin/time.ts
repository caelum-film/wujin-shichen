/** 子时从 23:00 起，每两个钟点一辰。用访客自己的本地时间。 */
export function branchIndex(date = new Date()): number {
  return Math.floor(((date.getHours() + 1) % 24) / 2);
}

export function formatWhen(at: number): string {
  const d = new Date(at);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}.${p(d.getMonth() + 1)}.${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}
