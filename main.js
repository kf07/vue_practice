new Vue({
    el:'#app',
    data:{
        price: 19800,
        message: 'テスト',
    },
    filters: {
        localeNum: function(val){
            //toLocaleString 数値を3ケタ区切りにする
            return val.toLocaleString()
        },
        filter: function(message,foo, num){
            console.log(message,foo, num);
        },
        //小数点以下を第2位に丸める
        round: function(val){
            return Math.round(val * 100)/100
        },
        //度からラジアンに変換するフィルタ
        radian: function (val) {
            return val * Math.PI / 180
        }
    }
});


