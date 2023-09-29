document.addEventListener('DOMContentLoaded', function() {
    var telefoneInput = document.getElementById('telefone');
    var nomeInput = document.getElementById('nome');
    var emailInput = document.getElementById('email');
    var mensagemInput = document.getElementById('mensagem');

    telefoneInput.addEventListener('input', function() {
        var valor = this.value.replace(/\D/g, '');

        if (valor.length > 2) {
            valor = '(' + valor.substring(0, 2) + ') ' + valor.substring(2);
        }

        if (valor.length > 9) {
            valor = valor.substring(0, 10) + '-' + valor.substring(10, 14);
        }

        this.value = valor;
    });

    var formulario = document.getElementById('formularioContato');

    formulario.addEventListener('submit', function(event) {
        var inputs = [nomeInput, emailInput, telefoneInput, mensagemInput];

        inputs.forEach(function(input) {
            if (input.value.trim() !== '') {
                if (input === telefoneInput) {
                    if (/^\(\d{2}\) \d{5}-\d{4}$/.test(input.value.trim())) {
                        input.classList.add('field-valid');
                    } else {
                        input.classList.remove('field-valid');
                    }
                } else {
                    input.classList.add('field-valid');
                }
            } else {
                input.classList.remove('field-valid');
            }
        });

        var camposValidos = inputs.every(function(input) {
            return input.classList.contains('field-valid');
        });

        if (camposValidos) {
            $('#modalAgradecimento').modal('show'); // Abre o modal de agradecimento
            event.preventDefault(); // Previne o envio do formulário
        } else {
            event.preventDefault(); // Previne o envio do formulário
        }
    });

    // Adiciona um evento ao modal que dispara quando o modal é fechado
    $('#modalAgradecimento').on('hidden.bs.modal', function () {
        location.reload(); // Recarrega a página
    });
});
