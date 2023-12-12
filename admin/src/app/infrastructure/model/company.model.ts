import { AuthorizedAgent } from "./authorizedAgent.model";

export class Company {    
    id?:string;
    name: string;
    legalIdentifier: string;
    commercialSegment: string;
    hostname: string;    
    authorizedAgent?: AuthorizedAgent; 

    constructor( name: string, legalIdentifier: string, commercialSegment: string, hostname: string, authorizedAgent?: AuthorizedAgent) {        
        this.name = name;
        this.legalIdentifier = legalIdentifier;
        this.commercialSegment = commercialSegment;
        this.hostname = hostname;
        this.authorizedAgent = authorizedAgent;//= new AuthorizedAgent(authorizedAgent.name, authorizedAgent.surname, authorizedAgent.email, authorizedAgent.identity);
    }

    
}


export class ConsultaCompany {    
    id:string;
    name: string;
    legalIdentifier: string;
    commercialSegment: string;
    hostname: string;    
    authorizedAgent?: AuthorizedAgent; 

    constructor( id:string,  name: string, legalIdentifier: string, commercialSegment: string, hostname: string, authorizedAgent?: AuthorizedAgent) {        
        this.id = id;
        this.name = name;
        this.legalIdentifier = legalIdentifier;
        this.commercialSegment = commercialSegment;
        this.hostname = hostname;
        this.authorizedAgent = authorizedAgent;//= new AuthorizedAgent(authorizedAgent.name, authorizedAgent.surname, authorizedAgent.email, authorizedAgent.identity);
    }    
}



export class Data 
  {
    hostname: string;
    commercialSegment: string;
    state:  string;
    authorizedAgent?: AuthorizedAgent;

    constructor( hostname:string,  commercialSegment: string, state: string, authorizedAgent?: AuthorizedAgent ){
       this.hostname = hostname;
       this.commercialSegment = commercialSegment;
       this.state=state;
       this.authorizedAgent = authorizedAgent;
    }

  }
