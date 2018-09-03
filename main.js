new Vue({
    el: '#app',
    data: {
        list: [],
        current: '',
        topics: [
            {value: 'vue', name: 'Vue.js'},
            {value: 'jQuery', name: 'jQuery'},
            {value: 'react',name: 'react'}
        ]
    },
    watch: {
        current: function (val) {
            //GitHubのAPIからトピックのリポジトリを検索
            axios.get('https://api.github.com/search/repositories', {
                params: {
                    q: 'topic:' + val
                }
            }).then(function (response) {
                this.list = response.data.items
            }.bind(this))
        }
    }
});


