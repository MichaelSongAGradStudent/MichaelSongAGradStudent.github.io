
var date1 = new Date("08/30/2021")
var date2 = new Date()
var Difference_In_Time = date2.getTime() - date1.getTime();
var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
function update_users_count() {
    $('#users4 i').animate({
        counter: Difference_In_Days * 300000000 / (58385725 * 1.5)
    }, {
        duration: 6000,
        easing: 'swing',
        step: function(now) {
            $(this).text(Math.ceil(now));
        },
        complete: update_users_count
    });
};

update_users_count();
