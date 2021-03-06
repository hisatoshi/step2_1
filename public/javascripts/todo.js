// ページが表示されたときToDoリストを表示する
$(function(){
  getTodo();
});

// フォームを送信ボタンを押すと、ToDoを追加して再表示する。
$('#form').submit(function(){
  postTodo();
  return false;
});

// ToDoのタイトルを取得する

// ToDo一覧を取得して表示する
function getTodo(){
    // /todoにGETアクセスする
    $.get('/todo', refreshTodos);
}

function refreshTodos(todos) {
  var $list = $('#todoList');
  // $list.fadeOut(function(){});
  // $list.fadeIn();

  // /todoにGETアクセスする
  // 取得したToDoを追加していく
  console.log(todos)
  $.each(todos, refreshTodo);
  // 一覧を表示する

}
function refreshTodo(index, todo) {
  console.log(todo);
  var $list = $('#todoList');
  var limit = new Date(todo.limitDate);
  $list.append('<p id="todoDetail"><input type="checkbox" ' + (todo.isCheck ? 'checked' : '') + '>' + todo.text + ' (~' + limit.toLocaleString() + ')</p>');
}

// // ToDo一覧を取得して表示する
// function getTodo(){
//   // すでに表示されている一覧を非表示にして削除する
//   var $list = $('.list');
//   $list.fadeOut(function(){
//     $list.children().remove();
//     // /todoにGETアクセスする
//     var $todos = $('.todos').val();
//       // 取得したToDoを追加していく
//     console.log($todos);
//       $.each($todos, function(index, todo){
//         var limit = new Date(todo.limitDate);
//         console.log(limit);
//         $list.append('<p id="todoDetail"><input type="checkbox" ' + (todo.isCheck ? 'checked' : '') + '>' + todo.text + ' (~' + limit.toLocaleString() + ')</p>');
//       });
//       // 一覧を表示する
//       $list.fadeIn();
//     });
// }


// // ToDo一覧を取得して表示する
// function getTodo(){
//   // すでに表示されている一覧を非表示にして削除する
//   var $list = $('.list');
//   $list.fadeOut(function(){
//     $list.children().remove();
//     // /todoにGETアクセスする
//     $.get('/todo', function(todos){
//       // 取得したToDoを追加していく
//       $.each(todos, function(index, todo){
//         var limit = new Date(todo.limitDate);
//         $list.append('<p id="todoDetail"><input type="checkbox" ' + (todo.isCheck ? 'checked' : '') + '>' + todo.text + ' (~' + limit.toLocaleString() + ')</p>');
//       });
//       // 一覧を表示する
//       $list.fadeIn();
//     });
//   });
// }

// フォームに入力されたToDoを追加する
function postTodo(){
  // フォームに入力された値を取得
  var text = $('#text').val();
  var limitDate = new Date($('#limit').val());
  var listname = $('h1').text();
  //入力項目を空にする。フォームの中の値をからにする。valはフォームの中の
  $('#text').val('');
  $('#limit').val('');

  // /todoにPOSTアクセスする

var todo = {
  text: text,
  limitDate: limitDate,
  listname: listname,
  isCheck: false
};

  $.post('/todo', todo, function(res){
    console.log(res);
    if (res){
      refreshTodo(0,todo);
    } else {
      console.log(res);
    }
    });
}
