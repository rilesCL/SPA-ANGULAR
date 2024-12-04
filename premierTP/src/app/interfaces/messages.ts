export interface IMessage {
    userid: string;    // vide pour anonyme
    message: string;   // contenu du message
    rating: number;    // nombre d'étoiles
    date: {
        value: string;
    };
    id: string;       // identifiant unique
}