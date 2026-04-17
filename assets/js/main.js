/*=========== main.js =======================*/

document.addEventListener('DOMContentLoaded', () => {
    console.log('% FinanzasPro - Dashboard iniciado correctamente', 'color:#6366f1; font-weight: bold; font-size: 14px;');


//=========1. Datos de la aplicacion =========
// este objeto contiene toda la informacion que usaremos


let appData = {
    credits: [
        {
            id: 1,
            name: 'Bancolombia',
            type: 'Credito',
            amount: 53000000,
            interest: 18,
            dueDate: '2026-04-15',
            cuota: 1300000
        },
        {
            id: 2,
            name: 'Bancolombia TC',
            type: 'TC',
            amount: 4700000,
            interest: 25,
            dueDate: '20-04-2026',
            cuota: 670000
        },
        {
            id: 3,
            name: 'Banco de Bogota TC',
            type: 'TC',
            amount: 1200000,
            interest: 25,
            dueDate: '20-04-2026',
            cuota: 250000
        }
    ],
    expenses: [
        {
            id: 1,
            desc: 'Mercado',
            category: 'Alimentacion',
            amount: 85000,
            date: "2026-04-16"
        },
        {
            id:2,
            desc: "Transporte",
            category: "Movilidad",
            amount: 12000,
            date: "2026-04-16"
        },
        {
            id: 3,
            desc: "Internet",
            category: "Servicios",
            amount: 60000,
            date: "2026-04-16"
        },
        {
            id: 4,
            desc: "Farmacia",
            category: "Salud",
            amount: 35000,
            date: "2026-04-14"
        },
        {
            id: 5,
            desc: "Restaurante",
            category: "Alimentacion",
            amount: 45000,
            date: "2026-04-13"
        }
    ],
    paymentsMade: 320000,  //---------------> cuanto has pagado este mes
    interestPaid: 94000    //---------------> intereses pagados este mes
};


//==========================2. PERSISTENCIA (localstorage)========================
function saveData() {
    localStorage.setItem('finanzaspro_data', JSON.stringify(appData));
    console.log('Datos guardados en localStorage');
}


function loadData() {
    const saveData = localStorage.getItem('finanzaspro_data');
    if(saveData) {
        appData = JSON.parse(saveData);
        console.log('Datos cargados desde localstorage');
    }else {
        saveData();  //se guardan los datos iniciales la primera vez
    }
}




//=============================3. FUNCIONES DE CALCULO=====================
function calculateTotalDebt() {
    return appData.credits.reduce((total,credit) => total + credit.amount, 0);
}
function calculateTotalExpenses() {
    return appData.expenses.reduce((total,expense) => total + expense.amount, 0);
}

//=============================4. ACTUALIZAR EL DASHBOARD======================

function updateDashboard() {
    const totalDebt = calculateTotalDebt();
    const totalExpense = calculateTotalExpenses();

    //actualizamos las 4 tarjetas usando sus IDs

    document.getElementById('total-deudas').textContent = '$' + totalDebt.toLocaleString('es-CO');

    document.getElementById('total-pagado').textContent = '$' + appData.paymentsMade.toLocaleString('es-CO');

    document.getElementById('total-gastos').textContent = '$' + totalExpense.toLocaleString('es-CO');

    document.getElementById('total-intereses').textContent = '$' + appData.interestPaid.toLocaleString('es-CO');

    console.log('Dashboard actualizado con datos reales');
}

//=============================5. INICIALIZACION============================

function init() {
    saveData();
    loadData();
    updateDashboard();

    //algunas funciones disponibles para otros archivos JS

    window.appData = appData;
    window.saveData = saveData;
    window.updateDashboard = updateDashboard;

    console.log('FinanzasPro - Interacion 1 completada correctamente');
    console.table({
        'Total Deudas': '$' + calculateTotalDebt().toLocaleString('es-CO'),
        'Gastos del Mes': '$' + calculateTotalExpenses().toLocaleString('es-CO'),
        'Creditos Activos': '$' + appData.credits.length,
        'Pagado este mes': '$' + appData.paymentsMade.toLocaleString('es-CO')

    });
}

init();




});