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
    if (!item) return;

    item.classList.toggle('aberto');
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

      const painelAtivo = abas.querySelector(`[data-panel="${aba}"]`);
      if (painelAtivo) painelAtivo.classList.add('ativo');
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

const calcularCarbono = document.querySelector('#calcularCarbono');

if (calcularCarbono) {
  calcularCarbono.addEventListener('click', () => {
    const areaCalc = document.querySelector('#areaCalc');
    const vegetacaoCalc = document.querySelector('#vegetacaoCalc');
    const resultadoCarbono = document.querySelector('#resultadoCarbono');
    const valorCarbono = document.querySelector('#valorCarbono');
    const valorReais = document.querySelector('#valorReais');

    if (!areaCalc || !vegetacaoCalc || !resultadoCarbono || !valorCarbono || !valorReais) {
      return;
    }

    const area = parseFloat(areaCalc.value);

    if (!area || area <= 0) {
      alert('Por favor, informe uma area valida.');
      return;
    }

    const fator = {
      floresta: 150,
      caatinga: 80,
      cerrado: 100,
      mata: 120
    };
    const vegetacao = vegetacaoCalc.value;
    const toneladas = Math.round(area * fator[vegetacao]);
    const reais = toneladas * 50;

    valorCarbono.innerText = `${toneladas} toneladas de CO2`;
    valorReais.innerText = `Equivalente a R$ ${reais.toLocaleString('pt-BR')},00`;
    resultadoCarbono.style.display = 'block';
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
      if (!element) {
        formularioValido = false;
        return;
      }

      const field = element.closest('.campo-formulario');
      if (!field) {
        formularioValido = false;
        return;
      }

      const error = field.querySelector('.mensagem-erro');
      const value = element.value.trim();
      const fieldIsValid = validate ? validate(value) : value !== '';

      field.classList.toggle('invalido', !fieldIsValid);
      if (error) error.textContent = fieldIsValid ? '' : message;
      if (!fieldIsValid) formularioValido = false;
    });

    const feedback = document.querySelector('#formFeedback');
    if (formularioValido) {
      if (feedback) feedback.textContent = 'Mensagem enviada com sucesso na simulacao.';
      contactForm.reset();
    } else {
      if (feedback) feedback.textContent = 'Revise os campos destacados antes de enviar.';
    }
  });
}



