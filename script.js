function openPopup(id) {
    document.getElementById(id).style.display = 'flex';
  }

  function closePopup(id) {
    document.getElementById(id).style.display = 'none';
  }
  
  const faqButtons = document.querySelectorAll('.faq-question');

  faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const isOpen = btn.classList.contains('active');

      document.querySelectorAll('.faq-answer').forEach(a => a.style.display = 'none');
      document.querySelectorAll('.faq-question').forEach(q => q.classList.remove('active'));

      if (!isOpen) {
        answer.style.display = 'block';
        btn.classList.add('active');
      }
    });
  });


