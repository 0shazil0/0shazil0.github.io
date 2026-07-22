'use strict';


// element toggle function
const elementToggleFunc = function (elem) {
  if (!elem) {
    return;
  }
  elem.classList.toggle("active");
}


// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebarBtn) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}


// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  if (!modalContainer || !overlay) {
    return;
  }
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
if (testimonialsItem.length && modalImg && modalTitle && modalText) {
  for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener("click", function () {
      const avatar = this.querySelector("[data-testimonials-avatar]");
      const title = this.querySelector("[data-testimonials-title]");
      const text = this.querySelector("[data-testimonials-text]");

      if (avatar) {
        modalImg.src = avatar.src;
        modalImg.alt = avatar.alt;
      }

      if (title) {
        modalTitle.innerHTML = title.innerHTML;
      }

      if (text) {
        modalText.innerHTML = text.innerHTML;
      }

      testimonialsModalFunc();
    });
  }
}

// add click event to modal close button
if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
}

if (overlay) {
  overlay.addEventListener("click", testimonialsModalFunc);
}


// custom select variables
const select = document.querySelector("[data-select]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterList = document.querySelector("[data-filter-list]");
const selectList = document.querySelector("[data-select-list]");
const projectList = document.querySelector("[data-project-list]");

// portfolio detail variables
const detailBackBtn = document.querySelector("[data-detail-back]");
const detailEmpty = document.querySelector("[data-detail-empty]");
const detailContent = document.querySelector("[data-detail-content]");
const detailImage = document.querySelector("[data-detail-image]");
const detailCategory = document.querySelector("[data-detail-category]");
const detailTitle = document.querySelector("[data-detail-title]");
const detailSummary = document.querySelector("[data-detail-summary]");
const detailBullets = document.querySelector("[data-detail-bullets]");
const detailTechSection = document.querySelector("[data-detail-tech-section]");
const detailTech = document.querySelector("[data-detail-tech]");
const detailGallery = document.querySelector("[data-detail-gallery]");

let projects = [];
let activeCategory = "all";

const toCategoryKey = function (value) {
  return value.toLowerCase();
}

const applyFilter = function () {
  const filterItems = document.querySelectorAll("[data-filter-item]");
  for (let i = 0; i < filterItems.length; i++) {
    const itemCategory = filterItems[i].dataset.category;
    if (activeCategory === "all" || itemCategory === activeCategory) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

const updateFilterButtons = function (value) {
  if (!filterList) {
    return;
  }

  const buttons = filterList.querySelectorAll("[data-filter-btn]");
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].dataset.filterValue === value) {
      buttons[i].classList.add("active");
    } else {
      buttons[i].classList.remove("active");
    }
  }
}

const setActiveFilter = function (value, label) {
  activeCategory = value;
  updateFilterButtons(value);
  if (selectValue) {
    selectValue.innerText = label;
  }
  if (select) {
    select.classList.remove("active");
  }
  applyFilter();
}

const renderFilters = function (categories) {
  if (!filterList || !selectList) {
    return;
  }

  filterList.innerHTML = "";
  selectList.innerHTML = "";

  const allLabel = "All";
  filterList.insertAdjacentHTML(
    "beforeend",
    `<li class="filter-item"><button class="active" data-filter-btn data-filter-value="all">${allLabel}</button></li>`
  );
  selectList.insertAdjacentHTML(
    "beforeend",
    `<li class="select-item"><button data-select-item data-filter-value="all">${allLabel}</button></li>`
  );

  categories.forEach(function (category) {
    const key = toCategoryKey(category);
    filterList.insertAdjacentHTML(
      "beforeend",
      `<li class="filter-item"><button data-filter-btn data-filter-value="${key}">${category}</button></li>`
    );
    selectList.insertAdjacentHTML(
      "beforeend",
      `<li class="select-item"><button data-select-item data-filter-value="${key}">${category}</button></li>`
    );
  });
}

const renderProjects = function (items) {
  if (!projectList) {
    return;
  }

  projectList.innerHTML = "";

  items.forEach(function (project) {
    const categoryKey = toCategoryKey(project.category || "other");
    const image = project.image || "./assets/images/portfolio/unified_ai-ds_portfolio_shazil_shaikh_01.jpg";
    const title = project.title || "Project";
    const categoryLabel = project.category || "";

    const card = `
      <li class="project-item active" data-filter-item data-category="${categoryKey}">
        <a href="#" data-project-link data-project-id="${project.id}">
          <figure class="project-img">
            <div class="project-item-icon-box">
              <ion-icon name="eye-outline"></ion-icon>
            </div>
            <img src="${image}" alt="${title}" loading="lazy">
          </figure>
          <h3 class="project-title">${title}</h3>
          <p class="project-category">${categoryLabel}</p>
        </a>
      </li>
    `;

    projectList.insertAdjacentHTML("beforeend", card);
  });
}

const populateDetail = function (project) {
  if (!project) {
    return;
  }

  if (detailEmpty) {
    detailEmpty.style.display = "none";
  }

  if (detailContent) {
    detailContent.style.display = "block";
  }

  if (detailImage) {
    detailImage.src = project.image || "./assets/images/portfolio/unified_ai-ds_portfolio_shazil_shaikh_01.jpg";
    detailImage.alt = project.title || "Project";
  }

  if (detailCategory) {
    detailCategory.textContent = project.category || "";
  }

  if (detailTitle) {
    detailTitle.textContent = project.title || "";
  }

  if (detailSummary) {
    detailSummary.textContent = project.summary || "";
  }

  if (detailBullets) {
    detailBullets.innerHTML = "";
    (project.bullets || []).forEach(function (bullet) {
      detailBullets.insertAdjacentHTML("beforeend", `<li>${bullet}</li>`);
    });
  }

  if (detailTechSection && detailTech) {
    detailTech.innerHTML = "";
    const techItems = project.tech || [];
    if (techItems.length === 0) {
      detailTechSection.style.display = "none";
    } else {
      detailTechSection.style.display = "block";
      techItems.forEach(function (tech) {
        detailTech.insertAdjacentHTML("beforeend", `<li class="detail-tag">${tech}</li>`);
      });
    }
  }

  if (detailGallery) {
    detailGallery.innerHTML = "";
    const galleryItems = [project.image].concat(project.gallery || []).filter(Boolean);
    galleryItems.forEach(function (imgSrc) {
      detailGallery.insertAdjacentHTML(
        "beforeend",
        `<figure class="detail-gallery-item"><img src="${imgSrc}" alt="${project.title || "Project"}" loading="lazy"></figure>`
      );
    });
  }
}

const showDetailPage = function (project) {
  populateDetail(project);
  activatePage("portfolio detail");
  window.location.hash = project.id;
}

const handleHashRoute = function () {
  const hash = window.location.hash.slice(1);
  if (!hash || !projects.length) return;
  const project = projects.find(function (item) { return item.id === hash; });
  if (project) showDetailPage(project);
}

const initPortfolio = function () {
  const categories = Array.from(new Set(projects.map(function (project) {
    return project.category;
  }))).filter(Boolean);

  renderFilters(categories);
  renderProjects(projects);
  setActiveFilter("all", "All");
}

const loadPortfolioData = function () {
  if (!projectList) {
    return;
  }

  fetch("./assets/data/portfolio_projects.json")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Failed to load portfolio data");
      }
      return response.json();
    })
    .then(function (data) {
      projects = data.projects || [];
      initPortfolio();
      handleHashRoute();
    })
    .catch(function () {
      projectList.innerHTML = "<li class=\"project-item active\"><div class=\"portfolio-empty\">Portfolio data is unavailable. Please refresh the page after uploading assets/data/portfolio_projects.json.</div></li>";
    });
}

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

if (filterList) {
  filterList.addEventListener("click", function (event) {
    const button = event.target.closest("[data-filter-btn]");
    if (!button) {
      return;
    }
    const value = button.dataset.filterValue || "all";
    const label = button.textContent.trim();
    setActiveFilter(value, label);
  });
}

if (selectList) {
  selectList.addEventListener("click", function (event) {
    const button = event.target.closest("[data-select-item]");
    if (!button) {
      return;
    }
    const value = button.dataset.filterValue || "all";
    const label = button.textContent.trim();
    setActiveFilter(value, label);
  });
}

if (projectList) {
  projectList.addEventListener("click", function (event) {
    const link = event.target.closest("[data-project-link]");
    if (!link) {
      return;
    }
    event.preventDefault();
    const projectId = link.dataset.projectId;
    const project = projects.find(function (item) {
      return item.id === projectId;
    });
    if (project) {
      showDetailPage(project);
    }
  });
}

if (detailBackBtn) {
  detailBackBtn.addEventListener("click", function () {
    window.location.hash = "";
    activatePage("portfolio");
  });
}

window.addEventListener("hashchange", handleHashRoute);


// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
if (form && formInputs.length && formBtn) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }
}


// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

const activatePage = function (pageName) {
  for (let i = 0; i < pages.length; i++) {
    if (pageName === pages[i].dataset.page) {
      pages[i].classList.add("active");
    } else {
      pages[i].classList.remove("active");
    }
  }

  for (let i = 0; i < navigationLinks.length; i++) {
    if (navigationLinks[i].innerHTML.toLowerCase() === pageName) {
      navigationLinks[i].classList.add("active");
    } else {
      navigationLinks[i].classList.remove("active");
    }
  }

  window.scrollTo(0, 0);
}

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    activatePage(this.innerHTML.toLowerCase());
  });
}

loadPortfolioData();