//------------------------------------------------------
// PDF Tabs + PDF Viewer
// Required library: pdfobject.min.js
//------------------------------------------------------

$(function () {
  const tabSpeed = 200;
  const $window = $(window);
  const $tabBox = $(".pdf-tabs .box");
  const $tabLabel = $tabBox.find("span");
  const $tabList = $tabBox.find("ul");
  const $tabLinks = $tabList.find("a");
  const $contents = $(".pdf-contents .content");

  $(".pdf-acc li").on("click", function (e) {
    e.preventDefault();
    $(this).toggleClass("active");
    $(".pdf-submenu").stop().slideUp(tabSpeed);
    $(".pdf-acc li.active .pdf-submenu").stop().slideDown(tabSpeed);
  });

  function getPdfOptions() {
    return {
      pdfOpenParams: {
        navpanes: 0,
        toolbar: 1,
        statusbar: 0,
        view: "FitV",
        pagemode: "thumbs",
        page: 1,
      },
      forcePDFJS: true,
      PDFJS_URL: "/_res/_common/js/pdf/web/viewer.html",
    };
  }

  function closeTabList() {
    $tabBox.removeClass("open");
    $tabList.stop().slideUp(tabSpeed);
  }

  function openTabList() {
    $tabBox.addClass("open");
    $tabList.stop().slideDown(tabSpeed);
  }

  function bindPdfSidebarClose($content) {
    const $iframe = $content.find(".pdf-view iframe");

    if (!$iframe.length) return;

    $iframe.one("load", function () {
      waitForPdfViewerInSidebar(this)
        .then(function (pdfSidebar) {
          pdfSidebar.close();
        })
        .catch(function (error) {
          console.error("Failed to load pdfSidebar:", error);
        });
    });
  }

  function initPdf($content) {
    const $viewer = $content.find(".pdf-view");

    if (!$viewer.length) return;

    const pdfUrl = $viewer.data("url");
    if (!pdfUrl) return;

    if ($viewer.data("pdfLoaded")) return;

    PDFObject.embed(pdfUrl, $viewer.get(0), getPdfOptions());
    $viewer.data("pdfLoaded", true);

    setTimeout(function () {
      bindPdfSidebarClose($content);
    }, 300);
  }

  function activateTab(targetId, tabText) {
    $tabLinks.parent().removeClass("active");
    $tabLinks
      .filter('[href="' + targetId + '"]')
      .parent()
      .addClass("active");

    $contents.hide().removeClass("active");
    $(targetId).show().addClass("active");

    $tabLabel.text(tabText);

    initPdf($(targetId));
    closeTabList();
  }

  $tabBox.on("click", function (e) {
    if ($(e.target).closest("ul").length) return;

    e.preventDefault();

    if ($tabBox.hasClass("open")) {
      closeTabList();
    } else {
      openTabList();
    }
  });

  $tabLinks.on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    const targetId = $(this).attr("href");
    const tabText = $.trim($(this).text());

    activateTab(targetId, tabText);
  });

  $(document).on("click", function (e) {
    if (!$(e.target).closest(".pdf-tabs .box").length) {
      closeTabList();
    }
  });

  $(document).on("click", ".toPage", function (e) {
    e.preventDefault();

    const pageNum = parseInt($(this).data("page"), 10);
    const iframe = $(".pdf-contents .content.active .pdf-view iframe").get(0);

    if (
      iframe &&
      iframe.contentWindow &&
      iframe.contentWindow.PDFViewerApplication &&
      iframe.contentWindow.PDFViewerApplication.pdfViewer
    ) {
      iframe.contentWindow.PDFViewerApplication.pdfViewer.currentPageNumber = pageNum;
      scrollToViewerArea();
    }
  });

  if ($tabLinks.length) {
    const $firstTab = $tabLinks.first();
    $contents.hide();
    $tabList.hide();
    activateTab($firstTab.attr("href"), $.trim($firstTab.text()));
  }

  function scrollToViewerArea() {
    const $viewerArea = $(".pdf-contents");
    const $header = $(".top-header-wrap");
    const headerHeight = $header.length ? $header.outerHeight() : 0;

    if (!$viewerArea.length) return;

    const viewerAreaTop = $viewerArea.offset().top;

    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: viewerAreaTop - headerHeight,
        },
        300,
      );
  }
});

function waitForPdfViewerInSidebar(iframe, timeout) {
  timeout = timeout || 5000;

  return new Promise(function (resolve, reject) {
    const start = Date.now();

    function checkPdfViewer() {
      try {
        const pdfViewerApp = iframe.contentWindow.PDFViewerApplication;

        if (pdfViewerApp && pdfViewerApp.pdfSidebar && pdfViewerApp.pdfSidebar.isInitialViewSet) {
          resolve(pdfViewerApp.pdfSidebar);
        } else if (Date.now() - start < timeout) {
          setTimeout(checkPdfViewer, 100);
        } else {
          reject(new Error("Timeout waiting for pdfSidebar to load"));
        }
      } catch (error) {
        reject(error);
      }
    }

    checkPdfViewer();
  });
}
