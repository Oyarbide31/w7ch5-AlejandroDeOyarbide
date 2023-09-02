/* eslint-disable capitalized-comments */
/* eslint-disable no-unused-vars */
export interface Repository<X extends { id: unknown }> {
  getAll(): Promise<X[]>;
  getById(id: X['id']): Promise<X>;
  search?({ key, value }: { key: string; value: unknown }): Promise<X[]>;
  create(newData: Omit<X, 'id'>): Promise<X>;
  update(id: X['id'], newData: Partial<X>): Promise<X>;
  delete(id: X['id']): Promise<void>;
}

/*
definición de la interfaz TypeScript "Repository" se utiliza para describir un
patrón común en el desarrollo de aplicaciones, sobretodo en de bases de datos
y almacenamiento de datos.

Esta interfazen concreto: define una serie de métodos que generalmente se
utilizan al interactuar con una fuente de datos, como una base de datos o una API. */
