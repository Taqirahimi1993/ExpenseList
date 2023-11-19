import { useState } from "react";

import Alert from "./components/Alert";
import Button from "./components/Button";
import ListGroup from "./components/ListGroup/";
import Message from "./Message";
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import Form from "./components/Form";

import ExpandableText from "./components/ExpandableText";
import { useForm } from "react-hook-form";
import ExpenseList from "./expense-tracker/components/ExpenseList";
import ExpenseFilter from "./expense-tracker/components/ExpenseFilter";
import ExpenseForm from "./expense-tracker/components/ExpenseForm";
import categories from "./expense-tracker/categories";
function App() {
  const [selectCategory, setSelectCategory] = useState("");

  const [expenses, setExpenses] = useState([
    { id: 1, description: "shopping", amount: 40, category: "Utilities" },
    { id: 2, description: "holiday", amount: 400, category: "Utilities" },
    { id: 3, description: "car service", amount: 50, category: "Utilities" },
  ]);
  const isVisibleExpenses = selectCategory
    ? expenses.filter((e) => e.category == selectCategory)
    : expenses;
  return (
    <>
      <div>
        <div className="mb-3">
          <ExpenseForm
            onSubmitForms={(expense) =>
              setExpenses([
                ...expenses,
                { ...expense, id: expenses.length + 1 },
              ])
            }
          />
        </div>
        <div className="mb-3">
          <ExpenseFilter
            onSelectCategory={(category) => setSelectCategory(category)}
          />
        </div>
        <ExpenseList
          expenses={isVisibleExpenses}
          onDelete={(id) => setExpenses(expenses.filter((e) => e.id !== id))}
        />
      </div>
    </>
  );
}
export default App;
