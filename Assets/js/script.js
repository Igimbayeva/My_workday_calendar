
$(document).ready(function () {
  
  // Function to generate time blocks for 9AM to 5PM
  function generateTimeBlocks() {
    for (let i = 9; i <= 17; i++) {
      const timeblock = $(`#hour-${i}`);
      const currentHour = dayjs().hour();

      // Add past, present, or future class based on the current time
      if (i < currentHour) {
        timeblock.removeClass("present future").addClass("past");
      } else if (i === currentHour) {
        timeblock.removeClass("past future").addClass("present");
      } else {
        timeblock.removeClass("past present").addClass("future");
      }

      // Load saved events from localStorage
      const savedEvent = localStorage.getItem(`hour-${i}`);
      if (savedEvent) {
        timeblock.find(".description").val(savedEvent);
      }
    }
  }

  // Function to save events to localStorage
  $(".saveBtn").on("click", function () {
    var blockId = $(this).parent().attr("id");
    var eventText = $(this).siblings(".description").val();

    localStorage.setItem(blockId, eventText);
  });

  // Display current date in the header
  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY, HH:MM A"));

  // Generate time blocks
  generateTimeBlocks();

  // Update time block colors every minute
  setInterval(generateTimeBlocks, 60000);
});
