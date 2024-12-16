// interfaces/aide.interface.ts
export interface Vue {
    nom: string;
    fonctionnalite: string;
    composants: { [key: string]: string };
    fonctionnement: string[];
    typesRapports?: string[];
  }
  
  export interface Aide {
    application: {
      nom: string;
      description: string;
      vues: { [key: string]: Vue };
    };
  }