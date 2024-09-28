const adiconaItem = async () => {
  try {
    const nomeValue = document.getElementById('nome').value;
    const categoriaValue = document.getElementById('categoria').value;
    const valorValue = parseFloat(document.getElementById('valor').value) || 0; 
    const emprestadoValue = document.getElementById('emprestado').checked;
    const destinatarioValue = document.getElementById('destinatario').value;

    const novoItem = {
      nomeItem: nomeValue,
      categoriaItem: categoriaValue,
      emprestado: emprestadoValue,
      destinatario: destinatarioValue,
      valor: valorValue.toFixed(2)
    };

    const endpoint = emprestadoValue ? 'http://localhost:3000/emprestado' : 'http://localhost:3000/meuInventario';

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(novoItem),
    });

    if (!response.ok) {
      throw new Error(`Erro ao adicionar item: ${response.statusText}`);
    }

    // Atualize as listas após adicionar o novo item
    listarItensEmprestado();
    listarItensInventario();

    document.querySelector('.formulario').reset();

  } catch (error) {
    console.error('Erro ao adicionar item:', error);
  }
}

const deleteItemInventorio = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/meuInventario/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Erro ao deletar o item');
    }

    listarItensInventario(); 
  } catch (error) {
    console.error('Erro:', error);
  }
};

const deleteItemEmprestado = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/emprestado/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Erro ao deletar o item');
    }

    // Atualizar a lista após a exclusão
    listarItensEmprestado(); 
  } catch (error) {
    console.error('Erro:', error);
  }
};

const btn = document.getElementById('btn');
btn.addEventListener('click', () => {
  event.preventDefault();
  adiconaItem();
});

const listarItensInventario = async () => {
  try {
    const responseInventario = await fetch('http://localhost:3000/meuInventario');
    const dataInventario = await responseInventario.json();

    document.getElementById('meuInventario').innerHTML = ''; 
    dataInventario.map(item => renderizaItemInventario(item));
  } catch (error) {
    console.log('Erro ao buscar os dados:', error);
  }
};

const listarItensEmprestado = async () => {
  try {
    const responseEmprestado = await fetch('http://localhost:3000/emprestado');
    const dataEmprestado = await responseEmprestado.json();

    document.getElementById('emprestado').innerHTML = ''; 
    dataEmprestado.forEach(item => renderizaItemEmprestado(item));
  } catch (error) {
    console.log('Erro ao buscar os dados:', error);
  }
};

const renderizaItemInventario = (item) => {
  console.log('Renderizando item:', item);
  
  let li = document.createElement('li');
  li.classList.add('card-list');

  let card = document.createElement('div');
  card.classList.add('card-item');

  let containerItem = document.createElement('div');
  containerItem.classList.add('container-item');

  let nome = document.createElement('strong');
  nome.id = 'name-item'; 
  nome.textContent = item.nomeItem; 

  let valor = document.createElement('small');
  valor.id = 'valor-item'; 
  valor.textContent = `R$ ${item.valor || 0}`; 

  containerItem.appendChild(nome);
  containerItem.appendChild(valor);
  
  card.appendChild(containerItem);

  let categoria = document.createElement('small');
  categoria.id = 'categoria-item'; 
  categoria.textContent = item.categoriaItem; 

  card.appendChild(categoria);

  let destinatario = document.createElement('small');
  destinatario.id = 'nome-destinatario';

  destinatario.textContent = "Meu inventário"; 
  card.appendChild(destinatario);
  li.appendChild(card);

  let button = document.createElement('button');
  button.classList.add('btn', 'btn-danger');
  button.textContent = 'x';
  button.onclick = function() {
    deleteItemInventorio(item.id);
  };

  card.appendChild(button);

  document.getElementById('meuInventario').appendChild(li);
};

const renderizaItemEmprestado = (item) => {
  console.log('Renderizando item emprestado:', item);
  
  let li = document.createElement('li');
  li.classList.add('card-list');

  let card = document.createElement('div');
  card.classList.add('card-item');

  let containerItem = document.createElement('div');
  containerItem.classList.add('container-item');

  let nome = document.createElement('strong');
  nome.id = 'name-item'; 
  nome.textContent = item.nomeItem; 

  let valor = document.createElement('small');
  valor.id = 'valor-item'; 
  valor.textContent = `R$ ${item.valor || 0}`; 

  containerItem.appendChild(nome);
  containerItem.appendChild(valor);
  
  card.appendChild(containerItem);

  let categoria = document.createElement('small');
  categoria.id = 'categoria-item'; 
  categoria.textContent = item.categoriaItem; 

  card.appendChild(categoria);

  let destinatario = document.createElement('small');
  destinatario.id = 'nome-destinatario';
  destinatario.textContent = item.destinatario; 
  card.appendChild(destinatario);
  li.appendChild(card);

  let button = document.createElement('button');
  button.classList.add('btn', 'btn-danger');
  button.textContent = 'x';
  button.onclick = function() {
    deleteItemEmprestado(item.id); 
  };

  card.appendChild(button);

  document.getElementById('emprestadoList').appendChild(li);
};

window.onload = async () => {
  await listarItensInventario();
  await listarItensEmprestado();
};
