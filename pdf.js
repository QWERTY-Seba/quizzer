pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";


const CMAP_URL = "../../node_modules/pdfjs-dist/cmaps/";
const CMAP_PACKED = true;

const DEFAULT_URL = "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf";
const PAGE_TO_VIEW = 1;
const SCALE = 1.0;

const ENABLE_XFA = true;

const container = document.getElementById("pageContainer");

const eventBus = new pdfjsViewer.EventBus();

// Loading document.
var fileInput = document.getElementById('file-input');

            // Listen for file selection
  fileInput.addEventListener('change', function(event) {
    // Handle the selected file
    var archivo = event.target.files[0];

    // Check if a file is selected
    if (archivo) {
      
      var reader = new FileReader();
      reader.onload = function() {
        
        var arrayBuffer = reader.result;
        var uint8Array = new Uint8Array(arrayBuffer);
				nols(uint8Array)
        

        
      };
      reader.readAsArrayBuffer(archivo);
    }
  });

  async function nols(ewqeqw){
  		const loadingTask = pdfjsLib.getDocument({data: ewqeqw});
				
        const pdfDocument = await loadingTask.promise;
        // Document loaded, retrieving the page.
        const pdfPage = await pdfDocument.getPage(PAGE_TO_VIEW);

        // Creating the page view with default parameters.
        const pdfPageView = new pdfjsViewer.PDFPageView({
          container,
          id: PAGE_TO_VIEW,
          scale: SCALE,
          defaultViewport: pdfPage.getViewport({ scale: SCALE }),
          eventBus,
        });
        // Associate the actual page with the view, and draw it.
        pdfPageView.setPdfPage(pdfPage);
        pdfPageView.draw();
        
        }
