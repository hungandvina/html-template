$(document).ready(function () {
  // Use IntersectionObserver to trigger the jQuery counter-up only when scrolled into view
  var counterObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var $this = $(entry.target);
          
          // Only animate once
          counterObserver.unobserve(entry.target);

          var targetText = $this.text().replace(/,/g, "");
          var targetNum = parseInt(targetText, 10);

          if (isNaN(targetNum)) return;

          // Start from 0 before animating so the user sees the counting
          $this.text("0");

          $this.prop("Counter", 0).animate(
            {
              Counter: targetNum,
            },
            {
              duration: 1500,
              easing: "swing",
              step: function (now) {
                // Formatting with commas smoothly
                $this.text(Math.ceil(now).toLocaleString());
              },
              complete: function () {
                // Ensure the final number is perfectly exact
                $this.text(targetNum.toLocaleString());
              },
            }
          );
        }
      });
    },
    { threshold: 0.2 } // Trigger when 20% of the element is visible
  );

  // Attach observer to all number elements
  $(".status-card .num, .summary-row .val-item .num").each(function () {
    counterObserver.observe(this);
  });
});
