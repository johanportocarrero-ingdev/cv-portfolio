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
  if (!downloadBtn) return;

  var defaultLabel = downloadBtn.textContent.trim() || 'Descargar PDF';
  var isGenerating = false;
  var html2pdfLoader = null;

  var ensureHtml2pdf = function () {
    if (typeof html2pdf !== 'undefined') {
      return Promise.resolve(html2pdf);
    }

    if (html2pdfLoader) {
      return html2pdfLoader;
    }

    html2pdfLoader = new Promise(function (resolve, reject) {
      var script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js';
      script.async = true;
      script.onload = function () {
        resolve(html2pdf);
      };
      script.onerror = function (event) {
        html2pdfLoader = null;
        reject(event);
      };
      document.head.appendChild(script);
    });

    return html2pdfLoader;
  };

  downloadBtn.addEventListener('click', function () {
    if (isGenerating) return;

    var resume = document.querySelector('.wrap');
    if (!resume) return;

    isGenerating = true;
    downloadBtn.disabled = true;
    downloadBtn.textContent = 'Generando...';

    ensureHtml2pdf()
      .then(function (html2pdfInstance) {
        var opt = {
          margin: [0.5, 0.5, 0.5, 0.5],
          filename: 'Johan_Portocarrero_CV.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        html2pdfInstance().set(opt).from(resume).save();
      })
      .catch(function () {
        alert('No se pudo generar el PDF. Intenta nuevamente en unos segundos.');
      })
      .finally(function () {
        isGenerating = false;
        downloadBtn.disabled = false;
        downloadBtn.textContent = defaultLabel;
      });
  });
});
