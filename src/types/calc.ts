export type CalcBrickType = 1 | 2 | 3;

export interface CalcResult {
  quantity: number;
  quantityWithReserve: number;
  reservePercent: number;
  pallets: number;
  pack: number;
  brickDescription: string;
}
