const select = document.getElementById("dropdown-menu");
const result = document.querySelector(".result");
const refreshBtn = document.createElement("button");
refreshBtn.className = "refreshBtn-hidden";

// Ingresa tu token de GitHub aquí para evitar límites de petición en la API
// Si no se proporciona, la API permitirá un número limitado de solicitudes no autenticadas
// Comenta la linea de abajo, si no quieres utilizar un token, y tambien la linea que contiene
// el encabezado Authorization, en el segundo parametro de fetch.

const TOKEN_GITHUB = '';

refreshBtn.textContent = "Mostrar otro";
refreshBtn.addEventListener("click", () =>
  searchRepositories(select.value, true)
);

result.after(refreshBtn);

function createList(data) {
  const fragment = document.createDocumentFragment();

  data.forEach((language) => {
    const optionElement = document.createElement("option");
    optionElement.value = language.title;
    optionElement.textContent = language.title;
    fragment.append(optionElement);
  });

  select.append(fragment);
}

function showMessage(message, isError) {
  result.textContent = message;

  if (isError) result.classList.add("error");

  if (!refreshBtn.classList.contains("refreshBtn-hidden"))
    refreshBtn.className = "refreshBtn-hidden";
}

function truncateText(text, maxLength = 250) {
  if (!text) return "Sin descripción disponible.";
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}

function contentResult({
  name,
  description,
  stargazers_count,
  forks_count,
  html_url,
}) {
  result.innerHTML = `<h2>${name}</h2>
        <p>${truncateText(description)}</p>
        <span class="starCount"><i class="fa-solid fa-star"></i>${stargazers_count}</span>
        <span class="forksCount"><i class="fa-solid fa-code-fork"></i>${forks_count}</span><br>
        <a href="${html_url}" target="_blank"><i class="fa-solid fa-link"></i>Ver en GitHub</a>`;

  if (refreshBtn.classList.contains("refreshBtn-hidden"))
    refreshBtn.className = "";
}

let isFetching = false;

async function searchRepositories(language, isRefresh = false) {
  if (isFetching) return;
  isFetching = true;

  if (!isRefresh) showMessage("Espera un momento...", false);

  const url = `https://api.github.com/search/repositories?q=${language}&sort=stars&order=desc&per_page=10`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github.v3+json",

        // Si el usuario no tiene un token, puede intentar eliminar esta línea,
        // aunque tendrá un límite de peticiones menor
        Authorization: `token ${TOKEN_GITHUB}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (data.items.length === 0) {
      showMessage("No se encontraron repositorios para este lenguaje.", true);
      return;
    }

    const randomIndex = Math.floor(Math.random() * data.items.length);
    const repo = data.items[randomIndex];

    contentResult(repo);
  } catch (error) {
    showMessage(`Error al obtener datos: ${error.message}`, true);
  } finally {
    isFetching = false;
  }
}

async function getLanguages() {
  const url =
    "https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json";

  try {
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(`Error: ${response.status} ${response.statusText}`);

    const data = await response.json();
    createList(data);
  } catch (error) {
    showMessage(`Error al obtener los lenguajes: ${error.message}`, true);
  }
}

getLanguages();

select.addEventListener("change", () => searchRepositories(select.value));
