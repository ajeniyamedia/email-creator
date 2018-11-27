import Swal from 'sweetalert2';


export class AppError {
    constructor(public originalError?: any){
        Swal({
            position: 'top-end',
            type: 'error',
            title: 'Please check your network connection',
            showConfirmButton: false,
          })
    }
}