
document.getElementById("contactForm").addEventListener("submit", async function(e) {
  e.preventDefault();  

  const submitBtn = document.getElementById("submitBtn");
  const btnText = submitBtn.querySelector(".btn-text");
  const loader = submitBtn.querySelector(".loader");
  const status = document.getElementById("formStatus");

  // UI: show loading
  loader.style.display = "inline-block";
  btnText.textContent = "Sending...";
  submitBtn.disabled = true;
  status.textContent = "";

  try {
    const formData = new FormData(this);

    const response = await fetch(this.action, {
      method: "POST",
      body: formData
    });

    if (response.ok) {
      status.style.color = "rgb(0, 200, 120)";
      status.textContent = "Message sent successfully!";
      this.reset();
    } else {
      throw new Error("Failed");
    }
  } catch (err) {
    status.style.color = "rgb(255, 90, 90)";
    status.textContent = "Message failed to send. Try again.";
  }

  // Reset button
  loader.style.display = "none";
  btnText.textContent = "Send message";
  submitBtn.disabled = false;
});

// Clear button
document.getElementById("clearBtn").addEventListener("click", () => {
  document.getElementById("contactForm").reset();
  document.getElementById("formStatus").textContent = "";
});


  const phrases = [
  "Build Something Legendary",
  "Create Premium Designs",
  "Bring Ideas To Life",
  "Make Digital Experiences Stand Out"
];

const el = document.querySelector(".typing-text");
let i = 0;

function typePhrase() {
  el.style.width = "0"; // reset width for typing effect
  el.textContent = phrases[i];

  // Restart animation
  el.style.animation = "none";
  void el.offsetWidth; // force reflow
  el.style.animation = "typing 3s steps(30) forwards, blink .7s infinite";

  i = (i + 1) % phrases.length; // loop
}

typePhrase();
setInterval(typePhrase, 4000); 

  // small helpers
    const $ = sel => document.querySelector(sel);

    // year
    document.getElementById('year').textContent = new Date().getFullYear();

    // mobile menu
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    menuBtn.addEventListener('click', () => {
      const open = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!open));
      mobileMenu.style.display = open ? 'none' : 'block';
    });

    // smooth anchors
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click', (e)=>{
        const href = a.getAttribute('href');
        if(href.length > 1){
          e.preventDefault();
          const el = document.querySelector(href);
          if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
        }
        if(window.innerWidth <= 640){ mobileMenu.style.display='none'; menuBtn.setAttribute('aria-expanded','false') }
      });
    });

    // typewriter (rotating phrases)
    (function(){
      const phrases = ['premium interfaces', 'fast & accessible sites', 'delightful animations', 'clean UX'];
      const el = document.getElementById('typed');
      let pi=0, ch=0, forward=true;
      function step(){
        const p = phrases[pi];
        if(forward){
          ch++; el.textContent = p.slice(0,ch);
          if(ch===p.length){ forward=false; setTimeout(step, 1000); return; }
        } else {
          ch--; el.textContent = p.slice(0,ch);
          if(ch===0){ forward=true; pi=(pi+1)%phrases.length; }
        }
        setTimeout(step, forward ? 60 : 28);
      }
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      if(!(mq && mq.matches)) step(); else el.textContent = phrases[0];
    })();

    // AJAX FormSubmit handler - stays on page
    (function(){
      const form = document.getElementById('contactForm');
      const status = document.getElementById('formStatus');
      const submitBtn = document.getElementById('submitBtn');
      const clearBtn = document.getElementById('clearBtn');

      clearBtn.addEventListener('click', ()=> form.reset());

      form.addEventListener('submit', async (e)=>{
        e.preventDefault();
        status.innerHTML = '';
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        const endpoint = form.getAttribute('action') || '';
        if(!endpoint || endpoint.includes('YOUR_EMAIL_HERE')){
          status.innerHTML = '<div class="error">Replace the form action with your FormSubmit endpoint (https://formsubmit.co/YOUR_EMAIL)</div>';
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send message';
          return;
        }

        try{
          const res = await fetch(endpoint, { method:'POST', body: new FormData(form), headers:{ 'Accept':'application/json' } });
          if(res.ok){
            status.innerHTML = '<div class="success">Thanks — your message was sent. I will reply soon.</div>';
            form.reset();
          } else {
            const txt = await res.text().catch(()=> '');
            console.error('FormSubmit non-ok', res.status, txt);
            status.innerHTML = '<div class="error">Could not send — try emailing directly.</div>';
          }
        }catch(err){
          console.error(err);
          status.innerHTML = '<div class="error">Network error. Check your connection.</div>';
        } finally {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send message';
        }
      });
    })();

    // fallback for project links with '#'
    document.querySelectorAll('.proj-links a').forEach(a=>{
      if(a.getAttribute('href') === '#'){
        a.addEventListener('click', (e)=> { e.preventDefault(); alert('Replace with your project link (Live demo or GitHub).') });
      }
    });

