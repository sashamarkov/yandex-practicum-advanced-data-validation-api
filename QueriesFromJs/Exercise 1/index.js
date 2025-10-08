fetch('https://swapi.nomoreparties.co/people') //используйте fetch
  .then(res => {
    console.log(res.status === 200 ? res.status + ' OK' : res.status) // выведите код и сообщение статуса
    console.log(res) // выведем результат, можно изучить объект, хотя в нём почти ничего нет
    return res.text()  //запросите и выведите текст
      .then(text => console.log(text))
  });