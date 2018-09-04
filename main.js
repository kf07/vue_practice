Vue.component('my-component',{
    template: '<p><comp-child></comp-child></p>',
    //データはオブジェクトを返す関数
    data: function(){
        return {
            message: 'Hello Vue.js'
        }
    },
    method: {
        //メソッドや算出プロパティ、ウォッチャなどの定義方法は
        //ルートコンストラクタのオプションと同じ
    }
})

Vue.component('comp-child', {
    template: '<p> {{val}} </p>',
    props: ['val']
})

new Vue ({
    el: '#app',
    components: {
    }
});