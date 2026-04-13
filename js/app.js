const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const fadeItems = document.querySelectorAll(".fade-up");
const currentYear = document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

menuBtn?.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    projectCards.forEach((card) => {
      const categories = card.dataset.category || "";
      const shouldShow = filter === "all" || categories.includes(filter);
      card.style.display = shouldShow ? "block" : "none";
    });
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  },
);

fadeItems.forEach((item) => observer.observe(item));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    navLinks?.classList.remove("open");
  }
});

const projectThumbs = document.querySelectorAll(".project-thumb");
const imageModal = document.getElementById("imageModal");
const imageModalImg = document.getElementById("imageModalImg");
const imageModalTitle = document.getElementById("imageModalTitle");
const imageModalClose = document.getElementById("imageModalClose");
const imageModalBackdrop = document.getElementById("imageModalBackdrop");

const openImageModal = (src, title, altText = "") => {
  imageModalImg.src = src;
  imageModalImg.alt = altText || title;
  imageModalTitle.textContent = title;
  imageModal.classList.add("is-open");
  imageModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};

const closeImageModal = () => {
  imageModal.classList.remove("is-open");
  imageModal.setAttribute("aria-hidden", "true");
  imageModalImg.src = "";
  imageModalImg.alt = "";
  imageModalTitle.textContent = "";
  document.body.style.overflow = "";
};

projectThumbs.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    const fullImage = thumb.dataset.full;
    const title = thumb.dataset.title || "Vista previa del proyecto";
    const image = thumb.querySelector(".project-image");
    const altText = image?.alt || title;

    openImageModal(fullImage, title, altText);
  });
});

imageModalClose?.addEventListener("click", closeImageModal);
imageModalBackdrop?.addEventListener("click", closeImageModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && imageModal.classList.contains("is-open")) {
    closeImageModal();
  }
});
