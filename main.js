
new Vue({
    el: '#app',
    data: {
        width: 800
    },
    computed: {
        halfWidth: function(){
            return this.width / 2
        }
    }
});

