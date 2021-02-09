new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue.js!',
        list: ['A','B','C'],
        show:true,
        show1: true,
        show2: true,
        count: 0,

        isChild: true,
        isActive: true,

        textColor: 'red',
        bgColor: 'lightgray',

        radius: 50,

        monsters: [
            { id: 1, name: "スライム", hp: 100 },
            { id: 2, name: "ゴブリン", hp: 200 },
            { id: 3, name: "ドラゴン", hp: 500 }
        ]
        

    },

    created: function () {
        axios.get('monsters.json').then(function (response) {
          // 取得完了したらlistリストに代入
          this.monsters = response.data
        }.bind(this)).catch(function (e) {
          console.error(e)
        })
    },

    methods: {
        hand: function (event) {
          alert(event.target) // [object HTMLButtonElement]
        },

        // ボタンをクリックしたときのハンドラ
        increment: function () {
        this.count += 1 // 処理は再代入するだけでOK！
        },

        // 追加ボタンをクリックしたときのハンドラ
        doAdd: function () {
            // リスト内で1番大きいIDを取得
            var max = this.monsters.reduce(function (a, b) {
                return a > b.id ? a : b.id
            }, 0)
            // 新しいモンスターをリストに追加
            this.monsters.push({
                id: max + 1, // 現在の最大のIDに+1してユニークなIDを作成
                name: this.name, // 現在のフォームの入力値
                hp: (Math.floor( Math.random() * (max + 1 - 1) ) + 1)*100
            })
        },

        // 要素を削除ボタンをクリックしたときのハンドラ
        doRemove: function (index) {
            // 受け取ったインデックスの位置から1個要素を削除
            this.monsters.splice(index, 1)
        },

         // 攻撃ボタンをクリックしたときのハンドラ
        doAttack: function (index) {
            this.monsters[index].hp -= 10 // HPを減らす
        },

        handleClick() {
            var count = this.$refs.count
            if (count) {
              count.innerText = parseInt(count.innerText, 10) + 1
            }
        }
    }
})