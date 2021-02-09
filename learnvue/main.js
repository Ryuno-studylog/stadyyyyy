var scroll = new SmoothScroll()

new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue.js!',
        list: ['A','B','C'],
        show:true,
        show1: true,
        show2: true,
        count: 0,

        show4: true,


        isChild: true,
        isActive: true,

        textColor: 'red',
        bgColor: 'lightgray',

        radius: 50,

        val:true,
        val1:[],
        val2:'',

        preview: '',

        monsters: [
            //{ id: 1, name: "スライム", hp: 100 },
            //{ id: 2, name: "ゴブリン", hp: 200 },
            //{ id: 3, name: "ドラゴン", hp: 500 }
        ],

        scrollY: 0,
        timer: null
        

    },

    created: function () {
        axios.get('monsters.json').then(function (response) {
          // 取得完了したらlistリストに代入
          this.monsters = response.data
        }.bind(this)).catch(function (e) {
          console.error(e)
        })
    },

    created: function () {
        // ハンドラを登録
        window.addEventListener('scroll', this.handleScroll)
      },
      beforeDestroy: function () {
        // ハンドラを解除（コンポーネントやSPAの場合忘れずに！）
        window.removeEventListener('scroll', this.handleScroll)
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
        },

        handleCount() {
            var count2 = this.$refs.count2
            if (count2) {
              count2.innerText = parseInt(count2.innerText, 10) + 1
            }
        },

        handleInput: function (event) {
            // 代入前に何か処理を行う…
            this.message = event.target.value
        },

        handler: function (comment) {
            console.log(comment)
        },

        handleChange: function (event) {
            var file = event.target.files[0]
            if (file && file.type.match(/^image\/(png|jpeg)$/)) {
              this.preview = window.URL.createObjectURL(file)
            }
        },

        handleScroll: function () {
            if (this.timer === null) {
              this.timer = setTimeout(function () {
                this.scrollY = window.scrollY
                clearTimeout(this.timer)
                this.timer = null
              }.bind(this), 200)
            }
        },
        scrollTop: function () {
            scroll.animateScroll(0)
        },

        handleInput2: function (event) {
            console.log(event.target.value)
        }
    }
})


$(document).on('click', '[data-update]', function () {
    $('#mes').val($(this).attr('data-update'))
    // 入力値を更新したらイベントを発生させる
    $('#mes')[0].dispatchEvent(new Event('input'))
})



