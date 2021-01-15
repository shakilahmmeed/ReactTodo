import React, { useState, useEffect } from "react";
import { message } from "antd";
import Page from "../components/Page";
import AddTodoItem from "../components/AddTodoItem";
import TodoItem from "../components/TodoItem";
import WeatherBar from "../components/WeatherBar";

export default function Home() {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		let allTodos = JSON.parse(localStorage.getItem("todos"));

		if (todos !== null) {
			let filteredTodos = allTodos.filter(
				(todo) => todo.status !== "completed"
			);
			filteredTodos.sort((item1, item2) =>
				item1.title.toLowerCase() > item2.title.toLowerCase() ? 1 : -1
			);
			setTodos(filteredTodos);
		}
	}, []);

	const handleAddTodo = (item) => {
		let newTodoList = [...todos, item];
		newTodoList.sort((item1, item2) =>
			item1.title.toLowerCase() > item2.title.toLowerCase() ? 1 : -1
		);
		localStorage.setItem("todos", JSON.stringify(newTodoList));
		setTodos(newTodoList);
		message.success("Successfully Added");
	};

	const handleUpdateTodo = (item) => {
		let idx = todos.findIndex((todo) => {
			return todo.id === item.id;
		});

		let updatedTodos = [...todos];

		updatedTodos[idx] = {
			title: item.title,
			date: item.date,
			id: item.id,
			status: item.status,
		};

		localStorage.setItem("todos", JSON.stringify(updatedTodos));
		// let filteredTodos = updatedTodos.filter(
		// 	(todo) => todo.status !== "completed"
		// );
		setTodos(updatedTodos);
		message.info("Successfully Updated");
	};

	const handleDeleteTodo = (id) => {
		let filteredTodoList = todos.filter((todo) => todo.id !== id);

		localStorage.setItem("todos", JSON.stringify(filteredTodoList));
		setTodos(filteredTodoList);
		message.info("Successfully Deleted");
	};

	const handleSort = (e) => {
		switch (e.target.value) {
			case "title":
				let sortedTodosByTitle = [...todos].sort((item1, item2) =>
					item1.title.toLowerCase() > item2.title.toLowerCase() ? 1 : -1
				);
				setTodos(sortedTodosByTitle);
				break;
			case "date":
				let sortedTodosByDate = [...todos].sort(
					(item1, item2) => Date.parse(item1.date) - Date.parse(item2.date)
				);
				setTodos(sortedTodosByDate);
				break;
			default:
				console.log("hello");
		}
	};

	return (
		<Page>
			<div className="flex justify-center">
				<div className="mt-16">
					<AddTodoItem handleAddTodo={handleAddTodo} />
					<button onClick={() => console.log(todos)}>Check state</button>

					{todos.length > 0 ? (
						<>
							<div className="flex items-center my-2">
								<p className="text-xs text-black-100">Sort by</p>
								<select
									className="rounded text-xs ml-2 focus:outline-none"
									onChange={handleSort}
								>
									<option value="title">Title</option>
									<option value="date">Date</option>
								</select>
							</div>

							<div className="todo-item-wrapper">
								{todos.map((todo, idx) => (
									<TodoItem
										key={idx}
										item={todo}
										handleUpdateTodo={handleUpdateTodo}
										handleDeleteTodo={handleDeleteTodo}
									/>
								))}
							</div>
						</>
					) : (
						<div className="text-center mt-5">No Todos Found</div>
					)}
					<WeatherBar />
				</div>
				<style jsx>{`
					.todo-item-wrapper {
						overflow-y: scroll;
						height: 370px;
					}

					.todo-item-wrapper::-webkit-scrollbar {
						display: none;
					}
				`}</style>
			</div>
		</Page>
	);
}