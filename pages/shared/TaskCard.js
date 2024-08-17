import React from "react";
import ModalBasic from "../../components/Model/ModalBasic";
import ValidationText from "../../utils/validations/ValidationText";
import DropdownSelect from "../../components/inputs/Dropdown";

export default function TaskList(props) {
  return (
    <>
      <ModalBasic
        id="solution-categorisation-model"
        modalOpen={props.taskModel}
        setModalOpen={props.setOpenModal}
      >
        <div className="taskcard">
          <h5>Create new task:</h5>
          <div className="task">
            <label>Task</label>
            <input
              type="text"
              placeholder="Enter your task"
              id="taskName"
              name="taskName"
              value={props.taskDetails.taskName}
              onChange={(event) => props.handleChange(event, "taskName")}
              autoComplete="off"
              onBlur={() => props.validateField("taskName")}
            />
            <ValidationText error={props.validState.error.taskName} />
          </div>
          <div className="task-description">
            <label>Task description</label>
            <textarea
              placeholder="Enter your task description"
              id="taskDescription"
              name="taskDescription"
              value={props.taskDetails.taskDescription}
              onChange={(event) => props.handleChange(event, "taskDescription")}
              autoComplete="off"
              onBlur={() => props.validateField("taskDescription")}
            />
            <ValidationText error={props.validState.error.taskDescription} />
          </div>
          <div className="task-details">
            <div className="task-priority">
              <label>Task priority</label>
              <div className="grid grid-cols-12 gap-0">
                <div className="2xl:col-span-12 lg:col-span-12 col-span-12">
                  <DropdownSelect
                    optionArray={props.taskPriorityOptions}
                    setFilterParameters={props.setFilterParameters}
                    value={props.taskDetails.taskPriorityId}
                    drpIdentity="TaskPriority"
                  />
                  <ValidationText
                    error={props.validState.error.taskPriorityId}
                  />
                </div>
              </div>
            </div>
            <div className="task-progress">
              <label>Task progress</label>
              <div className="grid grid-cols-12 gap-0">
                <div className="2xl:col-span-12 lg:col-span-12 col-span-12">
                  <DropdownSelect
                    optionArray={props.taskProgressOptions}
                    value={props.taskDetails.taskProgressId}
                    drpIdentity="TaskProgress"
                    setFilterParameters={props.setFilterParameters}
                  />
                  <ValidationText
                    error={props.validState.error.taskProgressId}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="task-type">
            <label>Task type</label>
            <div className="grid grid-cols-12 gap-0">
              <div className="2xl:col-span-12 lg:col-span-12 col-span-12">
                <DropdownSelect
                  optionArray={props.taskTypeOptions}
                  value={props.taskDetails.taskTypeId}
                  drpIdentity="TaskType"
                  setFilterParameters={props.setFilterParameters}
                />
                <ValidationText error={props.validState.error.taskTypeId} />
              </div>
            </div>
          </div>
          <div className="task-btns">
            <button className="create-btn"
             onClick={(event) => props.addEditNewTask(event)}
            >
               {props.isEditTask === true ? 'Edit' : 'Create'}
            </button>
            <button
              onClick={(event) => props.onClose(event)}
              className="cancle-btn"
            >
              Cancle
            </button>
          </div>
        </div>
      </ModalBasic>
    </>
  );
}
