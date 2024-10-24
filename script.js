
$(document).ready(function() {
    var apiKey = 1320;
  
    var getAndDisplayAllTasks = function() {
        $.ajax({
          type: 'GET',
          url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=' + apiKey,
          dataType: 'json',
          success: function(response) {
            $('#todo-list').empty(); // Clear the task list first
            response.tasks.forEach(function(task) {
              $('#todo-list').append(
                `<div class="task-item">
                  <input type="checkbox" class="mark-complete" data-id="${task.id}" ${task.completed ? 'checked' : ''}>
                  <p>${task.content}</p>
                  <button class="delete" data-id="${task.id}">Delete</button>
                </div>`
              );
            });
          },
          error: function(error) {
            console.log("Error fetching tasks:", error);
          }
        });
      };
      
  
    var createTask = function(content) {
      $.ajax({
        type: 'POST',
        url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=' + apiKey,
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({ task: { content: content } }),
        success: function(response) {
          $('#new-task-content').val(''); 
          getAndDisplayAllTasks(); 
        },
        error: function(error) {
          console.log("Error creating task:", error);
        }
      });
    };
  
    var deleteTask = function(id) {
      $.ajax({
        type: 'DELETE',
        url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '?api_key=' + apiKey,
        success: function(response) {
          getAndDisplayAllTasks(); 
        },
        error: function(error) {
          console.log("Error deleting task:", error);
        }
      });
    };

    var markTaskComplete = function(id) {
      $.ajax({
        type: 'PUT',
        url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_complete?api_key=' + apiKey,
        success: function(response) {
          getAndDisplayAllTasks(); 
        },
        error: function(error) {
          console.log("Error marking task complete:", error);
        }
      });
    };
  
   
    var markTaskActive = function(id) {
      $.ajax({
        type: 'PUT',
        url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_active?api_key=' + apiKey,
        success: function(response) {
          getAndDisplayAllTasks(); 
        },
        error: function(error) {
          console.log("Error marking task active:", error);
        }
      });
    };
  
  
    $('#create-task').on('submit', function(event) {
      event.preventDefault();
      var newTaskContent = $('#new-task-content').val();
      if (newTaskContent) {
        createTask(newTaskContent);
      }
    });
  
  
    $(document).on('click', '.delete', function() {
      deleteTask($(this).data('id'));
    });
  
  
    $(document).on('change', '.mark-complete', function() {
      var id = $(this).data('id');
      if (this.checked) {
        markTaskComplete(id);
      } else {
        markTaskActive(id);
      }
    });
  
  
    getAndDisplayAllTasks();
  });
  