const botaoMenu = document.querySelector('.botao-menu');
const linksMenu = document.querySelector('.links-menu');

if (botaoMenu && linksMenu) {
  botaoMenu.addEventListener('click', () => {
    const menuAberto = linksMenu.classList.toggle('aberto');
    botaoMenu.setAttribute('aria-expanded', String(menuAberto));
  });
}

document.querySelectorAll('.pergunta-faq').forEach((botao) => {
  botao.addEventListener('click', () => {
    const item = botao.closest('.item-faq');
    if (item) item.classList.toggle('aberto');
  });
});

document.querySelectorAll('[data-abas]').forEach((abas) => {
  const botoes = abas.querySelectorAll('.botao-aba');
  const conteudos = abas.querySelectorAll('.conteudo-aba');

  botoes.forEach((botao) => {
    botao.addEventListener('click', () => {
      const aba = botao.dataset.tab;

      botoes.forEach((item) => item.classList.remove('ativo'));
      conteudos.forEach((conteudo) => conteudo.classList.remove('ativo'));

      botao.classList.add('ativo');
      const painel = abas.querySelector(`[data-panel="${aba}"]`);
      if (painel) painel.classList.add('ativo');
    });
  });
});

const areaRange = document.querySelector('#areaRange');
const vegetationRange = document.querySelector('#vegetationRange');
const areaOutput = document.querySelector('#areaOutput');
const vegetationOutput = document.querySelector('#vegetationOutput');
const simulateAlert = document.querySelector('#simulateAlert');
const riscoTitle = document.querySelector('#riscoTitle');
const riscoText = document.querySelector('#riscoText');
const ndviValue = document.querySelector('#ndviValue');
const carbonValue = document.querySelector('#carbonValue');

function atualizarPainel() {
  if (
    !areaRange ||
    !vegetationRange ||
    !areaOutput ||
    !vegetationOutput ||
    !riscoTitle ||
    !riscoText ||
    !ndviValue ||
    !carbonValue
  ) {
    return;
  }

  const area = Number(areaRange.value);
  const vegetation = Number(vegetationRange.value);
  const ndvi = (vegetation / 100).toFixed(2);
  const carbon = Math.round(area * vegetation * 0.78 / 100);

  areaOutput.textContent = `${area} ha`;
  vegetationOutput.textContent = `${vegetation}%`;
  ndviValue.textContent = ndvi;
  carbonValue.textContent = `${carbon} t`;

  if (vegetation < 35) {
    riscoTitle.textContent = 'Risco alto';
    riscoText.textContent = 'A cobertura vegetal esta baixa. A recomendacao e solicitar vistoria e registrar evidencias de campo.';
  } else if (vegetation < 70) {
    riscoTitle.textContent = 'Risco moderado';
    riscoText.textContent = 'A area tem cobertura intermediaria. Vale acompanhar solo exposto e pontos de mudanca recente.';
  } else {
    riscoTitle.textContent = 'Risco baixo';
    riscoText.textContent = 'A area apresenta boa cobertura vegetal e pode gerar evidencias positivas para programas sustentaveis.';
  }
}

if (simulateAlert) {
  [areaRange, vegetationRange, simulateAlert].forEach((element) => {
    if (!element) return;
    element.addEventListener('input', atualizarPainel);
    element.addEventListener('click', atualizarPainel);
  });
}

const calculateCarbon = document.querySelector('#calculateCarbon');

if (calculateCarbon) {
  calculateCarbon.addEventListener('click', () => {
    const carbonArea = document.querySelector('#carbonArea');
    const carbonPrice = document.querySelector('#carbonPrice');
    const result = document.querySelector('#carbonResult');

    if (!carbonArea || !carbonPrice || !result) return;

    const area = Number(carbonArea.value);
    const price = Number(carbonPrice.value);

    if (area <= 0 || price <= 0) {
      result.textContent = 'Preencha valores maiores que zero.';
      return;
    }

    const tons = area * 6;
    const value = tons * price;
    result.textContent = `Potencial estimado: ${value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
  });
}

const contactForm = document.querySelector('#contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const campos = [
      { element: document.querySelector('#name'), message: 'Informe seu nome.' },
      { element: document.querySelector('#email'), message: 'Informe um e-mail valido.', validate: (value) => /\S+@\S+\.\S+/.test(value) },
      { element: document.querySelector('#subject'), message: 'Selecione um assunto.' },
      { element: document.querySelector('#message'), message: 'Escreva uma mensagem com pelo menos 10 caracteres.', validate: (value) => value.length >= 10 }
    ];
    let formularioValido = true;

    campos.forEach(({ element, message, validate }) => {
      const field = element.closest('.campo-formulario');
      const error = field.querySelector('.mensagem-erro');
      const value = element.value.trim();
      const fieldIsValid = validate ? validate(value) : value !== '';

      field.classList.toggle('invalido', !fieldIsValid);
      error.textContent = fieldIsValid ? '' : message;
      if (!fieldIsValid) formularioValido = false;
    });

    const feedback = document.querySelector('#formFeedback');
    if (formularioValido) {
      feedback.textContent = 'Mensagem enviada com sucesso na simulacao.';
      contactForm.reset();
    } else {
      feedback.textContent = 'Revise os campos destacados antes de enviar.';
    }
  });
}



