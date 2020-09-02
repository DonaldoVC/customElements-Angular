import Swal from 'sweetalert2';

export function simpleButton(title, type, message) {
    return Swal.fire({
        title: title,
        text: message,
        type: type,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#545D6E',
    });
}

export function cancelButton(title, type, message) {
    return Swal.fire({
        title: title,
        text: message,
        type: type,
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#545D6E',
        cancelButtonColor: '#AD4548'
    });
}

export function serviceNotAvailable() {
    return Swal.fire({
        title: 'Aviso',
        text: 'Servicio temporalmente no disponible, verifica tu conexión a internet e intenta más tarde.',
        type: 'info',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#545D6E',
    });
}
