import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-veiculo-list',
  templateUrl: './veiculo-list.component.html',
  styleUrls: ['./veiculo-list.component.css']
})
export class VeiculoListComponent implements OnInit {
  veiculos: any[] = [];
  veiculoForm: FormGroup;
  editVeiculoForm: FormGroup;
  veiculoModalOpen: boolean = false;
  veiculoToEdit: any = null;
  isModalOpen: boolean = false;
  isEditing: boolean = false;
  errorMessage: string = '';

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.veiculoForm = this.formBuilder.group({
      modelo: ['', Validators.required],
      placa: ['', Validators.required],
      chassi: ['', Validators.required],
      renavam: ['', Validators.required],
      marca: ['', Validators.required],
      ano: ['', Validators.required]
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



  ngOnInit() {
    this.fetchVeiculos();
  }


  fetchVeiculos() {
    this.http.get<any[]>('http://localhost:8080/veiculos').subscribe(
      (response) => {
        this.veiculos = response;
      },
      (error) => {
        console.error('Ocorreu um erro ao buscar os veículos:', error);
      }
    );
  }

  submitVeiculoForm() {
    if (this.veiculoForm.valid) {
      const veiculoData = this.veiculoForm.value;
      this.http.post<any>('http://localhost:8080/veiculos', veiculoData).subscribe(
        (response) => {
          this.errorMessage = 'Veículo inserido com sucesso!'; // Limpa a mensagem de erro
          console.log('Veículo inserido com sucesso:', response);
          this.veiculoForm.reset();
          this.fetchVeiculos();
        },
        (error) => {
          console.error('Ocorreu um erro ao inserir o veículo:', error);
          this.errorMessage = JSON.stringify(error.error.error); // Define a mensagem de erro
        }
      );
    } else {
      this.errorMessage = 'Campos obrigatórios não preenchidos.'
      console.log('Formulário inválido. Verifique os campos.');
    }
  }
  editVeiculo(veiculo: any) {
    this.veiculoToEdit = veiculo;
    this.isEditing = true;
    this.isModalOpen = false;
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
          this.errorMessage = '';
          this.fetchVeiculos();
          this.resetEditVeiculoForm();
          this.closeEditModal();
        },
        (error) => {
          console.error('Ocorreu um erro ao editar o veículo:', error);
          this.errorMessage = 'Erro ao editar o veículo. Por favor, tente novamente.';
        }
      );
    } else {
      this.errorMessage = 'Campos obrigatórios não preenchidos.'
    }
  }

  deleteVeiculo(veiculo: any) {
    this.http.delete(`http://localhost:8080/veiculos/${veiculo.id}`).subscribe(
      (response) => {
        console.log('Veículo excluído com sucesso:', response);
        this.fetchVeiculos();
      },
      (error) => {
        console.error('Ocorreu um erro ao excluir o veículo:', error);
      }
    );
  }

  resetEditVeiculoForm() {
    this.editVeiculoForm.reset();
  }
  resetVeiculoForm() {
    this.veiculoForm.reset();
  }

  closeEditModal() {
    this.veiculoToEdit = null;
    this.isEditing = false;
  }
  openVeiculoModal() {
    this.isModalOpen = true;
  }

  closeVeiculoModal() {
    this.isModalOpen = false;
    this.veiculoModalOpen = false;
    this.resetVeiculoForm();
  }
}
