import React, { Component } from "react";
import TaskCard from "../shared/TaskCard";
import { isValidForm, validate } from "../../utils/validations/CommonValidator";
import { Messages } from "../../utils/Messages";
import DropdownSelect from "../../components/inputs/Dropdown";
import DashboardServices from "../../services/axios/apiServices/DashboardServices";
import SwalServices from "../../services/swal/SwalServices";
import CommonServices from "../../services/axios/apiServices/CommonServices";
import { Navigate, Routes } from "../../navigation/NavigationLib";
import { getAuthProps } from "../../utils/AuthenticationLibrary";

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.CommonServices = new CommonServices();
    this.SwalServices = new SwalServices();
    this.dashboardServices = new DashboardServices();
    this.state = {
      taskModel: false,
      taskOptionList: [
        { id: 1, name: "Option1" },
        { id: 2, name: "Option2" },
        { id: 3, name: "Option3" },
      ],
      taskPriorityOptions: [
        { name: "High", id: 1 },
        { name: "Medium", id: 2 },
        { name: "Low", id: 3 },
      ],
      taskProgressOptions: [
        { name: "To do", id: 1 },
        { name: "In Progress", id: 2 },
        { name: "Done", id: 3 },
      ],
      taskTypeOptions: [
        { name: "Design", id: 1 },
        { name: "Development", id: 2 },
      ],
      searhTask: "",
      taskDetails: {
        taskId: 0,
        userId: 0,
        taskName: "",
        taskDescription: "",
        taskPriorityId: 0,
        taskProgressId: 0,
        taskTypeId: 0,
      },
      isEditTask: false,
      todoTasks: [],
      inProgressTasks: [],
      doneTasks: [],
      validationRules: {
        taskName: [
          {
            type: "require",
            message: Messages.CommonValidationMessages.FieldRequired.replace(
              "{0}",
              "task name"
            ),
          },
        ],
        taskDescription: [
          {
            type: "require",
            message: Messages.CommonValidationMessages.FieldRequired.replace(
              "{0}",
              "task description"
            ),
          },
        ],
        taskPriorityId: [
          {
            type: "require",
            message: Messages.CommonValidationMessages.SelectRequired.replace(
              "{0}",
              "task priority"
            ),
          },
        ],
        taskProgressId: [
          {
            type: "require",
            message: Messages.CommonValidationMessages.SelectRequired.replace(
              "{0}",
              "task progress"
            ),
          },
        ],
        taskTypeId: [
          {
            type: "require",
            message: Messages.CommonValidationMessages.SelectRequired.replace(
              "{0}",
              "task type"
            ),
          },
        ],
      },
      validState: {
        isValid: true,
        error: {},
      },
    };
  }

  componentDidMount() {
    let details = getAuthProps();
    if (details != undefined) {
      if (details.userId != undefined && details.userId > 0) {
        let taskDetails = this.state.taskDetails;
        taskDetails.userId = details.userId;
        this.setState({ taskDetails: taskDetails }, () => {
          this.getTaskbyUserId();
        });
      } else {
        Navigate(Routes.signIn);
      }
    } else {
      Navigate(Routes.signIn);
    }
  }

  handleChange = (event, name) => {
    let value = event.target.value;
    let details = this.state.taskDetails;
    if (name === "searhTask") {
      this.setState({ searhTask: value }, () => {
        this.getTaskbyUserId();
      });
    } else {
      details[name] = value;
      this.setState({ taskDetails: details });
    }
  };

  openTaskModel = (event) => {
    event.stopPropagation();
    this.setState({ taskModel: true });
  };

  validateField = (key) => {
    const newValidState = validate(
      key,
      this.state.taskDetails,
      this.state.validationRules,
      this.state.validState
    );
    this.setState({ validState: newValidState });
  };

  isValidAllFields = () => {
    const newValidState = isValidForm(
      this.state.taskDetails,
      this.state.validationRules,
      this.state.validState
    );
    this.setState({ validState: newValidState });
    return newValidState.isValid;
  };

  setFilterParameters = (id, drpIdentity) => {
    let taskDetails = this.state.taskDetails;
    if (drpIdentity === "TaskPriority") {
      taskDetails.taskPriorityId = id;
      this.validateField("taskPriorityId");
    } else if (drpIdentity === "TaskProgress") {
      taskDetails.taskProgressId = id;
      this.validateField("taskProgressId");
    } else if (drpIdentity === "TaskType") {
      taskDetails.taskTypeId = id;
      this.validateField("taskTypeId");
    }
    this.setState({ taskDetails: taskDetails });
  };

  getTaskbyUserId = () => {
    let request = [this.state.taskDetails.userId, this.state.searhTask];
    this.dashboardServices.getTaskbyUserId(request).then((response) => {
      if (response.statusCode === 200 && response.responseItem != null) {
        let details = response.responseItem.responseContent;
        let todoTasks = details.filter((x) => x.taskProgress === "To do");
        let inProgressTasks = details.filter(
          (x) => x.taskProgress === "In Progress"
        );
        let doneTasks = details.filter((x) => x.taskProgress === "Done");
        this.setState({
          todoTasks: todoTasks,
          inProgressTasks: inProgressTasks,
          doneTasks: doneTasks,
        });
      } else {
        this.SwalServices.Error(response.message);
      }
      this.setState({ isLoading: false });
    });
  };

  addEditNewTask = () => {
    if (this.isValidAllFields()) {
      let details = this.state.taskDetails;
      details.taskPriority = this.state.taskPriorityOptions.find(
        (x) => x.id === details.taskPriorityId
      ).name;
      details.taskProgress = this.state.taskProgressOptions.find(
        (x) => x.id === details.taskProgressId
      ).name;
      details.taskType = this.state.taskTypeOptions.find(
        (x) => x.id === details.taskTypeId
      ).name;
      this.dashboardServices.addEditNewTask(details).then((response) => {
        if (response.statusCode === 200 && response.responseItem != null) {
          let taskDetails = this.state.taskDetails;
          taskDetails.taskId = response.responseItem.responseContent.keyId;
          this.setState({ taskDetails: taskDetails });
          this.SwalServices.Success(
            response.responseItem.responseContent.errorMessage
          );
          this.setState({ taskModel: false }, () => {
            let task = this.state.taskDetails;
            task.taskName = "";
            task.taskDescription = "";
            task.taskPriorityId = 0;
            task.taskProgressId = 0;
            task.taskTypeId = 0;
            this.setState({ taskDetails: task });
          });
          this.getTaskbyUserId();
        } else {
          this.SwalServices.Error(response.message);
        }
      });
    }
  };

  editTask = (taskDetails) => {
    let details = this.state.taskDetails;
    details.taskId = taskDetails.taskId;
    details.taskName = taskDetails.taskName;
    details.taskDescription = taskDetails.taskDescription;
    details.taskPriorityId = this.state.taskPriorityOptions.find(
      (x) => x.name === taskDetails.taskPriority
    ).id;
    details.taskProgressId = this.state.taskProgressOptions.find(
      (x) => x.name === taskDetails.taskProgress
    ).id;
    details.taskTypeId = this.state.taskTypeOptions.find(
      (x) => x.name === taskDetails.taskType
    ).id;
    this.setState({ taskDetails: details }, () => {
      this.setState({ taskModel: true, isEditTask: true });
    });
  };

  render() {
    return (
      <div className="taskpage">
        <h3>Task List</h3>
        <div className="task-search">
          <input
            className="search"
            type="text"
            id="searhTask"
            name="searhTask"
            placeholder="Searh task"
            value={this.state.searhTask}
            onChange={(event) => this.handleChange(event, "searhTask")}
            autoComplete="off"
          />
        </div>
        <div className="tasklists">
          <div id="to-do">
            <h5>To Do</h5>
            {this.state.todoTasks && this.state.todoTasks.length > 0
              ? this.state.todoTasks.map((details, key) => (
                  <div
                    key={key}
                    onClick={() => this.editTask(details)}
                    className={`mt-2 task-box ${
                      details.taskPriority === "High"
                        ? "high-priority"
                        : details.taskPriority === "Medium"
                        ? "medium-priority"
                        : "low-priority"
                    }`}
                  >
                    <h5>{details.taskName}</h5>
                    <p>{details.taskDescription}</p>
                    <p><strong>Type:</strong> {details.taskType}</p>
                    <p><strong>Priority:</strong> {details.taskPriority}</p>
                  </div>
                ))
              : null}
          </div>
          <div id="doing">
            <h5>Doing</h5>
            {this.state.inProgressTasks && this.state.inProgressTasks.length > 0
              ? this.state.inProgressTasks.map((details, key) => (
                  <div
                    key={key}
                    onClick={() => this.editTask(details)}
                    className={`mt-2 task-box ${
                      details.taskPriority === "High"
                        ? "high-priority"
                        : details.taskPriority === "Medium"
                        ? "medium-priority"
                        : "low-priority"
                    }`}
                  >
                    <h5>{details.taskName}</h5>
                    <p>{details.taskDescription}</p>
                    <p><strong>Type:</strong> {details.taskType}</p>
                    <p><strong>Priority:</strong> {details.taskPriority}</p>
                  </div>
                ))
              : null}
          </div>
          <div id="done">
            <h5>Done</h5>
            {this.state.doneTasks && this.state.doneTasks.length > 0
              ? this.state.doneTasks.map((details, key) => (
                  <div
                    key={key}
                    onClick={() => this.editTask(details)}
                    className={`mt-2 task-box ${
                      details.taskPriority === "High"
                        ? "high-priority"
                        : details.taskPriority === "Medium"
                        ? "medium-priority"
                        : "low-priority"
                    }`}
                  >
                    <h5>{details.taskName}</h5>
                    <p>{details.taskDescription}</p>
                    <p><strong>Type:</strong> {details.taskType}</p>
                    <p><strong>Priority:</strong> {details.taskPriority}</p>
                  </div>
                ))
              : null}
          </div>
        </div>

        <button
          onClick={(event) => this.openTaskModel(event)}
          className="task-btn"
        >
          Add Task
        </button>
        <TaskCard
          taskModel={this.state.taskModel}
          setOpenModal={() => {
            this.setState({ taskModel: false });
          }}
          onClose={(e) => {
            e.stopPropagation();
            this.setState({ taskModel: false });
          }}
          taskPriorityOptions={this.state.taskPriorityOptions}
          taskProgressOptions={this.state.taskProgressOptions}
          taskTypeOptions={this.state.taskTypeOptions}
          taskDetails={this.state.taskDetails}
          handleChange={this.handleChange.bind(this)}
          validateField={this.validateField.bind(this)}
          validState={this.state.validState}
          setFilterParameters={this.setFilterParameters.bind(this)}
          addEditNewTask={this.addEditNewTask.bind(this)}
          isEditTask={this.state.isEditTask}
        />
      </div>
    );
  }
}

export default TaskList;
