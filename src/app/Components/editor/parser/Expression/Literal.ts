import { Expression } from "../Abstract/Expression";
import { Retorno, Type, getTypeName } from "../Abstract/Retorno";

export class Literal extends Expression {

    constructor(private value: any, line: number, column: number, private type: number) {
        super(line, column);
    }
    public plot(count: number): string {
        let result = "node" + count + "[label=\"(" + this.line + "," + this.column + ") Literal\"];";
        result += "node" + count + "1[label=\"(" + this.line + ","
            + this.column + ") " + this.execute().value + ": " + getTypeName(this.execute().type) + "\"];";
        // Flechas
        result += "node" + count + " -> " + "node" + count + "1;";
        return result;
    }

    private fixString(str: String) {
        if (str.endsWith('"')) return str.replace(/\"/g, "");
        if (str.endsWith("'")) return str.replace(/\'/g, "");
        return str;
    }

    public execute(): Retorno {
        switch (this.type) {
            case 0:
                return { value: Number(this.value), type: Type.NUMBER };
            case 1:
                //TODO agregar sintaxis de plantillas de texto
                return { value: this.fixString(this.value), type: Type.STRING };
            case 2:
                return { value: (this.value == 'false') ? false : true, type: Type.BOOLEAN };
            default:
                return { value: this.value, type: Type.STRING };
        }
    }
}