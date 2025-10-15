// Basic interactivity + project card injection + form handling
document.getElementById('year').textContent = new Date().getFullYear();

// sample projects array — replace with your project details/screenshots
const projects = [
  {title:'Blockchain Voting UI', desc:'Simple dApp UI to cast votes (mock)', link:'#'},
  {title:'Token Swap Demo', desc:'Frontend demo showing token swap flow', link:'#'},
  {title:'Portfolio Site', desc:'This site — built and deployed on GitHub Pages', link:'#'}
];

const grid = document.getElementById('project-grid');
projects.forEach(p=>{
  const card = document.createElement('div');
  card.className='project-card';
  card.setAttribute('tabindex','0');
  card.setAttribute('role','article');
  card.innerHTML = `<h3>${p.title}</h3><p>${p.desc}</p><a href="${p.link}" target="_blank" aria-label="Open ${p.title}">View</a>`;
  grid.appendChild(card);
});

// keyboard: open first link in a card with Enter
grid.addEventListener('keydown', (e)=>{
  const target = e.target;
  if(target && target.classList && target.classList.contains('project-card') && (e.key === 'Enter' || e.key === ' ')){
    const link = target.querySelector('a');
    if(link){ link.click(); }
  }
});

// form handling
const form = document.getElementById('contact-form');
const nameEl = document.getElementById('name');
const emailEl = document.getElementById('email');
const messageEl = document.getElementById('message');
const msgEl = document.getElementById('form-msg');

// make form-msg an aria-live region for screen readers
if(msgEl){
  msgEl.setAttribute('role','status');
  msgEl.setAttribute('aria-live','polite');
}

// live character counter for message
const MESSAGE_MAX = 500;
if(messageEl){
  const counter = document.createElement('div');
  counter.id = 'message-count';
  counter.style.fontSize = '12px';
  counter.style.marginTop = '4px';
  counter.style.color = 'inherit';
  messageEl.insertAdjacentElement('afterend', counter);

  const updateCount = ()=>{
    const len = messageEl.value.length;
    const remaining = MESSAGE_MAX - len;
    counter.textContent = `${remaining} characters left`;
    if(len > MESSAGE_MAX){
      messageEl.value = messageEl.value.slice(0, MESSAGE_MAX);
      counter.textContent = '0 characters left';
    }
  };
  messageEl.addEventListener('input', updateCount);
  updateCount();
}

form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const name = nameEl.value.trim();
  const email = emailEl.value.trim();
  const message = messageEl.value.trim();

  // basic validation
  const emailOk = /.+@.+\..+/.test(email);
  if(!name || !email || !message){
    showMsg('Please fill all fields');
    return;
  }
  if(!emailOk){
    showMsg('Please enter a valid email');
    return;
  }

  // For now just show a success message and clear
  showMsg('Thanks! Message received — I will reply soon.');
  form.reset();
  const countEl = document.getElementById('message-count');
  if(countEl){ countEl.textContent = `${MESSAGE_MAX} characters left`; }
});

function showMsg(txt){
  if(!msgEl) return;
  msgEl.textContent = txt;
  clearTimeout(showMsg._t);
  showMsg._t = setTimeout(()=>{ msgEl.textContent=''; }, 4000);
}
