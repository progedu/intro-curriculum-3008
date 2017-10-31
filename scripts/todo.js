// Description:
//   TODO を管理することができるボットです
// Commands:
//   ボット名 todo     - TODO を作成
//   ボット名 done     - TODO を完了にする
//   ボット名 del      - TODO を消す
//   ボット名 list     - TODO の一覧表示
//   ボット名 donelist - 完了した TODO の一覧表示

'use strict';
const todo = require('todo');
console.log(todo.list());
module.exports = (robot) => {
    //respond: hubotの関数。ボットの名前が一緒に呼び出された時のみ反応する
    //書式:(マッチさせたい正規表現, 正規表現にマッチしたときに呼び出されるコールバック関数
    robot.respond(/todo (.+)/i, (msg) => {
        //match[0]にはinputしたすべての値が入っている("todo "も入っている)
        //今回必要なのは正規表現でマッチした結果のmatch[1]
        const task = msg.match[1].trim(); //trim:前後の空白を取り除く
        todo.todo(task);
        msg.send('追加しました： ' + task);
    });

    robot.respond(/done (.+)/i, (msg) => {
        const task = msg.match[1].trim();
        todo.done(task);
        msg.send('完了にしました： ' + task);
    });

    robot.respond(/del (.+)/i, (msg) => {
        const task = msg.match[1].trim();
        todo.del(task);
        msg.send('削除しました： ' + task);
    });

    robot.respond(/list/i, (msg) => {
        if (todo.list() == '') {
            msg.send('todoはありません');
        } else {
            msg.send(todo.list().join('\n'));   //joinメソッド：配列のすべての要素を引数で繋いで文字列にする
        }
    });

    robot.respond(/donelist/i, (msg) => {
        if (todo.donelist() == '') {
            msg.send('完了したtodoは有りません');
        } else {
            msg.send(todo.donelist().join('\n'));
        }
    });
};
