const myComponent = {
    template: '<p>Mycomponent</p>'
}

new Vue ({
    el: '#app',
    components: {
        //my-componentがルートでのみ使用可能になる
        'my-component':myComponent
    }
})