const app = new Vue({
    el:'#app',
    data: {
        name: 'キマイラ',
        text: 'Vue',
        list:[],
        message: 'Vue.js',
        url: 'https://jp.vuejs.org',
        val: 'true',
        val2: 'yes',
        val3:[],
        preview:'',
        val4:'50'
    },
    methods: {
        doAdd: function(){
            var max = this.list.reduce(function(a,b){
                return a > b.id ? a:b.id
            },0)

            this.list.push({
                id: max + 1,
                name: this.name,
                hp: 500
            })
        },
        doRemove: function(index){
            this.list.splice(index,1)
        },
        doAttack: function(index){
            this.list[index].hp -= 10;
        },
        handleClick: function(){
            alert('クリックしたよ')
        },
        handleInput: function(event){
            console.log(event)
            this.message = event.target.value;
        },
        handler: function(comment) {
            console.log(comment)
        },
        handleChange: function(event) {
            var file = event.target.files[0]
            if (file) {
                this.preview = window.URL.createObjectURL(file)
            }
        }

    },
    created:function(){
        axios.get('list.json').then(function(response) {
            this.list = response.data
        }.bind(this)).catch(function(e){
            console.log(error(e))
        })
    }
});

