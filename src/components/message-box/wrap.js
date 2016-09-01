// 其实是很不想引入vue的,不得已额
const Vue = require('vue');
const vMessageBox = require('./index');

class MessageBox {
    constructor(obj) {
        Object.assign(this, obj);
    }
}

MessageBox.init = function(obj) {
    let mb = new MessageBox(obj);
    let tmpDiv = document.createElement('div');

    document.body.appendChild(tmpDiv);

    this.messageBox = new Vue({
        el: tmpDiv,
        template: `<v-message-box
                                :id="id" :type="type"
                                :title="title"
                                :explain="explain"
                                :on-ok="onOk"
                                :on-cancel="onCancelWrap"
                                :is-show.sync="isShow"></v-message-box>`,
        data: {
            type: mb.type,
            id: mb.id || ('MessageBox' + Math.random().toString(36).substr(3, 15)),
            title: mb.title,
            explain: mb.explain,
            onOk: mb.onOk,
            onCancel: mb.onCancel,
            isShow: mb.isShow,
        },
        methods: {
            onCancelWrap() {
                this.onCancel && this.onCancel();
                this.$remove();
            }
        },
        components: {
            vMessageBox
        },
        ready() {
            this.isShow = true;
        }
    })
};

window.MessageBox = MessageBox;