import { Identity } from "./identity.model";

export class AuthorizedAgent {
    name: string;
    surname: string;
    email: string;
    identity: Identity; // = new Identity("","");

    constructor(name: string, surname: string, email: string, identity: Identity) {
        console.log(identity);
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.identity = identity; //new Identity(identity.documentType, identity.legalIdentifier);
    }
}