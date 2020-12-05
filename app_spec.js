function resetList() {
  var todoLis = document.querySelectorAll('#todo-list li');
  var deleteButtons = document.getElementsByClassName('destroy');
  for (var i = 0; i < todoLis.length; i++) {
    deleteButtons[0].click();
  }
}

function createTodo() {
  var input = document.getElementById('new-todo');
  input.value = 'Frameworks suuuuuck';
  pressEnterKey(input);
  return document.querySelector('li');
}

function pressEnterKey(input) {
  var enterKeyEvent = document.createEvent('Event');
  enterKeyEvent.initEvent('keyup');
  enterKeyEvent.keyCode = 13;
  enterKeyEvent.which = 13;
  input.dispatchEvent(enterKeyEvent);
}

function enableEditing(todoLabel) {
  var doubleClickEvent = new MouseEvent('dblclick', {
    bubbles: true,
    cancelable: true,
    view: window
  });
  todoLabel.dispatchEvent(doubleClickEvent);
}

function clickToggleAllButton() {
  var toggleAllButton = document.getElementById('toggle-all');
  toggleAllButton.click();
}

tests({
  
  'It should add a todo.': function() {
    resetList();
    createTodo();
    var todoLis = document.querySelectorAll('#todo-list li');
    eq(todoLis.length, 1);
  },

  'It should delete a todo.': function() {
    resetList();
    createTodo();
    var deleteButtons = document.getElementsByClassName('destroy');
    deleteButtons[0].click();
    eq(deleteButtons.length, 0);
  },

  'It should toggle a todo.': function() {
    resetList();
    createTodo();
    var toggleButtons = document.getElementsByClassName('toggle');
    toggleButtons[0].click();
    eq(toggleButtons[0].checked, true);

    clickToggleAllButton();
  },

  'It should toggle all todos.': function() {
    resetList();
    createTodo();
    createTodo();
    var toggleButtons = document.getElementsByClassName('toggle');
    toggleButtons[0].click();

    clickToggleAllButton();
    
    eq(toggleButtons[0].checked, true);
    eq(toggleButtons[1].checked, true);
  },
  
'It should edit and update a todo.': function() {
  resetList();

  var todo = createTodo();
  var todoInput = todo.querySelector('input.edit');
  var todoLabel = todo.querySelector('label');
  var todoTitleRevised = 'Edited';
  enableEditing(todoLabel);

  todoInput.focus();
  todoInput.value = todoTitleRevised;
  todoInput.blur();
  var todoLabelAfterRender = document.querySelector('#todo-list label')
  eq(todoLabelAfterRender.textContent, todoTitleRevised);
},

  'It should not contain a jQuery script tag.': function() {
    var nodeListScripts = document.querySelectorAll('script');
    var jqueryScriptTags = [];
    function findScriptTags() {
      for (var i = 0; i < nodeListScripts.length; i++) {
        if (nodeListScripts[i].outerHTML === '<script src="https://code.jquery.com/jquery-2.2.4.js"></script>') {
          jqueryScriptTags.push(nodeListScripts[i]);
        }
      }
    }
    findScriptTags();
    eq(jqueryScriptTags.length, 0);
  },

  'It should contain the app.js tag.': function() {
    var nodeListScripts = document.querySelectorAll('script');
    var appjsScriptTags = [];
    function findScriptTags() {
      for (var i = 0; i < nodeListScripts.length; i++) {
        if (nodeListScripts[i].outerHTML === '<script src="app.js"></script>') {
          appjsScriptTags.push(nodeListScripts[i]);
        }
      }
    }
    findScriptTags();
    eq(appjsScriptTags.length, 1);
    eq(JSON.stringify(appjsScriptTags[0].outerHTML), JSON.stringify('<script src="app.js"></script>'));
  }

});

