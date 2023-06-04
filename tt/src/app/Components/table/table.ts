import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

/**
 * @title Binding event handlers and properties to the table rows.
 */
@Component({
  selector: 'TableRowBindingExample',
  styleUrls: ['table.css'],
  templateUrl: 'table.html',
  standalone: true,
  imports: [MatTableModule,
    NgIf,
    NgFor,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,],
})
export class TableRowBindingExample {

  constructor(public dialog: MatDialog, http: HttpClient, private formBuilder: FormBuilder) {
    http.get<any[]>('http://localhost:8080/veiculos').subscribe((data) => {
      this.veiculosMatTable = data;
      for (let i = 0; i < this.veiculosMatTable.length; i++) {
        this.veiculosMatTable[i].position = i + 1;
      }
      this.dataSource = this.veiculosMatTable;
    });

    this.editVeiculoForm = this.formBuilder.group({
      modelo: ['', Validators.required],
      placa: ['', Validators.required],
      chassi: ['', Validators.required],
      renavam: ['', Validators.required],
      marca: ['', Validators.required],
      ano: ['', Validators.required]
    });
  }
  veiculosMatTable: any[] = [];
  veiculoToEdit: any = null;
  editVeiculoForm: FormGroup;


  displayedColumns: string[] = ['position', 'name', 'marca', 'placa', 'chassi', 'ano', 'renavam', 'editar'];
  dataSource = ELEMENT_DATA;
  clickedRows = new Set<PeriodicElement>();



  openDialog(periodicElement: PeriodicElement): void {

    console.log("aqui", periodicElement)
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: periodicElement,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)

    });
  }




}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  standalone: true,
  styleUrls: ['dialog-overview-example-dialog.css'],
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
})
export class DialogOverviewExampleDialog {

  veiculoToEdit: any = null;
  editVeiculoForm: FormGroup;
  constructor(private http: HttpClient,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: PeriodicElement,private formBuilder: FormBuilder
  ) {

    this.editVeiculoForm = this.formBuilder.group({
      modelo: ['', Validators.required],
      placa: ['', Validators.required],
      chassi: ['', Validators.required],
      renavam: ['', Validators.required],
      marca: ['', Validators.required],
      ano: ['', Validators.required]
    });
  }

  onNoClick(): void {
    console.log("aqui")
    this.dialogRef.close();
  }

  editVeiculo(veiculo: any) {
    console.log("🚀 ~ file: table.ts:132 ~ DialogOverviewExampleDialog ~ editVeiculo ~ veiculo:", veiculo)
    this.veiculoToEdit = veiculo;


    this.editVeiculoForm.patchValue({
      id: veiculo.id,
      modelo: veiculo.modelo,
      placa: veiculo.placa,
      chassi: veiculo.chassi,
      renavam: veiculo.renavam,
      marca: veiculo.marca,
      ano: veiculo.ano
    });
  }

  submitEditVeiculoForm() {
    // Obtenha os valores do formulário de edição
    if (this.editVeiculoForm.valid) {
      const editVeiculoData = this.editVeiculoForm.value;
      const veiculoId = this.veiculoToEdit.id;

      this.http.put<any>(`http://localhost:8080/veiculos/${veiculoId}`, editVeiculoData).subscribe(
        (response) => {
          console.log(response);
          this.dialogRef.close();
        },
        (error: any) => {
          console.error('Ocorreu um erro ao editar o veículo:', error);

        }
      );
    } else {
      // this.errorMessage = 'Campos obrigatórios não preenchidos.'
    }
  }
}
