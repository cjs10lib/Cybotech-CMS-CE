import { Injectable } from '@angular/core';
import swal from 'sweetalert2';

@Injectable()
export class SweetAlertService {

  constructor() { }

  confirmUpdate() {
    return swal({
      title: 'Record Update!',
      text: 'Are you sure of the record supplied?',
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm!'
    });
  }

  afterUpdateSucess() {
    return swal({
      type: 'success',
      text: 'Database sucessfully updated',
      showConfirmButton: false,
      timer: 2000
    });
  }

  confirmDelete() {
    return swal({
      title: 'Record Delete!',
      text: 'You won\'t be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm!'
    });
  }

  afterDeleteSucess() {
    return swal({
      title: 'Deleted!',
      type: 'success',
      text: 'Product deleted sucessfully!',
      showConfirmButton: false,
      timer: 2000
    });
  }
}
