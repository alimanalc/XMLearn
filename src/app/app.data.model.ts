export class Atributo {
    name: string;
    value: string;
    type: string;

}

export class Form {
    nameForm: string;
    url: string;
    atributos: Atributo[];
}

export class ListForm {
    forms: Form[];
}