Vue.component('comp-child',{
    template: '<button v-on:click="handleClick">イベント発火</button>',
    methods: {
        //ボタンのクリックイベントのハンドラでchilds-eventを発火する
        handleClick: function () {
            this.$emit('childs-event')
        }
    }
});

new Vue({
    el: '#app',
    methods: {
        //childs-eventが発生した！
        parentsMethod: function () {
            alert('イベントをキャッチ！')
        }
    }
})