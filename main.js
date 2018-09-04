new Vue({
    el: '#app',
    data: {
        list: []
    },
    watch: {
        list: function () {
            // 更新後のul要素の高さを取得できない…
            console.log('通常:', this.$refs.list.offsetHeight)
            // nextTickを使えばできる！
            this.$nextTick(function () {
                console.log('nextTick:', this.$refs.list.offsetHeight)
            })
        }
    }
})