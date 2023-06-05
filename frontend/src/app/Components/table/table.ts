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
  modelo: string;
  ano: number;
  marca: string;
  placa: string;
  chassi: string;
  renavam: string;
  position: number;
  weight: number;
  symbol: string;
}

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
  displayedColumns: string[] = ['position', 'modelo', 'marca', 'placa', 'chassi', 'ano', 'renavam', 'editar'];
  dataSource = this.veiculosMatTable;
  clickedRows = new Set<PeriodicElement>();

  openDialog(periodicElement: PeriodicElement): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: periodicElement,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)

    });
  }

  addVeiculoDialog() {
    const dialogRef = this.dialog.open(DialogNewVeiculo, {
      data: {
        modelo: '',
        placa: '',
        chassi: '',
        renavam: '',
        marca: '',
        ano: ''
      },
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
    @Inject(MAT_DIALOG_DATA) public data: PeriodicElement, private formBuilder: FormBuilder
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
    this.dialogRef.close();
  }

  editVeiculo(veiculo: any) {
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

    if (this.editVeiculoForm.valid) {
      const editVeiculoData = this.editVeiculoForm.value;
      const veiculoId = this.veiculoToEdit.id;
      this.http.put<any>(`http://localhost:8080/veiculos/${veiculoId}`, veiculo).subscribe(
        (response) => {
          this.dialogRef.close();
        },
        (error: any) => {
          console.error('Ocorreu um erro ao editar o veículo:', error);
        }
      );
    } else {
      console.log('Campos obrigatórios não preenchidos.')
    }
  }

  addVeiculo(veiculo: any) {
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

    if (this.editVeiculoForm.valid) {
      const editVeiculoData = this.editVeiculoForm.value;
      const veiculoId = this.veiculoToEdit.id;
      this.http.post<any>(`http://localhost:8080/veiculos/`, veiculo).subscribe(
        (response) => {
          this.dialogRef.close();
        },
        (error: any) => {
          console.error('Ocorreu um erro ao editar o veículo:', error);
        }
      );

      // recarregar tabela
      TableRowBindingExample
    } else {
      console.log('Campos obrigatórios não preenchidos.')
    }
  }

  submitEditVeiculoForm() {

    if (this.editVeiculoForm.valid) {
      const editVeiculoData = this.editVeiculoForm.value;
      const veiculoId = this.veiculoToEdit.id;

      this.http.put<any>(`http://localhost:8080/veiculos/${veiculoId}`, editVeiculoData).subscribe(
        (response) => {
          this.dialogRef.close();
        },
        (error: any) => {
          console.error('Ocorreu um erro ao editar o veículo:', error);
        }
      );
    }
  }
}

@Component({
  selector: 'dialog-new-veiculo',
  templateUrl: 'dialog-new-veiculo.html',
  standalone: true,
  styleUrls: ['dialog-overview-example-dialog.css'],
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
})
export class DialogNewVeiculo {
  veiculoToEdit: any = null;
  editVeiculoForm: FormGroup;
  constructor(private http: HttpClient,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: PeriodicElement, private formBuilder: FormBuilder
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
    this.dialogRef.close();
  }

  addVeiculo(veiculo: any) {
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

    if (this.editVeiculoForm.valid) {
      const editVeiculoData = this.editVeiculoForm.value;
      const veiculoId = this.veiculoToEdit.id;
      this.http.post<any>(`http://localhost:8080/veiculos/`, veiculo).subscribe(
        (response) => {
          this.dialogRef.close();
        },
        (error: any) => {
          console.error('Ocorreu um erro ao editar o veículo:', error);
        }
      );
    } else {
      console.log('Campos obrigatórios não preenchidos.')
    }
  }
}

