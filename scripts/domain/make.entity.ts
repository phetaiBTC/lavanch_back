export const generateEntity = (
  moduleName: string,
  capitalize: (str: string) => string,
): string => {
  const capitalizedName = capitalize(moduleName);
  return `import { ${capitalizedName}Props } from '../interface/${moduleName}.interface';

export class ${capitalizedName} {
  private id: number | null;
  private name: string;
  private createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date | null;

  constructor(props: ${capitalizedName}Props) {
    this.id = props.id ?? null;
    this.name = props.name;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
    this.deletedAt = props.deletedAt ?? null;
  }

  get value() {
    return {
      id: this.id,
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
  update(
    props: Partial<
      Omit<${capitalizedName}Props, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>
    >,
  ) {
    return new ${capitalizedName}({
      ...this.value,
      ...props,
    });
  }
}`;
};
