function buscar() {
  var name = document.querySelector('#users')

  if (document.querySelector('#lista') != null) {
    document.querySelector('#lista').remove()
    var ol = document.createElement('ol')
    ol.id = 'lista'
    document.querySelector('#app').appendChild(ol)
  }

  var list = document.createElement('li')
  list.innerHTML = 'Carregando...'
  document.querySelector('#lista').appendChild(list)

  axios.get(`https://api.github.com/users/${name.value}/repos`)
    .then(function(response) {
      list.remove()
      listar(response)

    })
    .catch(function(error) {
      if (error.response.status === 404) {
        list.remove()
        alert('O usuario nao existe')
      }
    })
  }

function listar(response) {
  var length = response.data.length
  var repositories = document.querySelector('#lista')
  
  document.querySelector('#users').value = ''
  
  for (i = 0; i < length; i++) {
    var list = document.createElement('li')
    var link = document.createElement('a')

    list.innerHTML = response.data[i].name
    link.href = response.data[i].html_url
    link.innerHTML = 'Link'
        
    list.appendChild(link)
    repositories.appendChild(list)
  }
}

