import PropTypes from 'prop-types';
import React, {Component} from 'react';

import loading from '../assets/images/loading.svg';
import '../assets/styles/todoList.css';
import '../assets/styles/shared.css';
import TodoItem from './TodoItem';
import Navbar from "./Navbar";
import Error from "./Error";

/**
 *
 */
class TodoList extends Component {
    state = {
        filteredItems: []
    };

    generateBody = () => {
        const {isLoading, items, error, itemsInProcessIds, completeTodoItem} = this.props;

        const {filteredItems} = this.state;

        const itemsToProcess = (filteredItems && filteredItems.length) ? filteredItems : items;

        const itemComponents = itemsToProcess.map((item) => (
            <TodoItem
                key={item.id}
                itemsInProcessIds={itemsInProcessIds}
                deleteTodoItem={this.deleteTodoItem}
                item={item}
                completeTodoItem={completeTodoItem}
            />
        ));

        if (isLoading) {
            return (
                <img className="list-loading" src={loading} alt="List is being retrieved"/>
            );
        }

        if (error) {
            return (
                <Error error={error}/>
            );
        }

        return (
            <div className="col-md-10 col-md-offset-1">
                <div
                    className="panel panel-primary"
                    style={{marginTop: 20}}
                >
                    <div className="panel-heading">
                        <h3 className="panel-title">QWERTYUIO</h3>
                    </div>
                    <div className="panel-body">
                        There is todo:
                    </div>
                    <table className="todo table table-striped table-hover table-bordered">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Completed</th>
                            <th>Remove</th>
                        </tr>
                        </thead>
                        <tbody>{itemComponents}</tbody>
                    </table>
                </div>
            </div>
        )
    };

    deleteTodoItem = (item) => {
        this.props.deleteTodoItem(item);
    };

    filterByTitle = (event) => {
        const title = event.target.value;
        const filteredItems = this.props.items.filter((item) => item.title.toLocaleLowerCase().includes(title.toLowerCase()));

        this.setState({filteredItems});
    };

    componentDidMount() {
        this.props.fetchTodoItems();
    }

    render() {
        return (
            <div>
                <Navbar
                    onFilterChanged={this.filterByTitle}
                    onRefresh={this.props.fetchTodoItems}
                />
                {this.generateBody()}
            </div>
        );
    }

}

PropTypes.propTypes = {
    items: PropTypes.array.isRequired,
    error: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    fetchTodoItems: PropTypes.func.isRequired,
    deleteTodoItem: PropTypes.func.isRequired,
    completeTodoItem: PropTypes.func.isRequired,
    itemsInProcessIds: PropTypes.array.isRequired
};


export default TodoList;
