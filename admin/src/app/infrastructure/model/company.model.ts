import { AuthorizedAgent } from "./authorizedAgent.model";

export class Company {    
    name: string;
    legalIdentifier: string;
    commercialSegment: string;
    hostname: string;    
    authorizedAgent: AuthorizedAgent; 

    constructor(name: string, legalIdentifier: string, commercialSegment: string, hostname: string, authorizedAgent: AuthorizedAgent) {
      
        this.name = name;
        this.legalIdentifier = legalIdentifier;
        this.commercialSegment = commercialSegment;
        this.hostname = hostname;
        this.authorizedAgent = authorizedAgent;//= new AuthorizedAgent(authorizedAgent.name, authorizedAgent.surname, authorizedAgent.email, authorizedAgent.identity);
    }
}

