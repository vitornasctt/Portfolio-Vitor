'use strict';

const menu = document.getElementById('navMenu');
const menuToggle = document.getElementById('navToggle');
const mobileLayout = window.matchMedia('(max-width: 600px)');

function closeMenu(returnFocus = false) {
  menu.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menu');
  if (returnFocus) menuToggle.focus();
}

menuToggle.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
document.addEventListener('click', event => {
  if (!event.target.closest('.navbar')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.classList.contains('is-open')) closeMenu(true);
});
document.addEventListener('focusin', event => {
  if (!event.target.closest('.navbar')) closeMenu();
});
mobileLayout.addEventListener('change', () => closeMenu());

const modal = document.getElementById('projectModal');
const modalImage = document.getElementById('projectModalImg');
let lastProjectTrigger = null;

document.querySelectorAll('[data-project-trigger]').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const project = trigger.closest('.project-card');
    const { title, category, screenshot, demo } = project.dataset;
    document.getElementById('projectModalTitle').textContent = title;
    document.getElementById('projectModalCategory').textContent = category;
    modalImage.src = screenshot;
    modalImage.alt = `Captura de tela do projeto ${title}`;
    document.getElementById('projectModalOpen').href = demo;
    lastProjectTrigger = trigger;
    modal.showModal();
    document.body.classList.add('modal-open');
    document.getElementById('projectModalClose').focus();
  });
});
document.getElementById('projectModalClose').addEventListener('click', () => modal.close());
modal.addEventListener('click', event => {
  if (event.target !== modal) return;
  const bounds = modal.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) modal.close();
});
modal.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  lastProjectTrigger?.focus();
});

const form = document.getElementById('contactForm');
const nameField = document.getElementById('fieldNome');
const emailField = document.getElementById('fieldEmail');
const messageField = document.getElementById('fieldMensagem');

[nameField, messageField].forEach(field => {
  field.addEventListener('input', () => field.setCustomValidity(''));
});
form.addEventListener('submit', event => {
  event.preventDefault();
  nameField.setCustomValidity(nameField.value.trim() ? '' : 'Informe seu nome.');
  messageField.setCustomValidity(messageField.value.trim() ? '' : 'Conte um pouco sobre o seu projeto.');
  if (!form.reportValidity()) return;
  const text = `Olá, Vitor! Meu nome é ${nameField.value.trim()} (${emailField.value.trim()}).\n\n${messageField.value.trim()}`;
  const url = new URL('https://wa.me/5528999297133');
  url.searchParams.set('text', text);
  window.open(url.href, '_blank', 'noopener,noreferrer');
});

document.getElementById('currentYear').textContent = new Date().getFullYear();
