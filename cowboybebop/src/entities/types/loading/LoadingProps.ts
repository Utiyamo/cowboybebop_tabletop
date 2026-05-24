import { LoadingSize } from "./loadingSize";

export interface LoadingProps {
  /** Texto exibido abaixo do spinner */
  text?: string;
  /** Tamanho do indicador */
  size?: LoadingSize;
  /** Se true, ocupa a viewport com overlay escuro */
  fullScreen?: boolean;
  /** Classes Tailwind adicionais para sobrescrita contextual */
  className?: string;
}
