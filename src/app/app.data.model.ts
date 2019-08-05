export class Attribute {
    name: string;
    value: string;
    type: string;

}

export class Request {
    name: string;
    url: string;
    attributes: Attribute[];
}

export class User {
    _id: string;
    username: string;
    password: string;
    requests: Request[];
}