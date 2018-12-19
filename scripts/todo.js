//Description:
//  TODOを管理することができるボットです
//Commands:
//  ボット名 todo     -TODOを作成
//  ボット名 done     -TODを完了にする
//  ボット名 del      -TODOを消す
//  ボット名 list     -TODOの一覧表示
//  ボット名 donelist -完了した TOD の一覧表示

'use strict';

const todo = require('todo');
module.exports = (robot) => {
    /**
    *respond関数 ボットの名前が一緒に呼び出された際に反応する関数
    * /todo (.+)/i   Javascriptの正規表現
    *  /iは大文字でも小文字でもマッチするというオプション
    */
   robot.respond(/todo (.+)/i, (msg) => {
    const task = msg.match[1].trim();
    todo.todo(task);
    msg.send('追加しました: ' + task);
});
robot.respond(/done (.+)/i, (msg) => {
    const task = msg.match[1].trim();
    todo.done(task);
    msg.send('完了にしました: ' + task);
});
robot.respond(/del (.+)/i, (msg) => {
    const task = msg.match[1].trim();
    todo.del(task);
    msg.send('削除しました: ' + task);
});
//配列をjoin()で結合する、この場合はjoin('\n')で改行しながら結合させる
//反対にsprit()で文字列を配列へ分ける。sprit(',')なら[1,2,3,4]の様にカンマで区切って配列に
robot.respond(/list/i, (msg) => {
    const list = todo.list();
    if(list.length === 0){
        msg.send('(TODOはありません)');
    }else{
    msg.send(list.join('\n'));
 }
});
robot.respond(/donelist/i, (msg) => {
    const donelist = todo.donelist();
    if(donelist.length === 0){
        msg.send('(完了したTODOはありません)');
    }else{
    msg.send(donelist.join('\n'));
    }
});
};