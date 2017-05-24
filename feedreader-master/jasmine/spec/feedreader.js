/*
 * this file basically contains the test suites to check the conditions.
 *  we are using jasmine to test
 */

$(function () {
    /*
     * This is first suit which is about RSS Feeds.
     * We will check all the feeds in the variale allFeeds.
     */
    describe('RSS Feeds', function () {
        /*
         * First  condition to check  whether all the variable in the allFeeds  are  already defined
         */
        it('already defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /*
         * It has test suites to check that the url is defined  , not null and length is not zero
         */
        it('url defined and not blank', function () {
            var check = 0;
            do {
                expect(allFeeds[check].url).toBeDefined(); //condition to check that url is defined
                expect(allFeeds[check].url).not.toBeNull(); // condition to find that  the url is not null
                expect(allFeeds[check].url.length).not.toBe(0); //mainly checking the length of url  be not zero
                check++;
            }
            while (check < allFeeds.length);
        });
        /*
         * this is to check that the name is defined and it is not null
         */
        it('name is not null and is defined', function () {
            var check = 0; //initialize to zero
            do {
                expect(allFeeds[check].name).toBeDefined(); // condition to check if the name is defined
                expect(allFeeds[check].name).not.toBe(""); // condition to check if the name is not empty
                check++;
            }
            while (check < allFeeds.length);
        });
    });
    /* *this test suite is called "The menu".
     * this test suite is to check that menu is not hidden by default. */
    describe('The Menu', function () {

        it('not hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).not.toBe(false);
        });
        /*
         * this is to check that the menu icon is visible when clicked.
         * i have checked two test suits one is to display and another to hide.
         */
        it('menu comes when clicked', function () {

            var slidder = $('.menu-icon-link');

            slidder.click();
            expect($('body').hasClass('menu-hidden')).toBe(false); //to display the menu

            slidder.click();
            expect($('body').hasClass('menu-hidden')).toBe(true); // hide the menu
        });
    });

    /* This test suite  is called "Initial Entries"
     * this contains the test suite of when the function is called and what does it do
     * as loadFeed() is a asynchronous so i have used beforeEach() and done() function. */
    describe('Initial Entries', function () {

        beforeEach(function (done) {
            loadFeed(1, done);
        });

        it('Has minimum of one  Single Entry', function (done) {

            var noOfentries = $('.feed .entry').length; // we are storing the values in variable

            expect(noOfentries).not.toBeLessThan(1);

            done();


        });
    });

    /* This test  suite  is called "New Feed Selection" */
    describe('New Feed Selection', function () {

        var oldUrl;
        var newUrl;
        // in this we are getting the new content and storing it in  variablenewUrl
        beforeEach(function (done) {
            loadFeed(0, function () {
                oldUrl = $('.feed').html();
                loadFeed(1, function () {
                    newUrl = $('.feed').html();
                    done();
                });
            });

        });


        // in this we are mainly comparing that old url is not equal to the new url
        it('content change when new url is loaded', function () {

            expect(newUrl ).not.toEqual(oldUrl);

        });
    });


}());