import { SendFileController } from "../controller/sendfileController.js";

const btnSelectFile = document.querySelector('#nomeArquivo');
const selectSheet = document.querySelector('.select-sheets');
const btnSendFile = document.querySelector('.btn-send-file');
const options = document.getElementsByTagName('option');

btnSelectFile.addEventListener('change', () => {

    options.length > 0 ? removeOptions() : '';

    var isExcel = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx|.xlsm)$/;
    
    if(isExcel.test(btnSelectFile.value)){
        
        var reader = new FileReader();
        
        if(reader.readAsBinaryString){
            
            reader.onload = function (e) {
                getNameSheets(e.target.result);
            };

            reader.readAsBinaryString(btnSelectFile.files[0]);

        }

    }else{
        btnSelectFile.value = '';
        alert('Please, select a valid excel file;.')
    }

});

function getNameSheets(nameWorkbook) {

    var workbook = XLSX.read(nameWorkbook, {
        type: 'binary'
    });

    var sheets = workbook.SheetNames;

    const optrionNull = document.createElement('option');
    selectSheet.appendChild(optrionNull);

    sheets.sort().forEach((sheet) => {
        const nameSheet = document.createElement('option');
        nameSheet.value = sheet;
        nameSheet.textContent = sheet;
        selectSheet.appendChild(nameSheet)
    });
    
    selectSheet.addEventListener('change', (data) => {
        
        selectSheet.value !== '' ? btnSendFile.disabled = false : btnSendFile.disabled = true;
        
    });
    
    btnSendFile.addEventListener('click', () => {
        
        SendFileController.sendFile(nameWorkbook, selectSheet.value)

    });    

};

function removeOptions(){

    for(let i = options.length; i>0; i--){
        options[0].remove();
    };

};