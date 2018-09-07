## コンポーネント

### グローバルにコンポーネント定義
```javascript
Vue.component('my-component',{
    template: '<p>MyComponent</p>'
})
```

### ローカルにコンポーネント登録
```javascript
//コンポーネント定義
const myComponent = {
    template: '<p>Mycomponent</p>'
}

new Vue({
    el: '#app',
    components: {
        //my-compoentがルートでのみ使用可能になる
        //左辺はケバブケース、パスカルケース、キャメルケースで記述
        //右辺はキャメルケース
        'my-component': myComponent
    }
})
```
###　コンポーネントの使用
```html
<!--使用する際はケバブケース-->
<my-component></my-component>
```

### コンポーネントのオプション
```javascript
Vue.component('my-component',{
    //テンプレート
    template: '<p>{{ message }}{{halfWidth}}</p>',
    //データはオブジェクトを返す関数にする
    data:function(){
        return {
            message: 'Hello Vue.js',
            width: 800
        }
    },
    //メソッドや算出プロパティなどはルートコンストラクタのオプションと同じ
    methods: {

    },
    computed: {
        halfWidth: function(){
            return this.width / 2
        }
    }
})
```

### 親子コンポーネント
```javascript
//「comp-child」は「my-component」の子コンポーネント
Vue.component('my-component',{
    template: '<div><comp-child></comp-child></div>'
})

Vue.component('comp-child',{
    template: '<p>テスト</p>'
})
```

```html
<!--「comp-child」はルートの子コンポーネント-->
<div id="app">
    <comp-child></comp-child>
</div>
```

### 親子間のデータフロー
propsとカスタムイベントを使用して、なるべく依存の少ないインターフェース
- 親から子（props down）「属性」で渡して「props」で受け取る
- 子から親（event up）「$emit」で渡して「on」で受け取る

### 親から子（props down）
属性で渡して→propsで受け取る単一方向の受け渡し
```html
    <!--属性としてコンポーネントにデータを持たせる-->
    <comp-child val="これはA"></comp-child>
    <comp-child val="これはB"></comp-child>
```
```javascript
Vue.component('comp-child',{
    //テンプレートでvalを使用
    template: '<p>{{ val }}</p>',
    //受け取る属性名を指定することで自分のデータのように使用できる
    props: ['val']
})
```

#### コンポーネントに対する属性付与
propsで受け取っていないものは、子コンポーネント側のテンプレートのルートのタグの属性として上書き、複数設定できるものはマージされる
```javascript
Vue.component('comp-child',{
    template: '<p id="child" class="child">ChildComponent</p>',
})
```

```html
 <comp-child id="parent" class="parent"></comp-child>
```

```html
<!--実際の描画-->
<p id="parent" class=""child parent>ChildComponent</p>
```

#### コンポーネントをリストレンダリング
```javascript
// 子コンポーネント
Vue.component('comp-child',{
    template: '<li>{{name}} HP.{{hp}}</li>',
    props: ['name','hp']
})
```

```html
<!--親コンポーネント-->
    <ul>
        <!--リストを繰り返し描画しながら、nameとhpプロパティを子コンポーネントに渡す-->
        <comp-child v-for="item in list"
                    v-bind:key="item.id"
                    v-bind:name="item.name"
                    v-bind:hp="item.hp">
        </comp-child>
    </ul>
```

```javascript
    //親コンポーネント
    new Vue({
        el: '#app',
        data: {
            list: [
                { id:1,name: 'スライム',hp:100 },
                { id:2,name: 'ゴブリン',hp:200 },
                { id:3,name: 'ドラゴン',hp:500 }
            ]
        }
    });
```

#### propsで受け取ったデータは勝手に書き換えてはいけない
```javascript
// 子コンポーネント
Vue.component('comp-child',{
    template: `<li>{{name}} HP.{{hp}}
                <button v-on:click="doAttack">攻撃する</button></li>`,
    props: ['name','hp'],
    methods: {
        //NG
        doAttack: function(){
            this.hp -= 10
        }
    }
})
```

#### propsの受け取りデータ型を指定する
```javascript
Vue.component('comp-child',{
    props: {
        val: String //文字列型のデータのみ許容
    }
})
```
```javascript
Vue.component('my-component', {
  props: {
    // 基本的な型の検査 (`null` は全ての型にマッチします)
    propA: Number,
    // 複数の型の許容
    propB: [String, Number],
    // 文字列型を必須で要求する
    propC: {
      type: String,
      required: true
    },
    // デフォルト値つきの数値型
    propD: {
      type: Number,
      default: 100
    },
    // デフォルト値つきのオブジェクト型
    propE: {
      type: Object,
      // オブジェクトもしくは配列のデフォルト値は
      // 必ずそれを生み出すための関数を返す必要があります。
      default: function () {
        return { message: 'hello' }
      }
    },
    // カスタマイズしたバリデーション関数
    propF: {
      validator: function (value) {
        // プロパティの値は、必ずいずれかの文字列でなければならない
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    }
  }
})
```

### 子のイベントを親にキャッチさせる
- 子コンポーネントの状態に応じて親コンポーネントに何かアクションを起こさせたり、子コンポーネントが持っているデータを親コンポーネントに渡したい場合は「カスタムイベント」と、インスタンスメソッドの「$emit」を使用
- 子コンポーネントが$emitでイベントを発火　→　親コンポーネントがonで受け取る


子のイベントを親にキャッチさせる
```html
<!--v-onディレクティブで子のイベントをハンドルしておく(childs-event)-->
<comp-child v-on:childs-event="parentsMethod"></comp-child>
```

```javascript
Vue.component('comp-child',{
    template: '<button v-on:click="handleClick">イベント発火</button>',
    methods: {
        //ボタンのクリックイベントのハンドラでchilds-eventを発火する
        handleClick: function() {
            this.$emit('childs-event')
        }
    }
})
```

```javascript
new Vue({
    el: '#app',
    methods: {
        //childs-eventが発生したらparentsMethodsが動く
        parentsMethod: function(){
            alert('イベントをキャッチ')
        }
    }
})
```

#### 子のイベントで親のデータを操作する

```html
    <ul>
        <!-- v-onディレクティブで子のイベントをハンドルしておく(attack) -->
        <!-- attackが動いたらhandleAttackが動く -->
        <comp-child v-for="item in list"
                    v-bind:key="item.id"
                    v-bind="item"
                    v-on:attack="handleAttack">
        </comp-child>
    </ul>
```

```javascript
Vue.component('comp-child',{
    template: `<li>{{name}} HP.{{hp}}
                <button v-on:click="doAttack">攻撃する</button></li>`,
    //要素をpropsで受け取る
    props: {id:Number,name:String,hp:Number},
    methods: {
        //ボタンのクリックイベントのハンドラから$emitでattackを発火する
        doAttack: function(){
            //引数として自分のIDを渡す
            this.$emit('attack',this.id)
        }
    }
})
```

```javascript
new Vue({
    el: '#app',
    data: {
        list: [
            { id:1,name: 'スライム',hp:100 },
            { id:2,name: 'ゴブリン',hp:200 },
            { id:3,name: 'ドラゴン',hp:500 }
        ]
    },
    methods :{
        //attackが発生した!
        handleAttack: function(id){
            //引数のIDから要素を検索
            const item = this.list.find(function(el){
                return el.id === id
            })
            //HPが0より多ければ10減らす
            if (item !== undefined && item.hp > 0 ) item.hp -= 10
        }
    }
});
```

#### mixins
コンポーネントのコンストラクタのオプションを抜きだして、コンポーネントに混ぜ込む機能

mixinを定義
```javascript
const mixin = {
    created: function () {
        this.hello()
    },
    methods: {
        hello: function () {
            console.log('hello from mixin')
        }
    }
}
```

コンポーネントでmixinを使用
```javascript
//コンポーネントA
Vue.component('component-a', {
    template: '<div>MyComponentA</div>',
    mixins: [mixin]
});

Vue.component('component-b', {
    template: '<div>MyComponentB</div>',
    mixins: [mixin]
})

```

keep-aliveで状態を維持
以下の状態だと入力と一覧を切り替えたときに入力していた文字が消えてしまう
```html
<!--ボタンを押したらcurrentを切り替える-->
    <button v-on:click="current='comp-board'">メッセージいちらん</button>
    <button v-on:click="current='comp-form'">投稿フォーム</button>
    <div v-bind:is="current"></div>
```

```javascript
//一覧コンポーネント
Vue.component('comp-board',{
    template: '<div>Message Board</div>',
})

//入力コンポーネント
Vue.component('comp-form',{
    template: '<div>Form<textarea v-model="message"></textarea></div>',
    data: function(){
        return { message: '' }
    }
})
```

```javascript
new Vue({
    el: '#app',
    data: {
        current: 'comp-board'
    }
})
```
↓
keep-aliveで囲むことで状態が破棄されなくなる
入力と一覧を切り替えても入力していた文字が消えない

```html
    <button v-on:click="current='comp-board'">メッセージいちらん</button>
    <button v-on:click="current='comp-form'">投稿フォーム</button>
    <keep-alive>
        <div v-bind:is="current"></div>
    </keep-alive>
```

##### keep-aliveで追加されるライフサイクルフック
活性化、非活性化を
activated（活性化）、deactivated（非活性化）メソッドで判別できる
```javascript
Vue.component('comp-board',{
    template: '<div>Message Board</div>',
    activated: function(){
        console.log('1:active')
    },
    deactivated: function(){
        console.log('1:deactivate')
    }
})

Vue.component('comp-form',{
    template: '<div>Form<textarea v-model="message"></textarea></div>',
    data: function(){
        return { message: '' }
    },
    activated: function(){
        console.log('2:active')
    },
    deactivated: function(){
        console.log('2:deactivate')
    }
})
```

## トランジション、アニメーション

###トランジション効果を適用させたい要素を<transition>タグで囲むだけでトランジション用のクラスが適用できる
```html
    <transition>
        <div v-show="show">トランジションさせたい要素</div>
    </transition>
```

```javascript
new Vue({
    el: '#app',
    data: {
        show: true
    }
})
```

```scss
//一秒かけて透明度を遷移
.v-enter-active,.v-leave-active {
    transition: opacity 1s;
}

.v-enter,.v-leave-to {
//見えなくなるときの透明度
    opacity: 0;
}
```

###トランジションクラス名とクラスのプレフィックス
- 要素に付与されるトランジションクラス名はデフォルトでv-というプレフィックスがつく
- <transition>タグにname属性で名前を指定することで任意に変更できる
```html
    <transition name="demo">
        <div v-if="show">トランジションさせたい要素</div>
    </transition>
```

```scss
.demo-enter-active,.demo-leave-active {
    transition: opacity 1s;
}

.demo-enter,.demo-leave-to {
    opacity: 0;
}
```

### 初期描画時にトランジション
<transition>または<transition-group>タグにappear属性をつけることで初期描画時にもトランジション
```html
    <transition appear>
        <div v-if="show">トランジションさせたい要素</div>
    </transition>
```

| Enter系クラス   | 対象要素がDOMに挿入されるときのトランジション                                                                   |
|-----------------|-----------------------------------------------------------------------------------------------------------------|
| .v-enter        | 対象要素がDOMに挿入される前に付与され、トランジションが終了したときに削除される。Enterのアクティブ状態を表す    |
| .v-enter-to     | トランジションが実際に開始されたときに付与され、トランジションが終了したときに削除される。Enterの終了状態を表す |
| .v-enter-active | 対象要素がDOMに挿入される前に付与され、トランジションが終了したときに削除される。Enterのアクティブ状態を表す    |

| Leave系クラス   | 対象要素がDOMから削除されるときのトランジションフェーズ                                                     |
|-----------------|-------------------------------------------------------------------------------------------------------------|
| .v-leave        | トランジションの開始する前に付与され、トランジションの開始時に削除される。Leaveの開始状態を表す             |
| .v-leave-to     | トランジションの開始時に付与され、トランジションが終了したときに削除される                                  |
| .v-leave-active | トランジションの開始する前に付与され、トランジションが終了したときに削除される。Leaveのアクティブ状態を表す |


```scss
//トランジション中有効にするためのtrantionプロパティ
.v-enter-active,.v-leave-active {
    transition: opacity 1s;
}
//何も付与されていなければopacity:1になるためopacity:1は省略可

//表示されるときは0からへ
.v-enter {
  opacity: 0;
}

v-enter-to {
  opacity: 1;
}

//消えるときは1から0へ
.leave {
  opacity: 1;
}
.v-leave-to {
  opacity: 0;
}
```

#### EnterとLeaveで別々のスタイルを定義する

```scss
.v-enter-active,.v-leave-active {
    transition: 1s;
}
//表示するときは左から
.v-enter {
    opacity: 0;
    transform : translateX(-10px);
}

//消えるときは下へ
.v-leave-to {
    transform: translateY(10px);
}
```
複数の要素のアニメーション
<transition>タグに複数の要素が含まれていても、描画結果の要素が１つなら単一トランジションが使用できる。
v-ifでグループ化する場合、要素を区別するためにキーを設定

```html
    <transition>
        <div v-if="show" key="a">TRUE</div>
        <div v-else= key="b">FALSE</div>
    </transition>
```
#### EnterとLeaveのタイミングを変更する
- in-out 　Enterトランジションが終わってからLeaveトランジションを開始する
- out-in 　Leaveトランジションが終わってからEnterトランジションを開始する

#### キーの変化によるトランジションの発動
特定のデータの変化をトリガにして、トランジションを発動させることもできる
countプロパティを要素のキーに設定しているため、countプロパティの数値が変わるたびにトランジション
```html
    <button v-on:click="count++">切り替え</button>
    <transition>
        <div v-bind:key="count">{{ count }}</div>
    </transition>
```

```javascript
new Vue({
    el: '#app',
    data: {
        count: 0
    }
});

```

#### リストトランジション
- 複数の要素をグループ化して追加と削除および移動のアニメーション
- <transition-group>はラッパー要素をかねるためtag属性でタグ名を指定する

```html
    <transition-group name="list" tag="ul">
        <li v-for="item in list" v-bind:key="item.id"></li>
    </transition-group>
```
- リストに対して追加や削除をしたり条件により描画の状態が変わったとき、
その要素に対してEnterとLeave系のトランジションクラスが付与される
- 前方に要素が追加、削除されたり、並び替えによって順番が動いたとき、「.v-move」というトランジションクラスが付与される
- MoveはCSSのtransformプロパティを使ってシームレスな移動アニメーションを行う　そのため以下のようなスタイルを定義する

```scss
//一秒かけて要素を移動させる
.v-move {
transition: transform 1s;
}

```
#### 移動トランジション
リストの順番が反転したとき.moveアニメーションする
```html
    <button v-on:click="order=!order">切り替え</button>
    <!--transition-groupタグに指定した属性はラップ要素に付与される-->
    <transition-group tag="ul">
        <li v-for="item in sortedList" v-bind:key="item.id">
            {{item.name}}{{item.price}}円
        </li>
    </transition-group>
```

```javascript
new Vue({
    el:"#app",
    data: {
        order: false,
        list: [
            { id:1,name:'りんご',price:100 },
            { id:2,name:'ばなな',price:200 },
            { id:3,name:'いちご',price:300 },
        ]
    },
    computed: {
        //orderの値でリストの順番を反転する算出プロパティ
        sortedList: function(){
            //LodashのorderByメソッドを使用
            return _.orderBy(this.list,'price',this.order ? 'desc':'asc')
        }
    }
})
```