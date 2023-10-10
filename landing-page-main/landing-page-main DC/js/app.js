// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  // Build Navigation
  const navbar = document.getElementById("navbar__list");
  const sections = document.querySelectorAll("section");
  
  for (let i = 0; i < sections.length; i++) {
    const link = document.createElement('a');
    const linkName = `#section${[i+1]}`;
    link.setAttribute('href',linkName);
    
    const item = document.createElement('li');
    const name = document.querySelectorAll('section')[i].dataset.nav;
    const itemName = document.createTextNode(name);
    
    item.appendChild(itemName);
    item.classList.add('menu__link');
    
    link.appendChild(item);
    
    navbar.appendChild(link);
  };
  
  // Add class 'active' to section when near top of viewport
  function makeActive() { 
      sections.forEach(section => {
          if (isInViewport(section)){
              section.classList.add("active");
              navLinks.forEach(navLink => {
                  if(navLink.getAttribute('href') == section.getAttribute('id')){
                      navLink.classList.add("active")
                      console.log(true);
                  }
                  else{
                      navLink.classList.remove("active")
                      console.log(false)
                  }
              })
          }
          else{
              section.classList.remove("active");
          }
      })
  };
  
  // Create an Intersection Observer instance
  const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          const section = entry.target; // Use entry.target directly
          const navLink = document.querySelector(`a[href="#${section.id}"]`);
  
          if (entry.isIntersecting) {
              section.classList.add('active');
              navLink.classList.add('active');
          } else {
              section.classList.remove('active');
              navLink.classList.remove('active');
          }
      });
  }, { threshold: 0.5 }); // Adjust the threshold as needed
  
  // Observe each section
  sections.forEach(section => {
      observer.observe(section);
  });
  
  //call function when user scrolls
  document.addEventListener("scroll", makeActive);
  
  //HIGHLIGHT NAVBAR LINK WHEN SECTION IS ACTIVE
  
  //Scroll to section
  navItems.forEach(navItem => {
      navItem.addEventListener("click", function(event) {
          event.preventDefault();
          const targetSectionId = navItem.getAttribute("href");
          document.querySelector(targetSectionId).scrollIntoView({ behavior: "smooth" });
          makeActive();
      });
  });