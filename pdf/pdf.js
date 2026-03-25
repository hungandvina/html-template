//------------------------------------------------------
// Function view for PDF page
// Required library pdfobject.min.js
//------------------------------------------------------
//목차
$(function () {
  $('.pdf-acc li').click(function () {
    $(this).toggleClass(' active ');
    //$(this).siblings().removeClass(' active ');
    $('.pdf-submenu').stop().slideUp();
    $('.active .pdf-submenu').stop().slideDown();
    return false;
  });
});

if ($('.pdf-view').length > 0) {
  //pdf 경로 지정
  $('.pdf-view').each(function () {
    const $this = $(this);
    const pdfLocation = $this.data('url');
    if (!pdfLocation) return; // Skip if no URL provided

    let options = {
      pdfOpenParams: {
        navpanes: 0,
        toolbar: 1,
        statusbar: 0,
        view: 'FitV',
        pagemode: 'thumbs',
        page: 1,
      },
      forcePDFJS: true,
      PDFJS_URL: '/_res/_common/js/pdf/web/viewer.html',
    };

    //생성
    PDFObject.embed(pdfLocation, this, options);
  });

  //페이지이동 이벤트 핸들러
  $('.toPage').click(function (e) {
    e.preventDefault();

    let pageNum = $(this).data('page');
    // Finds the associated iframe within the current section, or falls back to first
    let pdfIframe = $(this).closest('.pdf-acc').find('.pdf-view iframe')[0] || document.querySelector('.pdf-view iframe');
    
    if (pdfIframe) {
      pdfIframe.contentWindow.PDFViewerApplication.pdfViewer.currentPageNumber = parseInt(pageNum);
      scrollToViewerArea();
    }
  });
}

//페이지 로드, 사이드바, 뷰어가 로드 된 후에 사이드 바 닫음처리
document.addEventListener('DOMContentLoaded', function () {
  const iframes = document.querySelectorAll('.pdf-view iframe');

  if (iframes.length > 0) {
    iframes.forEach((iframe) => {
      iframe.addEventListener('load', function () {
        waitForPdfViewerInSidebar(iframe)
          .then((pdfSidebar) => {
            //사이드바 닫음
            pdfSidebar.close();
          })
          .catch((error) => {
            console.error('Failed to load pdfSidebar.pdfViewer:', error);
          });
      });
    });
  } else {
    // wait a moment in case they are injected slightly later
    setTimeout(() => {
      document.querySelectorAll('.pdf-view iframe').forEach((iframe) => {
        iframe.addEventListener('load', function () {
          waitForPdfViewerInSidebar(iframe)
            .then((pdfSidebar) => {
              pdfSidebar.close();
            })
            .catch((e) => {});
        });
      });
    }, 500);
  }
});

//sideBar 로드 프로미스
//PDFViewerApplication.initializedPromise 는 버전문제인지 프로미스 작동 안함, 생성해서 씀
function waitForPdfViewerInSidebar(iframe, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();

    function checkPdfViewer() {
      try {
        // pdf
        const pdfViewerApp = iframe.contentWindow.PDFViewerApplication;

        // pdf 가 생성되고, 사이드바가 생성되고, 뷰어까지 생성완료되면
        //PDFViewerApplication.pdfSidebar.pdfViewer 구조로 뷰어가 다 열리면 isInitialViewSet가 true 가 되는것으로 확인
        if (
          pdfViewerApp &&
          pdfViewerApp.pdfSidebar &&
          pdfViewerApp.pdfSidebar.isInitialViewSet
        ) {
          // Resolve the promise when pdfViewer in pdfSidebar is available
          resolve(pdfViewerApp.pdfSidebar);
        } else {
          // If not yet available, check if we should keep waiting or timeout
          if (Date.now() - start < timeout) {
            setTimeout(checkPdfViewer, 100); // Check again after 100ms
          } else {
            // Timeout exceeded
            reject(
              new Error('Timeout waiting for pdfSidebar.pdfViewer to load'),
            );
          }
        }
      } catch (error) {
        reject(error);
      }
    }

    // Start checking immediately
    checkPdfViewer();
  });
}

// 목차 클릭 시 뷰어 영역으로 스크롤
function scrollToViewerArea() {
  const viewerArea = document.querySelector('.pdf-content');
  const header = document.querySelector('.top-header-wrap');
  const headerHeight = header.offsetHeight;

  // 뷰어 영역의 상단 좌표를 계산
  const viewerAreaTop = viewerArea.getBoundingClientRect().top + window.scrollY;

  // 헤더의 바로 아래로 스크롤
  window.scrollTo({
    top: viewerAreaTop - headerHeight,
    behavior: 'smooth', // 부드러운 스크롤 효과 적용
  });
}
