import { Component } from '@angular/core';
import { Instruction } from "./parser/Abstract/Instruction";
import { Environment } from "./parser/Symbol/Environment";
import { errores } from './parser/Errores';
import { Error_ } from "./parser/Error";
import { Function } from "./parser/Instruction/Function";
declare var require: any
const parser = require('./parser/Grammar/Grammar');
// cd src/app/parser/Grammar

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'olc2web';
  entrada = 'print("Hello World");';
  salida = '';

  ejecutar() {
    this.salida = '';
    try {
      const ast = parser.parse(this.entrada.toString());
      const env = new Environment(null);

      for (const instr of ast) {
        try {
          if (instr instanceof Function)
            instr.execute(env);
        } catch (error) {
          errores.push(error);
        }
      }

      for (const instr of ast) {
        if (instr instanceof Function)
          continue;
        try {
          env.cleanResult();
          const actual = instr.execute(env);
          // TODO Arreglar el mensaje del Break en el default
          if (actual != null || actual != undefined) {
            errores.push(new Error_(actual.line, actual.column, 'Semantico', actual.type + ' fuera de un ciclo'));
          }
          // Muestra el resultado en la pagina
          this.salida += env.getResult();
        } catch (error) {
          errores.push(error);
        }
      }
    }
    catch (error) {
      this.salida += error + "\n";
    }
    if(errores.length != 0 ) this.salida += errores + "\n";
  }
}