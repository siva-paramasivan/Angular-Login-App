export class User {
    id?: string;
    username?: string;
    password?: string;
    firstname?: string;
    lastname?: string;
    token?:string;
}

export class Customer {
    id?: string;
    name?: string;
    emailAddress?: string;
    contactInformation?: string;
    address?: string;

    constructor(data: Partial<Customer>) {
        this.id = data.id??'';
        this.name = data.name ?? '';
        this.address = data.address ?? '';
        this.emailAddress = data.emailAddress ?? '';
        this.contactInformation =data.contactInformation ?? '';
      }
}