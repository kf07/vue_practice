
new Vue({
    el: '#app',
    data: {
        width: 800
    },
    computed: {
        halfWidth: {
            get: function(){
                return this.width / 2
            },
            set: function(val){
                this.width = val * 2
            }
        }
    }
});

