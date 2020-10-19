import { Instruction } from "../Abstract/Instruction";
import { Expression } from "../Abstract/Expression";
import { Environment } from "../Symbol/Environment";
import { _Console } from '../Util/Salida';

export class ForIn extends Instruction {

    public translate(environment: Environment): String {
        let result = this.element.translate(environment);
        
        return result;
    }

    public plot(count: number): string {
        let result = "node" + count + "[label=\"(" + this.line + "," + this.column + ") Foreach\"];";
        // Hijo 1
        result += "node" + count + "1[label=\"(" + this.element.line + "," + this.element.column + ") Elemento\"];";
        result += this.element.plot(Number(count + "1"));
        // Hijo 2
        result += "node" + count + "2[label=\"(" + this.array.line + "," + this.array.column + ") Arreglo\"];";
        result += this.array.plot(Number(count + "2"));
        // Hijo 3
        result += "node" + count + "3[label=\"(" + this.code.line + "," + this.code.column + ") Codigo\"];";
        result += this.code.plot(Number(count + "3"));
        // Flechas
        result += "node" + count + " -> " + "node" + count + "1;";
        result += "node" + count + " -> " + "node" + count + "2;";
        result += "node" + count + " -> " + "node" + count + "3;";

        return result;

    }
    
    constructor(private element: Expression, private array: Expression,
        private code: Instruction, line: number, column: number) {
        super(line, column);
    }

    public execute(env: Environment) {
        
    }
}