import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroVeiculos'
})
export class FiltroVeiculosPipe implements PipeTransform {
  transform(veiculos: any[], filtroMarca: string, filtroAno: string, filtroModelo: string): any[] {
    let veiculosFiltrados = veiculos;

    if (filtroMarca) {
      veiculosFiltrados = veiculosFiltrados.filter(veiculo =>
        veiculo.marca.toLowerCase().includes(filtroMarca.toLowerCase())
      );
    }

    if (filtroAno) {
      veiculosFiltrados = veiculosFiltrados.filter(veiculo =>
        veiculo.ano.toString().includes(filtroAno)
      );
    }

    if (filtroModelo) {
      veiculosFiltrados = veiculosFiltrados.filter(veiculo =>
        veiculo.modelo.toLowerCase().includes(filtroModelo.toLowerCase())
      );
    }

    return veiculosFiltrados;
  }
}
