$(document).ready(function(){

  const form = $('#user-form');
  const inputProduct = $('#user-form__input-product');
  const inputQuantity = $('#user-form__input-quantity');
  const inputCost = $('#user-form__input-cost');

  //Separo los datos que voy a necesitar
  class Shopping {
    constructor(product, quantity, cost) {
      this.product = product;
      this.quantity = quantity;
      this.cost = cost;
    }
  }

  let listShopping = [];

  //Valido si en el storage hay users si hay asigno mi listShopping a los datos del storage
  if (localStorage.getItem('groceries')) {
    listShopping = JSON.parse(localStorage.getItem('groceries'));
  }

  //Agrego a la lista y guardo en el storage un producto
  function saveToStorage(key, shopping) {
    listShopping.push(shopping);
    localStorage.setItem(key, JSON.stringify(listShopping));
  }

  //Obtengo los datos del storage
  function getShoppingFromStorage(key) {
    if(localStorage.getItem(key)){
      return JSON.parse(localStorage.getItem(key));
    }
  }

  //Escucho el evento submit del formulario
  form.submit(function(event) {
    event.preventDefault();

    //Obtengo los valores ingresados por el usuario
    const product = inputProduct.val();
    const quantity = inputQuantity.val();
    const cost = inputCost.val();

    const shopping = new Shopping(product, quantity, cost);

    //Si no existen productos en el storage creo la tabla y creo el header
    if(!localStorage.getItem('groceries')){
      createTable('body', 'user-table');
      createTableHeader(['Producto', 'Cantidad', 'Costo', 'Costo individual', 'IVA total'], '#user-table');
    }

    //guardo el usuario en localstorage
    saveToStorage('groceries', shopping);

    //creo la nueva fila y la asocio a la tabla creada anteriormente
    createRowShopping(shopping, '#user-table');

  });

  //Si hay datos en el storage populo la tabla con esos datos.
  if(localStorage.getItem('groceries')){
    createTable('body', 'user-table');
    createTableHeader(['Producto', 'Cantidad', 'Costo', 'Costo individual', 'IVA total'], '#user-table');
    populateRows(getShoppingFromStorage('groceries'), '#user-table');
  }


  //Crea una tabla en el elemento recibido por parametro y con el id recibido.
  function createTable(element, product) {
    const table = `<table id=${product}></table>`;
    $(element).append(table);
  }

  //Crea el header de una tabla recibiendo un array de columnas con sus valores y el elemento donde colocarlo
  function createTableHeader(data, element) { 
    const header = `<tr>${createDataHeader(data)}</tr>`;
    $(element).append(header);
  }

  function createDataHeader(data) {
    return data.map(headerData => `<th>${headerData}</th>`);
  }

  //Crea una row y la llena con los datos del producto
  function createRowShopping(shopping, element){
    const row = `<tr id=tr-${shopping.product}>
      ${populateTableData(shopping.product, shopping.quantity, shopping.cost)}
    </tr>`;
    $(element).append(row);
  }

  
  //Recorre un array de objetos groceries y crea las rows necesarias segun la cantidad de groceries.

  function populateRows(data, element){
    data.map(shopping => {
      createRowShopping(shopping, element);
    });
  }

  //Crea la data de cada row.

  function populateTableData(product, quantity, cost){ 
    return `
    <td>${product} </td>
    <td>${quantity} </td>
    <td>${'$' + cost}</td>
    <td>${'$'+ cost/quantity}</td>
    <td>${'$' + (cost/1.21)*0.21}</td>
    `
  }

});




