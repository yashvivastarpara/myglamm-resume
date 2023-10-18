let timer = null;
const projects = [
  {
    title: "EducaTech: Plataforma de Aprendizado Online",
    description:
      "Uma plataforma de ensino digital inovadora que oferece cursos, tutoriais e recursos educacionais para aprendizado personalizado em diversas áreas de conhecimento, promovendo a educação acessível a todos.",
    bg: "#55efc4"
  },
  {
    title: "EcoCidade: Sustentabilidade Urbana",
    description:
      "Um projeto ambicioso dedicado ao desenvolvimento de tecnologias e políticas urbanas sustentáveis, visando transformar cidades em ambientes mais ecológicos, eficientes e habitáveis, reduzindo o impacto ambiental.",
    bg: "#a29bfe"
  },
  {
    title: "Saúde360: Monitoramento de Bem-Estar",
    description:
      "Uma aplicação de saúde e bem-estar abrangente, que combina wearables, aplicativos móveis e análise de dados para fornecer informações detalhadas sobre a saúde pessoal, promovendo uma vida saudável e ativa.",
    bg: "#ffeaa7"
  }
];
const wrapper = () => document.querySelector("#wrapper");

const observerOptions = {
  root: wrapper(),
  rootMargin: "0px 0px 0px -220px"
};

function makeCard(id, title, description, bg) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("data-id", id);
  card.style.background = bg;

  const name = document.createElement("p");
  name.classList.add("name");
  name.innerText = "Project";

  const _title = document.createElement("h2");
  _title.classList.add("title");
  _title.innerText = title || "Title";

  const desc = document.createElement("p");
  desc.classList.add("description");
  desc.innerText = description || "Description not found!";

  const action = document.createElement("div");
  action.classList.add("action");
  action.innerHTML =
    '<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.1602 31.4801L31.4802 10.1601L10.1602 31.4801ZM31.4802 10.1601V30.6273V10.1601ZM31.4802 10.1601H11.013H31.4802Z" fill="#121418"/><path d="M10.1602 31.4801L31.4802 10.1601M31.4802 10.1601V30.6273M31.4802 10.1601H11.013" stroke="#121418" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </svg>';

  card.append(name, _title, desc, action);
  return card;
}

function initilize(fn) {
  projects.map((p, index) => {
    wrapper().append(makeCard(index, p.title, p.description, p.bg));
    if (index + 1 === projects.length) {
      fn();
    }
  });
}

function addNewCardsInTheLastPosition(cards) {
  const cardId = parseInt(cards[cards.length - 1].getAttribute("data-id"));
  const previewId = cardId + 1;
  const id = previewId >= projects.length ? 0 : previewId;
  const data = projects[id];

  wrapper().append(makeCard(id, data.title, data.description, data.bg));
}

const onScrollHandle = (ev) => {
  const { deltaY } = ev;
  const _wrapper = wrapper();

  function scroll() {
    ev.stopPropagation();

    if (deltaY < 0) {
      ev.preventDefault();
      if (_wrapper.scrollLeft === 0) {
        _wrapper.lastElementChild.scrollIntoView();
        return;
      }

      _wrapper.scrollLeft += 220 * -1;
    } else if (deltaY > 0) {
      _wrapper.scrollLeft += 220 * 1;
      ev.preventDefault();
    }
    clearTimeout(timer);
  }

  clearTimeout(timer);
  timer = setTimeout(scroll, 250);
};

initilize(() => {
  let lastCard = wrapper().lastElementChild;

  const callback = ([{ isIntersecting }]) => {
    if (isIntersecting) {
      addNewCardsInTheLastPosition(wrapper().childNodes);
      obs.unobserve(lastCard);
      lastCard = wrapper().lastElementChild;
      obs.observe(lastCard);
    }
  };

  const obs = new IntersectionObserver(callback, observerOptions);
  obs.observe(lastCard);
});

// Starting scroll without SHIFT in firefox
wrapper().addEventListener("wheel", onScrollHandle);
