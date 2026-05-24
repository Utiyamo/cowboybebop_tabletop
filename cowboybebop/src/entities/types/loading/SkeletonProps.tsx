import { SkeletonShape } from "./SkeletonShape";

export interface SkeletonProps {
  /** Largura do bloco (classes Tailwind) */
  width?: string;
  /** Altura do bloco (classes Tailwind) */
  height?: string;
  /** Formato visual */
  shape?: SkeletonShape;
  /** Quantidade de itens empilhados */
  count?: number;
  /** Habilita animação de pulso */
  animate?: boolean;
  /** Classes adicionais para sobrescrita contextual */
  className?: string;
}
