const obterDataEHoraBrasil = () => {
    const dataEHoraAtual = new Date();

    // Extrai os componentes da data e hora
    const dia = String(dataEHoraAtual.getDate()).padStart(2, '0');
    const mes = String(dataEHoraAtual.getMonth() + 1).padStart(2, '0');
    const ano = dataEHoraAtual.getFullYear();
    const hora = String(dataEHoraAtual.getHours()).padStart(2, '0');
    const minuto = String(dataEHoraAtual.getMinutes()).padStart(2, '0');
    const segundo = String(dataEHoraAtual.getSeconds()).padStart(2, '0');

    // Cria a string no formato desejado (DD/MM/YYYY HH:mm:ss)
    const dataEHoraFormatadas = `${dia}/${mes}/${ano} ${hora}:${minuto}:${segundo}`;

    return dataEHoraFormatadas;
}

export default obterDataEHoraBrasil;