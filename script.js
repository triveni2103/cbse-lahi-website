// ── Hamburger menu ──
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
 
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });
 
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
 
  // ── Scroll reveal ──
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 60);
      }
    });
  }, { threshold: 0.08 });
  reveals.forEach(el => observer.observe(el));
 
  // ── Form submission → Google Forms ──
  function submitForm() {
    const name        = document.getElementById('principal-name').value.trim();
    const designation = document.getElementById('designation').value.trim();
    const school      = document.getElementById('school-name').value.trim();
    const city        = document.getElementById('city').value.trim();
    const state       = document.getElementById('state').value.trim();
    const mobile      = document.getElementById('mobile').value.trim();
    const email       = document.getElementById('email').value.trim();
    const interest    = document.getElementById('interest').value.trim();
    const message     = document.getElementById('message').value.trim();
    const visitRadio  = document.querySelector('input[name="visit-interest"]:checked');
    const visit       = visitRadio ? visitRadio.value : '';
 
    const visitMap = {
      'yes':   "Yes, I'm interested",
      'maybe': 'Possibly — tell me more',
      'no':    'Not this time'
    };
    const visitValue = visitMap[visit] || '';
 
    if (!name || !school || !mobile || !email || !city) {
      alert('Please fill in all required fields (Name, School, City, Mobile, Email).');
      return;
    }
 
    const FORM_ACTION = 'https://docs.google.com/forms/u/0/d/1IJOLYOuNVDQh9KapRbA--t02vHXOp6-6NmfW8ajwb7w/formResponse';
 
    const data = {
      'entry.1636702703': name,
      'entry.627595311':  designation,
      'entry.1668516713': school,
      'entry.1389543012': city,
      'entry.260021911':  state,
      'entry.981096840':  mobile,
      'entry.330010300':  email,
      'entry.1586340247': interest,
      'entry.1715431669': message,
      'entry.423992715':  visitValue,
      'fvv': '1',
      'fbzx': '5975148213623573533'
    };
 
    let iframe = document.getElementById('gform-iframe');
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.id = 'gform-iframe';
      iframe.name = 'gform-iframe';
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
    }
 
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = FORM_ACTION;
    form.target = 'gform-iframe';
    form.style.display = 'none';
 
    Object.entries(data).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });
 
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
 
    document.getElementById('form-container').style.display = 'none';
    document.getElementById('success-msg').style.display = 'block';
  }