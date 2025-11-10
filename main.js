document.addEventListener('DOMContentLoaded', function () {
  var y = document.getElementById('y');
  if (y) y.textContent = new Date().getFullYear();
});
document.addEventListener('DOMContentLoaded', function () {
  var exp = document.querySelector('details.exp');
  var btn = document.getElementById('expBtn');
  if (exp && btn) {
    var setLabel = function () {
      btn.textContent = exp.open ? 'Ocultar experiencia' : 'Ver experiencia';
    };
    setLabel();
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      exp.open = !exp.open;
      setLabel();
    });
  }
});
document.addEventListener('DOMContentLoaded', function () {
  var downloadBtn = document.getElementById('downloadPdf');
  if (!downloadBtn || typeof html2pdf === 'undefined') return;

  downloadBtn.addEventListener('click', function () {
    var resume = document.querySelector('.wrap');
    if (!resume) return;

    var opt = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: 'Johan_Portocarrero_CV.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(resume).save();
  });
});
