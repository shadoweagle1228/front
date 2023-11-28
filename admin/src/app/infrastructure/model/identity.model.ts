export class Identity {
    public documentType: string;
    public legalIdentifier: string;

    constructor(documentType: string, legalIdentifier: string) {
        this.documentType = documentType;
        this.legalIdentifier = legalIdentifier;
    }
}