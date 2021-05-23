import React, { Component } from "react";
import "./index.css";

export default class KanbanBoard extends Component {
  constructor() {
    super();
    // Each task is uniquely identified by its name. 
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.state = {
      tasks: [
            { name: '1', stage: 0 },
            { name: '2', stage: 0 },
        ]
    };
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
  }

  createTask(e){
    let newTaskInput = document.getElementById('create-task-input').value;
    if(!String(newTaskInput).trim()) return;

    this.setState(state=>({ tasks: [...state.tasks, {name:newTaskInput,stage:0} ] }))
    document.getElementById('create-task-input').value=''
    }

  forwardStageItem(task){

    
    // //Remove cicked item.
    // this.setState(
    //   {
    //       tasks: this.state.tasks.filter((item,index)=>
    //          (item.name !== task.name)
    //       )
    //   }
    // )  
  
    // //Add the clicked item to new stage 1
    // this.setState(state=>({ tasks: [...state.tasks, {name:task.name,stage:1}
    // ] }))
    
    let stageId = task.stage;

    //item.name !== task.name
    //Na linha acima, para cada item, verifica se o item é diferente
    //do item que vai ser movido. Se sim, então copia o item para o array
    //caso não, atualiza o item que será movido
    this.setState(
      {
        tasks : this.state.tasks.map((item,index)=>
           item.name !== task.name ? item : (
            {name:task.name,stage:++stageId}
          )
        )
      }
    )

    
  }

  backWardStage(task){
    let stageId = task.stage;

    this.setState(
      {
        tasks : this.state.tasks.map((item,index)=>
           item.name !== task.name ? item : (
            {name:task.name,stage:--stageId}
          )
        )
      }
    )
  }

  deleteTask(task){
    this.setState(
      {
        tasks : this.state.tasks.filter((item,index)=>
           item.name !== task.name 
        )
      }
    )
  }

  render() {
    // console.log('tasks......' ,this.state)
    const { tasks } = this.state;

    let stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      stagesTasks.push([]);
    }

    for (let task of tasks) {
      const stageId = task.stage;
      stagesTasks[stageId].push(task);    
      // console.log('stage tasks......' ,stagesTasks[stageId])

    }

    return (
      <div className="mt-20 layout-column justify-content-center align-items-center">
        <section className="mt-50 layout-row align-items-center justify-content-center">
          <input id="create-task-input" type="text" className="large" placeholder="New task name" data-testid="create-task-input"/>
          <button type="submit" className="ml-30" data-testid="create-task-button" onClick={(e)=>this.createTask(e)}>Create task</button>
        </section>

        <div className="mt-50 layout-row">
            {stagesTasks.map((tasks, i) => {
                return (
                    <div className="card outlined ml-20 mt-0" key={`${i}`}>
                        <div className="card-text">
                            <h4>{this.stagesNames[i]}</h4>
                            <ul className="styled mt-50" data-testid={`stage-${i}`}>
                                {tasks.map((task, index) => {
                                    return <li className="slide-up-fade-in" key={`${i}${index}`}>
                                      <div className="li-content layout-row justify-content-between align-items-center">
                                        <span data-testid={`${task.name.split(' ').join('-')}-name`}>{task.name}</span>
                                        <div className="icons">
                                          <button className="icon-only x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-back`} onClick={()=>this.backWardStage(task)} disabled= {task.stage!==0?null:true}>
                                            <i 
                                            className="material-icons">arrow_back</i>
                                          </button>
                                          <button className="icon-only x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-forward`} onClick={()=>this.forwardStageItem(task)} disabled= {task.stage!==3?null:true}>
                                            <i className="material-icons">arrow_forward</i>
                                          </button>
                                          <button className="icon-only danger x-small mx-2" data-testid={`${task.name.split(' ').join('-')}-delete`} onClick={()=>this.deleteTask(task)}>
                                            <i className="material-icons">delete</i>
                                          </button>
                                        </div>
                                      </div>
                                    </li>
                                })}
                            </ul>
                        </div>
                    </div>
                )
            })}
        </div>
      </div>
    );
  }
}