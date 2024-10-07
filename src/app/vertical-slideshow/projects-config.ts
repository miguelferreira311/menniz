import { Projects } from "../constants-types";

export type ProjectItem = {
  imageUrl: string;
  name: string;
  identifier: Projects;
  description: string;
}

export const PROJECTS: ProjectItem[] = [
  { imageUrl: 'assets/images/covers/00_01_Joao_Branco.jpg', name: 'João Branco', identifier: Projects.JOAO_BRANCO, description: 'João Branco, São Martinho do Porto, 2023' },
  { imageUrl: 'assets/images/covers/00_03_Mirante.jpg', name: 'Mirante', identifier: Projects.MIRANTE, description: 'Estúdio Mirante, Lisboa, 2022' },
  { imageUrl: 'assets/images/covers/00_02_25_Abril.jpg', name: '25 de Abril', identifier: Projects.ABRIL_25, description: '25 de Abril, Cacilhas, 2021' },
  { imageUrl: 'assets/images/covers/00_04_Joao_Infante.jpg', name: 'João Infante', identifier: Projects.JOAO_INFANTE, description: 'João Infante, Cascais, 2021' },
  { imageUrl: 'assets/images/covers/00_04_Freitas_Reis.jpg', name: 'Freitas Reis', identifier: Projects.FREITAS_REIS, description: 'Freitas Reis, Cascais, 2020' },
  { imageUrl: 'assets/images/covers/00_05_Infante_Sagres.jpg', name: 'Luís Braille', identifier: Projects.INFANTE_SAGRES, description: 'Luís Braille, Belém, 2021' },
]
