const scroll = new SmoothScroll()
new Vue({
    el: '#app',
    methods: {
        scrollTop: function(){
            scroll.animateScroll(0)
        }
    }
});

