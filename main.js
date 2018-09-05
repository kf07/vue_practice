Vue.component('comp-child',{
    template: '<li>{{ name }} HP.{{ hp }}<button v-on:click="doAttack">攻撃する</button></li>',
    props: {id:Number,name:String,hp:Number},
    methods: {
        //ボタンのクリックイベントのハンドラから$emitでattackを発火する
        doAttack: function(){
            //引数として自分のIDを渡す
            this.$emit('attack',this.id)
        }
    }
});

new Vue({
    el: '#app',
    data: {
        list: [
            { id:1,name:'スライム',hp:100 },
            { id:2,name:'ゴブリン',hp:200 },
            { id:3,name:'ドラゴン',hp:500 }
        ]
    },
    methods: {
        handleAttack: function (id) {
            const item = this.list.find(function(el){
                return el.id === id
            })
            //HPが0より多ければ10減らす
            if (item !== undefined && item.hp > 0) item.hp -= 10
        }
    }
})