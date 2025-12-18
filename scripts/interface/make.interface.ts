

export const generateInterface = (
  moduleName: string,
  capitalize: (str: string) => string,
): string => {
  const capitalizedName = capitalize(moduleName);
  return `export interface ${capitalizedName}Props {
  id?: number | null;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export interface ${capitalizedName}Response {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}  
`;
};
