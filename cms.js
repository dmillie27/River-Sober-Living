fetch('/_data/homepage.json')
  .then(res => res.json())
  .then(data => {

    // HERO
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) heroTitle.innerHTML = 'Begin Your <em>New Chapter</em>';
    const heroSub = document.querySelector('.hero-subtitle');
    if (heroSub) heroSub.textContent = data.hero.subheading;

    // WHO WE ARE
    const aboutHeading = document.querySelector('#about .section-title');
    if (aboutHeading) aboutHeading.textContent = data.who_we_are.heading;
    const aboutBody = document.querySelector('#about .about-text');
    if (aboutBody) aboutBody.innerHTML = `<p>${data.who_we_are.body}</p>`;
    const stats = document.querySelectorAll('.stat-number');
    if (stats[0]) stats[0].textContent = data.who_we_are.year_founded;
    if (stats[1]) stats[1].textContent = data.who_we_are.num_homes;
    if (stats[2]) stats[2].textContent = data.who_we_are.days_support;

    // LEAP
    const leapCards = document.querySelectorAll('.leap-card:not(.leap-card-extra)');
    data.leap.pillars.forEach((pillar, i) => {
      if (leapCards[i]) {
        leapCards[i].querySelector('.leap-letter').textContent = pillar.letter;
        leapCards[i].querySelector('h3').textContent = pillar.title;
        leapCards[i].querySelector('p').textContent = pillar.description;
      }
    });

    // HOUSE RULES
    const reqList = document.querySelector('.structure-list:first-of-type');
    if (reqList) {
      reqList.innerHTML = data.house_rules.requirements
        .map(r => `<li>${r}</li>`).join('');
    }
    const expList = document.querySelectorAll('.structure-list')[1];
    if (expList) {
      expList.innerHTML = data.house_rules.expectations
        .map(e => `<li>${e}</li>`).join('');
    }
    const ztText = document.querySelector('.zero-tolerance p');
    if (ztText) ztText.textContent = data.house_rules.zero_tolerance;

    // HOUSES
    const houseCards = document.querySelectorAll('.house-card');
    data.houses.forEach((house, i) => {
      if (houseCards[i]) {
        const h3 = houseCards[i].querySelector('h3');
        const location = houseCards[i].querySelector('.house-location');
        const houseDetails = houseCards[i].querySelectorAll('.house-detail');
    
        if (h3) h3.textContent = house.name;
        if (location) location.textContent = house.location;
    
        if (houseDetails[0]) {
          const icon = houseDetails[0].querySelector('.house-detail-icon');
          houseDetails[0].innerHTML = '';
          if (icon) houseDetails[0].appendChild(icon);
          houseDetails[0].appendChild(document.createTextNode(house.description));
        }
        if (houseDetails[1]) {
          const icon = houseDetails[1].querySelector('.house-detail-icon');
          houseDetails[1].innerHTML = '';
          if (icon) houseDetails[1].appendChild(icon);
          houseDetails[1].appendChild(document.createTextNode(house.details));
        }
      }
    });

    // FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    data.faq.forEach((item, i) => {
      if (faqItems[i]) {
        faqItems[i].querySelector('h4').textContent = item.question;
        faqItems[i].querySelector('.faq-answer p').textContent = item.answer;
      }
    });

    // CONTACT
    const phoneLinks = document.querySelectorAll('a[href^="tel"]');
    phoneLinks.forEach(el => el.textContent = data.contact.phone);
    const emailLinks = document.querySelectorAll('a[href^="mailto"]');
    emailLinks.forEach(el => el.textContent = data.contact.email);

  })
  .catch(err => console.log('CMS data not loaded:', err));
