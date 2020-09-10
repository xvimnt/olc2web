import { Component, OnInit } from '@angular/core';
// Import para las graficas
import { graphviz } from 'd3-graphviz';
import { wasmFolder } from "@hpcc-js/wasm";
// Import para el servicio
import { DotService } from "../../services/dot.service" 

@Component({
  selector: 'app-ast',
  templateUrl: './ast.component.html',
  styleUrls: ['./ast.component.css']
})
export class AstComponent implements OnInit {

  constructor(private dotService: DotService) { }

  ngOnInit(): void {
    console.log('dot was',this.dotService.getDot());
    wasmFolder('https://cdn.jsdelivr.net/npm/@hpcc-js/wasm@0.3.13/dist');
    graphviz('#graph').renderDot('digraph {a -> b}');
  }

}
