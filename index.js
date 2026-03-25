$(document).ready(function () {
  App.MainGnb.init();
});

//------------------------------------------------------
// MainGnb
//------------------------------------------------------

App.MainGnb = (function () {
  var self;
  return {
    init: function () {
      self = this;

      $('.gnb-bg').css({ height: 'auto' });

      if ($('.sub-mn-box .depth_02 > li').find('a').hasClass('active')) {
        $('.sub-mn-box .depth_02 > li a.active')
          .parents('li')
          .addClass('active');
      }

      $('.depth_01 > li > a').on('mouseenter focusin', self.onMouseOver);
      $('.sub-mn-box .depth_02 > li:last-of-type > a').on(
        'focusout',
        self.onMouseLeave,
      );
      $('.header-box').on('mouseleave', self.onMouseLeave);
      $('.sub-mn03 > li > a').on('click', self.onClickDepth);

      $('.depth_01 li, .m-gnb li, .path-depth li').each(function () {
        var $list = $(this);
        if ($list.children('a').hasClass('menu-hide')) {
          $list.addClass('menu-hide');
          $(this).parent().append($list);
        }
      });

      // 2depth 메뉴 width 및 간격 조정
      function depth02Set() {
        var boxWidth = 1140; // 전체 가로 폭 확대
        var menuGap = 20; // 메뉴 간 간격 추가

        var subMenuLeng = $('.sub-mn-box').length;
        // 간격을 제외한 순수 메뉴 너비 계산
        var subMenuWidth = (boxWidth - (subMenuLeng - 1) * menuGap) / subMenuLeng;

        $('.sub-mn-box').outerWidth(subMenuWidth);

        // 2depth 메뉴 위치값 조정
        var headerWidth = $('header').width();
        var boxfirst = (headerWidth - boxWidth) / 2;

        $('.depth_01 > li').each(function (idx) {
          // 시작점 + (너비 + 간격) * 인덱스 로 위치 계산
          var leftPos = boxfirst + (subMenuWidth + menuGap) * idx;

          $(this).find('.sub-mn-box').css({
            left: leftPos,
          });
        });
      }

      $(window).on('load resize', depth02Set);
    },
    onMouseOver: function () {
      isHoverGnb = true;
      var subMnBox = $(this).next('.sub-mn-box');
      var subMnHeight = subMnBox.outerHeight();

      var $allSub = $('.sub-mn-box');
      $allSub.stop(true, true).delay(50).show();
      var maxHeight = 0;
      $allSub.each(function () {
        maxHeight = Math.max(maxHeight, $(this).outerHeight());
      });
      $('.sub-mn-box').css({ height: maxHeight + 'px' });
      $('.gnb-bg').height(maxHeight).stop(true, true).delay(100).show();

      $('.depth_01 > li').removeClass('on');
      $(this).parent('li').addClass('on');

      if (subMnBox.find('.depth_02 > li').length > 0) {
        $('body').addClass('gnb-open');
        $('.gnb-bg').stop(true, true).delay(50).show();
      } else {
        $('body').removeClass('gnb-open');
      }
      $('body').removeClass('search-open');
    },
    onMouseLeave: function () {
      isHoverGnb = false;
      setTimeout(function () {
        if (!isHoverGnb) {
          $('body').removeClass('gnb-open');
          $('.gnb-bg').css({ height: 'auto' });
          $('.depth_01 > li').removeClass('on');
        }
      }, 100);
    },
  };
})();

$(document).ready(function () {
  if ($(document).has('.slideMenu').length > 0) {
    App.MobileMenu.init({
      mGnbWrap: '.slideMenu',
      mGnbBox: '.m-gnb',
      btnOpen: '.btn-m-menu',
      btnClose: '.btn-menu-close',
      depthClass: '.dep',
      direction: 'right',
      dep02slide: 'N',
    });
  }
});

//------------------------------------------------------
// 모바일메뉴
//------------------------------------------------------
App.MobileMenu = (function () {
  var self, obj;
  var $mBtnOpen, $mBtnClose;
  return {
    init: function (obj) {
      self = this;
      self.obj = obj;

      self.mGnbSet(obj); // 모바일메뉴 기본 setting

      $mBtnOpen = $(obj.btnOpen);
      $mBtnClose = $(obj.btnClose);

      $mBtnOpen.click(function (e) {
        // 모바일메뉴 열기 버튼 클릭 시
        e.preventDefault();
        self.slideMenuOpen(obj); // 모바일메뉴 열기
        $('body').removeClass('search-open');
      });

      $mBtnClose.click(function (e) {
        // 모바일메뉴 닫기 버튼 클릭 시
        e.preventDefault();
        self.slideMenuClose(obj); // 모바일메뉴 닫기
      });

      // [추가] 메뉴 외부 클릭 시 닫기 (.slide-close 클래스 클릭 시 닫기)
      $('.m-menu-close').click(function (e) {
        e.preventDefault();

        self.slideMenuClose(obj); // 모바일메뉴 닫기
      });

      // 창 크기 변경 시 메뉴 닫기
      $(window).resize(function () {
        if ($(window).width() > 1200) {
          self.slideMenuClose(obj); // 1024px 이상에서 모바일메뉴 닫기
        }
        if (!$('.search-box').hasClass('open')) {
          if ($(window).width() > 1200) {
            self.slideMenuClose(obj);
          }
        }
      });

      self.mGnbDepthToggle(obj); // 하위뎁스별 슬라이드 toggle
    },

    slideMenuOpen: function (obj) {
      // 모바일메뉴 열기
      $('body').addClass('over-hidden');
      $('body').addClass('mo-gnb-open');
    },

    slideMenuClose: function (obj) {
      // 모바일메뉴 닫기
      $('body').removeClass('over-hidden');

      setTimeout(function () {
        $('body').removeClass('mo-gnb-open');
      });

      var scrollTop = $(window).scrollTop();
    },

    mGnbSet: function (obj) {
      // 모바일메뉴 기본 setting
      /*
			if ($('.main-page').length) {
				$(obj.mGnbBox).find('.dep1 > li:first-of-type > a').addClass('active');
				$(obj.mGnbBox).find('a.active').next('ul').show();
			}
			*/

      // 현재 페이지에 해당하는 메뉴 항상 열기
      $(obj.mGnbBox).find('a.active').addClass('selected');
      $(obj.mGnbBox).find('a.active').next('ul').show();
      $(obj.mGnbBox).find('a.active').parent('li').addClass('open');

      $(obj.mGnbBox)
        .find('a')
        .each(function () {
          if ($(this).hasClass('active')) {
            $(this).parent('li').addClass('active');
          }
        });

      // 하위뎁스메뉴 있을 경우 li에 클래스 부여
      var hasDep = $(obj.mGnbBox).find('ul').parent('li');
      hasDep.addClass('has-dep');
    },

    mGnbDepthToggle: function (obj) {
      // 하위뎁스별 슬라이드 toggle
      $(obj.mGnbBox)
        .find('a')
        .click(function (e) {
          var $this = $(this);
          var $nextDep = $this.next('ul'); // submenu
          var $parentLi = $this.parent('li');
          var $siblings = $parentLi.siblings('li');

          if ($nextDep.length > 0) {
            e.preventDefault();

            var isOpen = $this.hasClass('selected');

            $siblings.removeClass('open').find('ul').slideUp(300);
            $siblings.find('a').removeClass('selected');

            if (isOpen) {
              $this.removeClass('selected');
              $parentLi.removeClass('open');
              $nextDep.slideUp(300);
            } else {
              $this.addClass('selected');
              $parentLi.addClass('open');
              $nextDep.slideDown(300);
            }
          }
        });
    },
  };
})();

// Click Search
$(document).on('click', '.ultil .js-search a, .search-close', function (e) {
  e.preventDefault();
  $('body').removeClass('gnb-open mo-gnb-open over-hidden');

  const isOpen = $('body').hasClass('search-open');
  if (isOpen) {
    $('body').removeClass('search-open');
  } else {
    $('body').addClass('search-open');
  }
});

$(function () {
  const $header = $('header');
  let headerTop = $header.offset().top;

  $(window).on('scroll', function () {
    if ($(window).scrollTop() > headerTop) {
      $header.addClass('fixed');
    } else {
      $header.removeClass('fixed');
    }
  });

  $('.notification-close').on('click', function (e) {
    e.preventDefault();

    $('.notification-wrap').slideUp(300, function () {
      headerTop = $header.offset().top;
    });
  });
});
