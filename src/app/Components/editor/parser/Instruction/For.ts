import { Instruction } from "../Abstract/Instruction";
import { Expression } from "../Abstract/Expression";
import { Environment } from "../Symbol/Environment";
import { Type } from "../Abstract/Retorno";

export class For extends Instruction {

    public plot(count: number): string {
        let result = "node" + count + "[label=\"(" + this.line + "," + this.column + ") For\"];";
        // Hijo 1
        result += "node" + count + "1[label=\"(" + this.code.line + "," + this.code.column + ") Declaracion\"];";
        result += this.code.plot(Number(count + "1"));
        // Hijo 2
        result += "node" + count + "2[label=\"(" + this.condition.line + "," + this.condition.column + ") Condicion\"];";
        result += this.condition.plot(Number(count + "2"));
        // Hijo 3
        result += "node" + count + "3[label=\"(" + this.condition.line + "," + this.condition.column + ") Operacion\"];";
        result += this.condition.plot(Number(count + "3"));
        // Hijo 4
        result += "node" + count + "4[label=\"(" + this.condition.line + "," + this.condition.column + ") Codigo\"];";
        result += this.condition.plot(Number(count + "4"));
        // Flechas
        result += "node" + count + " -> " + "node" + count + "1;";
        result += "node" + count + " -> " + "node" + count + "2;";
        result += "node" + count + " -> " + "node" + count + "3;";
        result += "node" + count + " -> " + "node" + count + "4;";

        return result;
    }

    constructor(private declaration: Instruction, private condition: Expression,
        private operation: Instruction, private code: Instruction, line: number,
        column: number) {
        super(line, column);
    }

    public execute(env: Environment) {
        this.declaration.execute(env);
        let condition = this.condition.execute(env);

        if (condition.type != Type.BOOLEAN) {
            throw { error: "La condicion no es booleana", linea: this.line, columna: this.column };
        }
        while (condition.value == true) {
            const element = this.code.execute(env);
            if (element != null || element != undefined) {
                console.log(element);
                if (element.type == 'Break')
                    break;
                else if (element.type == 'Continue')
                    continue;
            }

            this.operation.execute(env);
            condition = this.condition.execute(env);
            if (condition.type != Type.BOOLEAN) {
                throw { error: "La condicion no es booleana", linea: this.line, columna: this.column };
            }
        }
    }
}