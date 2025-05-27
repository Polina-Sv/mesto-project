import './pages/index.css';
import enableValidation from "./components/validate.js";
import { loadProfileData, initProfileEditing, initAvatarEditing } from './components/profile.js';
import { loadAndRenderCards, initCardAdding } from './components/cards.js';

function initApp() {
  loadProfileData()
    .then(userData => {
      loadAndRenderCards(userData._id);
      initProfileEditing();
      initCardAdding(userData._id);
      initAvatarEditing();
    })
    .catch(err => {
      console.error('Ошибка инициализации:', err);
    });
}

document.addEventListener('DOMContentLoaded', initApp);

enableValidation();