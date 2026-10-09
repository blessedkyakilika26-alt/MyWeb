const body = document.body;
const yearElement = document.getElementById('year');
const themeToggle = document.getElementById('theme-toggle');
const galleryImage = document.getElementById('gallery-image');
const galleryCaption = document.getElementById('gallery-caption');
const prevButton = document.getElementById('prev-photo');
const nextButton = document.getElementById('next-photo');
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const formPreview = document.getElementById('form-preview');
const faqButtons = document.querySelectorAll('.faq-toggle');

const galleryItems = [
  {
    src: 'images/image 1.jpeg',
    alt: 'Campus environment where I study',
    caption: 'My university campus environment during a busy study week.'
  },
  {
    src: 'images/image 2.jpeg',
    alt: 'Computer workspace ready for coding',
    caption: 'My programming workspace setup with tools for web development.'
  },
  {
    src: 'images/image 3.jpeg',
    alt: 'Students learning technology together',
    caption: 'An engaging technology study session with classmates.'
  }
];

let galleryIndex = 0;

function updateYear() {
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

function applySavedTheme() {
  const savedTheme = localStorage.getItem('website-theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
  }

  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', body.classList.contains('dark-theme') ? 'true' : 'false');
  }
}

function toggleTheme() {
  body.classList.toggle('dark-theme');
  const isDark = body.classList.contains('dark-theme');
  localStorage.setItem('website-theme', isDark ? 'dark' : 'light');

  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.textContent = isDark ? 'Light mode' : 'Dark mode';
  }
}

function renderGallery(index) {
  const item = galleryItems[index];
  if (!item || !galleryImage || !galleryCaption) {
    return;
  }

  galleryImage.src = item.src;
  galleryImage.alt = item.alt;
  galleryCaption.textContent = item.caption;
}

function showGalleryPhoto(step) {
  galleryIndex += step;

  if (galleryIndex < 0) {
    galleryIndex = galleryItems.length - 1;
  }

  if (galleryIndex >= galleryItems.length) {
    galleryIndex = 0;
  }

  renderGallery(galleryIndex);
}

function setFieldError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(fieldId + '-error');

  if (!field || !error) {
    return;
  }

  field.setAttribute('aria-invalid', message ? 'true' : 'false');
  error.textContent = message || '';
  field.classList.toggle('input-error', Boolean(message));
}

function validateContactForm(event) {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  let valid = true;

  if (name.length < 2) {
    setFieldError('name', 'Please enter a valid name with at least 2 characters.');
    valid = false;
  } else {
    setFieldError('name', '');
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    setFieldError('email', 'Please enter a valid email address.');
    valid = false;
  } else {
    setFieldError('email', '');
  }

  if (message.length < 10) {
    setFieldError('message', 'Please enter a message of at least 10 characters.');
    valid = false;
  } else {
    setFieldError('message', '');
  }

  if (!valid) {
    formStatus.textContent = 'Please correct the highlighted fields and try again.';
    formStatus.className = 'status-error';
    formPreview.textContent = '';
    return;
  }

  const nameText = document.createTextNode(name);
  const emailText = document.createTextNode(email);
  const messageText = document.createTextNode(message);

  formStatus.textContent = 'Form validated successfully. Browser demonstration only — no message is sent.';
  formStatus.className = 'status-success';

  formPreview.textContent = 'Validated input summary: Name: ' + name + '; Email: ' + email + '; Message: ' + message + '.';

  form.reset();

  if (nameText && emailText && messageText) {
    // Keep the preview textual and safe by using textContent above.
  }
}

function setupFaq() {
  faqButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const isOpen = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!isOpen));

      const answer = button.nextElementSibling;
      if (answer) {
        answer.hidden = isOpen;
      }
    });
  });
}

function setupThemeToggle() {
  if (!themeToggle) return;

  themeToggle.addEventListener('click', toggleTheme);
}

function setupGalleryControls() {
  if (prevButton) {
    prevButton.addEventListener('click', () => showGalleryPhoto(-1));
  }

  if (nextButton) {
    nextButton.addEventListener('click', () => showGalleryPhoto(1));
  }
}

function initializePage() {
  updateYear();
  applySavedTheme();
  renderGallery(galleryIndex);
  setupFaq();
  setupThemeToggle();
  setupGalleryControls();

  if (form) {
    form.addEventListener('submit', validateContactForm);
  }
}

document.addEventListener('DOMContentLoaded', initializePage);
